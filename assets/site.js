(function(){
 const toggle=document.querySelector('.menu-toggle');
 const nav=document.querySelector('.site-nav');
 if(toggle&&nav){toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false')}));}
 document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
 const copyButtons=document.querySelectorAll('[data-copy]');
 copyButtons.forEach(button=>button.addEventListener('click',async()=>{const text=document.querySelector(button.dataset.copy)?.innerText||'';try{await navigator.clipboard.writeText(text);const old=button.textContent;button.textContent='Copied';setTimeout(()=>button.textContent=old,1600)}catch(e){button.textContent='Select summary to copy';}}));
})();
