const navLinks=[...document.querySelectorAll('[data-nav]')];
const sections=[...document.querySelectorAll('[data-section]')];
const progress=document.querySelector('.progress span');
const menu=document.querySelector('.menu-button');
const sidebar=document.querySelector('.sidebar');
const lightbox=document.querySelector('.lightbox');
const lightboxImage=lightbox.querySelector('img');
const lightboxTitle=lightbox.querySelector('p');

const sectionObserver=new IntersectionObserver(entries=>{
  const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
  if(!visible)return;
  navLinks.forEach(a=>a.classList.toggle('active',a.dataset.nav===visible.target.dataset.section));
},{rootMargin:'-18% 0px -68% 0px',threshold:[0,.1,.4]});
sections.forEach(section=>sectionObserver.observe(section));

addEventListener('scroll',()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=`${max>0?scrollY/max*100:0}%`;
},{passive:true});

menu.addEventListener('click',()=>{
  const open=sidebar.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(open));
});
navLinks.forEach(a=>a.addEventListener('click',()=>{sidebar.classList.remove('open');menu.setAttribute('aria-expanded','false')}));

document.querySelectorAll('.exhibit-open').forEach(button=>button.addEventListener('click',()=>{
  lightboxImage.src=button.dataset.image;
  lightboxImage.alt=button.dataset.title;
  lightboxTitle.textContent=button.dataset.title;
  lightbox.showModal();
}));
lightbox.querySelector('.lightbox-close').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close()});
addEventListener('keydown',event=>{if(event.key==='Escape'&&lightbox.open)lightbox.close()});
