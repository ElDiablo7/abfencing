const $=s=>document.querySelector(s);
$('#year').textContent=new Date().getFullYear();

const panel=$('#chat'),messages=$('#messages'),history=[];
function openChat(){panel.classList.add('open');setTimeout(()=>$('#chat-input').focus(),100)}
function closeChat(){panel.classList.remove('open')}
$('#chat-launch').addEventListener('click',openChat);
$('#chat-close').addEventListener('click',closeChat);

function addMessage(text,role){const el=document.createElement('div');el.className=role;el.textContent=text;messages.appendChild(el);messages.scrollTop=messages.scrollHeight;return el}
$('#chat-form').addEventListener('submit',async e=>{
 e.preventDefault();const input=$('#chat-input'),message=input.value.trim();if(!message)return;
 input.value='';addMessage(message,'user');history.push({role:'user',content:message});
 const bot=addMessage('I’m checking that for you…','bot');
 try{
  const r=await fetch('/api/assistant',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message,history})});
  const data=await r.json();bot.textContent=data.answer||data.error||'Please call 07539 490180.';
  history.push({role:'assistant',content:bot.textContent});
 }catch{bot.textContent='I’m temporarily unavailable. Please call AB Fencing on 07539 490180.'}
});

$('#quote').addEventListener('submit',async e=>{
 e.preventDefault();const form=e.currentTarget,status=$('#status');status.textContent='Sending…';
 try{
  const r=await fetch('/api/quote',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))});
  const data=await r.json();if(!r.ok)throw new Error(data.error||'Unable to send enquiry.');
  status.textContent=data.message;form.reset();
 }catch(err){status.textContent=err.message||'Please call 07539 490180 to arrange your enquiry.';status.style.color='#9b1c1c'}
});