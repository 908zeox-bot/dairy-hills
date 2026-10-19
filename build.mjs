import { readFile, mkdir, rm, cp, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
export const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl = value => { const url = new URL(value); if(url.protocol !== 'https:') throw Error('Business URLs must use HTTPS'); return escapeHtml(url.href); };
export function renderTenants(tenants) {
  return tenants.filter(t => t.consent === true && t.show === true).map(t => {
    if(!t.consent_date || !/^\d{4}-\d{2}-\d{2}$/.test(t.consent_date)) throw Error('Visible businesses need a consent date');
    return `<li class="tenant-card" role="listitem"><h3>${t.url ? `<a href="${safeUrl(t.url)}" rel="noopener noreferrer">${escapeHtml(t.name)}</a>` : escapeHtml(t.name)}</h3>${t.url ? '<span class="tenant-link" aria-hidden="true">Visit website ↗</span>' : ''}${t.suite ? ` <span>Suite ${escapeHtml(t.suite)}</span>` : ''}</li>`;
  }).join('');
}
export function renderSuites(suites) {
  return suites.map(s => {
    if(!['available','leased','coming-soon'].includes(s.status)) throw Error('Invalid suite status');
    if(s.sqft !== null && (!Number.isFinite(s.sqft) || s.sqft <= 0)) throw Error('Invalid verified suite area');
    if(s.floorplan) throw Error('Floor plans require a separate approved publication workflow');
    return `<article class="suite"><p class="eyebrow">${escapeHtml(s.status.replaceAll('-',' '))}</p><h3>Suite ${escapeHtml(s.id)}</h3><p>${escapeHtml(s.type)}</p><p>${escapeHtml(s.summary)}</p>${s.sqft ? `<p>${s.sqft} sq ft</p>` : ''}<small>Updated ${escapeHtml(s.updated)}</small></article>`;
  }).join('');
}
export function validateRecords(records, allowed) {
  if(!Array.isArray(records)) throw Error('Data must be an array');
  for(const record of records) {
    if(!record || typeof record !== 'object' || Object.keys(record).some(key => !allowed.includes(key))) throw Error('Unexpected data field');
  }
}
export async function build() {
  const read = async name => JSON.parse(await readFile(`data/${name}.json`,'utf8'));
  const [site, tenants, suites] = await Promise.all(['site','tenants','suites'].map(read));
  if(site.canonical !== 'https://www.dairy-hills.com' || site.contact_email !== 'manager@dairy-hills.com') throw Error('Canonical/contact must match approved site settings');
  validateRecords(tenants,['name','suite','url','consent','consent_date','show']);
  validateRecords(suites,['id','status','sqft','type','summary','floorplan','updated']);
  for(const item of Object.values(site.photos)) {
    if(!/^assets\/img\/[a-z0-9-]+\.(webp|jpe?g)$/.test(item.src)) throw Error('Images must be reviewed local files');
  }
  const e=escapeHtml, email=`mailto:${site.contact_email}?subject=Dairy%20Hills%20inquiry`;
  const photo=(key,cls='')=>`<img class="${cls}" src="${e(site.photos[key].src)}" alt="${e(site.photos[key].alt)}" ${key==='hero'?'fetchpriority="high"':'loading="lazy"'} width="${key==='hero'?'2400':'1024'}" height="${key==='hero'?'2400':'768'}">`;
  const brand=(stacked=false)=>`<object class="brand ${stacked?'stacked':''}" data="assets/brand/wordmark${stacked?'-stacked':''}.svg" type="image/svg+xml" aria-hidden="${stacked?'true':'false'}" aria-label="Dairy Hills${stacked?' — Co-Working Space':''}" tabindex="-1"><span class="brand-fallback">${stacked?'Dairy<br>Hills':'Dairy Hills'}</span>${stacked?'<span>Co-Working Space</span>':''}</object>`;
  const businesses=renderTenants(tenants), suiteCards=renderSuites(suites);
  const jsonld=JSON.stringify({'@context':'https://schema.org','@type':'LocalBusiness',name:site.name,description:site.description,url:site.canonical,email:site.contact_email,image:`${site.canonical}/assets/brand/og.jpg`,address:{'@type':'PostalAddress',streetAddress:site.address.street,addressLocality:site.address.city,addressRegion:site.address.region,postalCode:site.address.postal,addressCountry:'US'}}).replaceAll('<','\\u003c');
  const html=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#1c1c1e">
<title>Dairy Hills | Professional workspace in Washington Park West, Denver</title><meta name="description" content="${e(site.description)}"><link rel="canonical" href="${site.canonical}/"><link rel="icon" href="assets/brand/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/style.css">
<meta property="og:type" content="website"><meta property="og:site_name" content="Dairy Hills"><meta property="og:title" content="Dairy Hills — Co-Working Space"><meta property="og:description" content="${e(site.description)}"><meta property="og:url" content="${site.canonical}/"><meta property="og:image" content="${site.canonical}/assets/brand/og.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Dairy Hills — Co-Working Space in Washington Park West, Denver"><meta name="twitter:card" content="summary_large_image"><script type="application/ld+json">${jsonld}</script></head>
<body><a class="skip" href="#main">Skip to content</a><div class="topline">WASHINGTON PARK WEST <span>DENVER, COLORADO</span></div>
<header><a class="home" href="#" aria-label="Dairy Hills home">${brand()}</a><nav aria-label="Main navigation"><a href="#suites">The suites</a><a href="#building">The building</a>${businesses?'<a href="#community">Community</a>':''}<a href="#location">Find us</a><a class="button small" href="${email}">Inquire <span aria-hidden="true">↗</span></a></nav></header>
<main id="main"><section class="hero" aria-labelledby="hero-title"><div class="hero-copy"><p class="eyebrow">A LITTLE CHARACTER. A PLACE TO FOCUS.</p><h1 id="hero-title"><span class="sr-only">Dairy Hills — Co-Working Space</span>${brand(true)}</h1><p class="hero-intro">Your work.<br>A place to call its own.</p><p>A boutique shared workspace for therapists, wellness practitioners and other professionals, in a historic Denver building.</p><a class="button cream" href="#suites">Explore the space <span aria-hidden="true">↓</span></a></div><div class="hero-photo">${photo('hero')}<span class="photo-caption">323 S PEARL ST · DENVER</span></div></section>
<div class="intro-strip"><span>Historic brick. A neighborhood setting.</span><a href="#location">At home in Washington Park West <span aria-hidden="true">↗</span></a></div>
<section id="suites" class="split section"><div><p class="eyebrow">ROOM FOR YOUR NEXT CHAPTER</p><h2>A space for<br>the work you do.</h2><p>Bring your practice, your ideas and your own way of working. Discover private office space with the character of a neighborhood building.</p><p>Inquire for availability and rates.</p><p class="muted">Tell us what you’re looking for. We’ll help you explore current options and arrange a visit.</p><a class="text-link" href="${email}">Ask about a suite <span aria-hidden="true">↗</span></a>${suiteCards?`<div class="suite-list">${suiteCards}</div>`:''}</div><figure>${photo('interior')}<figcaption>A look inside Dairy Hills. Photo shows the space, not current availability.</figcaption></figure></section>
<section id="building" class="building section"><div class="section-heading"><div><p class="eyebrow">A BUILDING WITH CHARACTER</p><h2>Settle into<br>something different.</h2></div><p>Arched windows, warm brick and shared spaces give Dairy Hills its own pace. Take a look around, then come see how it feels in person.</p></div><div class="photo-grid"><figure>${photo('lobby')}<figcaption><h3>A welcoming first impression.</h3><p>A shared lobby with a place to pause.</p></figcaption></figure><figure>${photo('courtyard')}<figcaption><h3>A little room to step outside.</h3><p>A flagstone courtyard beside the building.</p></figcaption></figure></div><p class="muted amenities-note">Have questions about access, parking, hours or what’s included? Ask us about the details for your space.</p></section>
${businesses?`<section id="community" class="section community"><p class="eyebrow">GOOD WORK. GOOD NEIGHBORS.</p><div class="section-heading"><h2>Meet the community.</h2><p>Independent businesses, each with a practice of their own. Get to know the professionals who call Dairy Hills home.</p></div><ul class="tenant-grid" role="list">${businesses}</ul></section>`:''}
<section id="location" class="location section"><div><p class="eyebrow">IN THE NEIGHBORHOOD</p><h2>Find your place<br>on South Pearl.</h2><p>323 S Pearl St<br>Denver, CO 80209</p><p>Washington Park West, Denver.</p><a class="text-link" href="https://www.google.com/maps/search/?api=1&amp;query=323%20S%20Pearl%20St%20Denver%20CO%2080209" target="_blank" rel="noopener noreferrer">Get directions <span class="sr-only">(opens in a new tab)</span><span aria-hidden="true">↗</span></a></div><div class="location-card" aria-label="Location at South Pearl Street"><span class="map-street">SOUTH PEARL STREET</span><div class="location-mark" aria-hidden="true">DH</div><p>323 S Pearl St</p><span>WASHINGTON PARK WEST</span><div class="map-line" aria-hidden="true"></div></div></section>
<section id="contact" class="contact section"><p class="eyebrow">LET’S START WITH A CONVERSATION</p><h2>Make room for<br>what’s next.</h2><p>Inquire for availability and rates.</p><a class="button cream" href="${email}">Email Dairy Hills <span aria-hidden="true">↗</span></a><a class="email" href="mailto:${site.contact_email}">${site.contact_email}</a></section></main>
<footer><a class="home" href="#" aria-label="Dairy Hills home">${brand()}</a><p>Co-Working Space<br>323 S Pearl St · Denver, CO 80209</p><a href="mailto:${site.contact_email}">Get in touch <span aria-hidden="true">↗</span></a><small>© ${new Date().getUTCFullYear()} Dairy Hills</small></footer></body></html>`;
  await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});await cp('assets','dist/assets',{recursive:true});
  await writeFile('dist/index.html',html);await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${site.canonical}/sitemap.xml\n`);
  await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${site.canonical}/</loc><lastmod>${new Date().toISOString().slice(0,10)}</lastmod></url></urlset>\n`);
  console.log('Built static site in dist/');
}
if(import.meta.url === pathToFileURL(resolve(process.argv[1] || '')).href) await build();
