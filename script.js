const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function fillContent(){
  document.title = `${CONFIG.identity.name} — ${CONFIG.identity.role}`;
  $$('[data-name]').forEach(e=>e.textContent=CONFIG.identity.name);
  $('#heroBadge').textContent=CONFIG.identity.badge; $('#heroDescription').textContent=CONFIG.identity.description;
  $('#statExperience').textContent=CONFIG.identity.experience; $('#statProjects').textContent=CONFIG.identity.projects; $('#statFocus').textContent=CONFIG.identity.focus; $('#aboutTitle').textContent=CONFIG.about.title;
  ['brandLogo','heroLogo','loaderLogo'].forEach(id=>{const e=$('#'+id); if(e)e.src=CONFIG.identity.logo;});
  $('#aboutText').innerHTML=CONFIG.about.paragraphs.map(p=>`<p>${p}</p>`).join('');
  $('#heroDiscordText').textContent=CONFIG.contact.discord; $('#heroEmailText').textContent=CONFIG.contact.email; $('#heroDiscord').href=CONFIG.contact.discordUrl; $('#heroEmail').href=`mailto:${CONFIG.contact.email}`;
  $('#discordText').textContent=CONFIG.contact.discord; $('#discordId').textContent=`ID: ${CONFIG.contact.discordId}`; $('#emailText').textContent=CONFIG.contact.email; $('#footerId').textContent=CONFIG.contact.discordId;

  $('#strengths').innerHTML=CONFIG.strengths.map((x,i)=>`<article class="strength-card reveal" style="--delay:${i*70}ms"><div class="strength-icon">${x.icon}</div><h3>${x.title}</h3><p>${x.text}</p><span class="card-line"></span></article>`).join('');
  $('#differenceList').innerHTML=CONFIG.difference.map((x,i)=>`<div class="accordion-item ${i===0?'active':''}"><button class="accordion-button"><span class="number">0${i+1}</span><span><strong>${x.title}</strong><small>${x.subtitle}</small></span><b>${i===0?'−':'+'}</b></button><div class="accordion-content"><p>${x.detail}</p></div></div>`).join('');
  $('#servicesList').innerHTML=CONFIG.services.map((x,i)=>`<div class="accordion-item"><button class="accordion-button"><span class="number">0${i+1}</span><span><strong>${x.title}</strong><small>${x.subtitle}</small></span><b>+</b></button><div class="accordion-content"><p>${x.detail}</p></div></div>`).join('');
  $('#servers').innerHTML=CONFIG.servers.map((x,i)=>`<article class="server-card reveal ${x.color}" style="--delay:${i*90}ms"><div class="server-number">0${i+1}</div><div class="server-mark">${x.name[0]}</div><div><h3>${x.name}</h3><span>${x.players}</span></div><strong>${x.role}</strong></article>`).join('');
  $('#works').innerHTML=CONFIG.projects.map((x,i)=>`<article class="work-card project-card reveal" style="--delay:${i*80}ms"><div class="project-shine"></div><div class="work-top"><span>0${i+1}</span><em>${x.category}</em></div><div class="work-preview"><div class="project-grid"></div><div class="fake-window"><div class="fake-head"><i></i><i></i><i></i></div><div class="fake-title">${x.title}</div><div class="fake-line long"></div><div class="fake-line"></div><div class="fake-box"></div></div><div class="project-scan"></div></div><div class="project-title-row"><h3>${x.title}</h3><span class="project-status ${x.statusType}"><i></i>${x.status}</span></div><p>${x.text}</p><div class="progress-meta"><span>PROGRESO</span><b>${x.progress}%</b></div><div class="project-progress"><span style="--progress:${x.progress}%"></span></div></article>`).join('');
  $('#reviews').innerHTML=CONFIG.reviews.map((x,i)=>`<article class="review-card reveal" style="--delay:${i*90}ms"><div class="quote">“</div><p>${x.text}</p><div class="stars">★★★★★</div><div class="review-author"><div class="avatar">${x.name[0]}</div><div><strong>${x.name}</strong><small>${x.role}</small></div></div></article>`).join('');
}
function setup(){
  document.addEventListener('click',e=>{const b=e.target.closest('.accordion-button');if(b){const item=b.parentElement,parent=item.parentElement;[...parent.children].forEach(o=>{if(o!==item){o.classList.remove('active');o.querySelector('b').textContent='+';}});item.classList.toggle('active');b.querySelector('b').textContent=item.classList.contains('active')?'−':'+';return;} const sc=e.target.closest('[data-scroll]');if(sc){const t=$(sc.dataset.scroll);if(t)t.scrollIntoView({behavior:'smooth'});}});
  $$('.nav-links a').forEach(a=>a.addEventListener('click',()=>$('.nav-links').classList.remove('open')));
  $('.menu-toggle').addEventListener('click',()=>$('.nav-links').classList.toggle('open'));
  $$('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(b.dataset.copy);const old=b.textContent;b.textContent='COPIADO';setTimeout(()=>b.textContent=old,1200)}catch{b.textContent='SELECCIONADO'}}));
  $('#sendButton').addEventListener('click',()=>{window.location.href=`mailto:${CONFIG.contact.email}?subject=Contacto%20desde%20tu%20portafolio%20BNJXS`});
  const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.1}); $$('.reveal').forEach(e=>obs.observe(e));
  window.addEventListener('scroll',()=>$('.nav').classList.toggle('scrolled',scrollY>40));
  let p=0;const timer=setInterval(()=>{p=Math.min(100,p+Math.floor(Math.random()*9)+5);$('.loader-bar').style.width=p+'%';$('.loader-percent').textContent=p+'%';if(p===100){clearInterval(timer);setTimeout(()=>$('#loader').classList.add('hide'),350)}},65);
}
document.addEventListener('DOMContentLoaded',()=>{fillContent();setup()});
