import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { renderTenants, renderSuites, escapeHtml, build } from '../build.mjs';
test('only explicitly consented and visible businesses render',()=>{
 const base={name:'Test Business',suite:'A',consent_date:'2026-10-19'};
 for(const consent of [false,undefined,'true',1]) assert.equal(renderTenants([{...base,consent,show:true}]),'');
 for(const show of [false,undefined,'true',1]) assert.equal(renderTenants([{...base,consent:true,show}]),'');
 assert.match(renderTenants([{...base,consent:true,show:true}]),/Test Business/);
 assert.throws(()=>renderTenants([{name:'Test Business',consent:true,show:true}]));
});
test('business content escapes HTML and rejects executable links',()=>{
 assert.equal(escapeHtml('<>&"\''),'&lt;&gt;&amp;&quot;&#39;');
 const t={name:'<script>test</script>',consent:true,show:true,consent_date:'2026-10-19'};
 assert.match(renderTenants([t]),/&lt;script&gt;/);
 assert.throws(()=>renderTenants([{...t,url:'javascript:alert(1)'}]));
});
test('suite status and area are validated, plans require approval',()=>{
 const s={id:'A',status:'available',sqft:null,type:'office',summary:'Example only',floorplan:null,updated:'2026-10-19'};
 assert.match(renderSuites([s]),/Suite A/);
 assert.throws(()=>renderSuites([{...s,status:'invented'}]));
 assert.throws(()=>renderSuites([{...s,sqft:-1}]));
 assert.throws(()=>renderSuites([{...s,floorplan:'raw.pdf'}]));
});
test('built site uses approved contact and search metadata with approved directory and without fabricated suites',async()=>{
 await build();const html=await readFile('dist/index.html','utf8');
 assert.match(html,/<link rel="canonical" href="https:\/\/www\.dairy-hills\.com\/">/);
 assert.match(html,/mailto:manager@dairy-hills.com/);assert.doesNotMatch(html,/<form\b|type="tel"|telephone|openingHours|<iframe/);
 assert.doesNotMatch(html,/class="suite"/);
 assert.match(html,/id="community"/);
 assert.equal((html.match(/class="tenant-card"/g)||[]).length,4);
 assert.match(html,/Cafecito Connections Therapy/);
 assert.match(html,/Life in Transition Counseling/);
 const schema=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
 assert.equal(schema.address.postalCode,'80209');
 assert.match(await readFile('dist/sitemap.xml','utf8'),new RegExp(new Date().toISOString().slice(0,10)));
});
test('all nine host redirects preserve paths and canonical never redirects itself',async()=>{
 const config=await readFile('netlify.toml','utf8');const rules=config.match(/\[\[redirects\]\]/g);assert.equal(rules.length,9);
 assert.doesNotMatch(config,/from = "https:\/\/www\.dairy-hills\.com/);
 assert.equal((config.match(/to = "https:\/\/www\.dairy-hills\.com\/:splat"/g)||[]).length,9);
 assert.equal((config.match(/status = 301/g)||[]).length,9);
});
test('maintenance records reject unapproved fields',async()=>{
 const {validateRecords}=await import('../build.mjs');
 assert.throws(()=>validateRecords([{name:'Business',unexpected:'private'}],['name']));
 assert.throws(()=>validateRecords({},['name']));
});
