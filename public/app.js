const $ = (s) => document.querySelector(s);
$('#year').textContent = new Date().getFullYear();
const panel = $('#chat-panel');
const messages = $('#chat-messages');
const history = [];
function openChat(){ panel.classList.add('open'); panel.setAttribute('aria-hidden','false'); setTimeout(()=>$('#chat-input').focus(),120); }
function closeChat(){ panel.classList.remove('open'); panel.setAttribute('aria-hidden','true'); }
document.querySelectorAll('[data-open-chat]').forEach(b=>b.addEventListener('click',openChat));
document.querySelector('[data-close-chat]').addEventListener('click',closeChat);
function addMessage(text, role){ const el=document.createElement('div'); el.className=`chat-bubble ${role}`; el.textContent=text; messages.appendChild(el); messages.scrollTop=messages.scrollHeight; }
$('#chat-form').addEventListener('submit', async e=>{ e.preventDefault(); const input=$('#chat-input'); const message=input.value.trim(); if(!message)return; input.value=''; addMessage(message,'user'); history.push({role:'user',content:message}); const loading='I’m checking that for you…'; addMessage(loading,'bot'); const bot=messages.lastElementChild;
  try{ const r=await fetch('/api/assistant',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message,history})}); const data=await r.json(); bot.textContent=data.answer||data.error||'Please call 07539 490180.'; history.push({role:'assistant',content:bot.textContent}); }catch{ bot.textContent='I’m temporarily unavailable. Please call AB Fencing on 07539 490180.'; }
});
$('#quote-form').addEventListener('submit',async e=>{ e.preventDefault(); const form=e.currentTarget; const status=$('#form-status'); status.textContent='Sending…'; const data=Object.fromEntries(new FormData(form)); try{ const r=await fetch('/api/quote',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}); const out=await r.json(); if(!r.ok)throw new Error(out.error); status.textContent=out.message; form.reset(); }catch(err){ status.textContent=err.message||'Please call 07539 490180 to arrange your enquiry.'; status.style.color='#9b1c1c'; } });
