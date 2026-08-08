const interactive=[
 ['11.jpg','Awww..my baby😭🤌🏻','before you were my girl,you were already this tiny little cutie...look at you😘🤌🏻'],
 ['12.png','pretty👀😚','I swear your smile has no business making me this soft every single time'],
 ['13.png',"don't look at me like this🫣","you could literally just exist and i'd stil be here like...aww my girl🤍🤌🏻"],
 ['14.jpg','im not melting 🫠🤌🏻',"this face??yeah no.when we meet I'm absolutely squishing your cheeks consider urself warned😭🤌🏻"],
 ['15.jpg',"I can't help falling👉🏻👈🏻",'somehow you keep getting prettier and i keep falling harder.how this even fair 😭']
];
const hiddenCats=['images/hidden cat1.jpg','images/hidden cat2.jpg','images/hidden cat3.jpg','images/hidden cat4.jpg','images/hidden cat5.jpg'];
const slides=[['21.jpg','your eyes, your smile… everything about you feels like home 🤍'],['22.jpg','how am I supposed to act normal when you look like this 😭'],['23.jpg','my pretty girl, forever my favourite view 🫠🫀'],['24.jpg','that little smile is genuinely one of my favourite things in this world 🤏🏼'],['25.jpg','I’d still choose you in every version of every lifetime 🤍'],['26.jpg','and somehow you just keep getting more beautiful to me 🫂']];
const wishes=[
 ['♡ WISH #1','May we keep choosing each other, growing together, and making a thousand more memories. 🫂🤍'],
 ['♡ WISH #2','May you always know just how deeply loved, precious, special, and worthy you are. 🤍'],
 ['♡ WISH #3','May life be softer with you, and may the good days find you more often than the bad ones.'],
 ['♡ WISH #4','May every little dream you’ve been quietly keeping in your heart slowly find its way to you. ✨'],
 ['♡ WISH #5','May this be the year I finally get to squish my Kuchu Puchu in real life instead of doing it through a screen. 😭🤏🏼🫂'],
 ['♡ WISH #6','May you always be surrounded by the kind of love that makes you feel safe, adored, and never alone — the kind of love you deserve. 🫂🤍']
];
let wrongAttempts=0,current=0,slideIndex=0,finaleStarted=false;
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));const el=document.getElementById(id);el.classList.add('active');window.scrollTo({top:0,behavior:'smooth'});if(id==='interactiveScreen')renderInteractive();if(id==='sliderScreen')renderSlide();if(id==='wishesScreen')buildWishes();}
function catNo(){show('noScreen')}
function catYes(){show('yesScreen')}
function catBackYes(){show('yesScreen')}
function toCat4(){show('cat4Screen')}
function checkPin(){const x=document.getElementById('pin');const err=document.getElementById('pinError');if(x.value.length===4){if(x.value==='2912'){err.textContent='';show('heroScreen')}else{wrongAttempts++;x.value='';err.textContent=wrongAttempts<2?'hmm… our first little hello again 👀':'okay… I’ll help you a little 🥹';if(wrongAttempts>=2)document.getElementById('pinReveal').classList.add('shown')}}}
function renderInteractive(){const s=document.getElementById('interactiveStage');const p=interactive[current];s.innerHTML=`<div class="reveal-wrap"><div class="reveal-card"><div class="reveal-front"><img src="assets/hidden/${hiddenCats[current]}" alt="hidden cat ${current+1}"><div class="tap-hint">tap me ♡</div></div><div class="reveal-back"><div class="portrait"><img src="images/${p[0]}" alt="Fia photo ${current+1}"></div><div class="note"><b>${p[1]}</b><span>${p[2]}</span><i>♡</i></div><button class="reveal-next" aria-label="next photo">›</button></div></div></div>`;document.getElementById('progress').innerHTML=interactive.map((_,i)=>`<span class="${i===current?'on':''}">${i+1}</span>`).join('');const card=s.querySelector('.reveal-card');const next=s.querySelector('.reveal-next');card.addEventListener('click',e=>{if(e.target.closest('.reveal-next'))return;if(!card.classList.contains('open'))card.classList.add('open')});next.addEventListener('click',e=>{e.stopPropagation();if(!card.classList.contains('open')){card.classList.add('open');return}if(current<interactive.length-1){current++;renderInteractive()}else{show('sliderScreen')}})}
function buildWishes(){const g=document.getElementById('wishGrid');g.innerHTML='';wishes.forEach(w=>{const b=document.createElement('button');b.className='wish';b.innerHTML=`<b>${w[0]}</b><span>${w[1]}</span><i>+</i>`;b.onclick=()=>b.classList.toggle('revealed');g.appendChild(b)})}
function renderSlide(){const p=slides[slideIndex];const im=document.getElementById('slideImage');im.classList.add('fade');setTimeout(()=>{im.src='images/'+p[0];im.classList.remove('fade')},120);document.getElementById('slideCount').textContent=`${slideIndex+1} / 6`;document.getElementById('sliderNote').textContent=p[1];document.getElementById('slideDots').innerHTML=slides.map((_,i)=>`<span class="dot ${i===slideIndex?'active':''}"></span>`).join('')}
function slide(d){slideIndex=(slideIndex+d+slides.length)%slides.length;renderSlide()}
function blowCandles(){const stage=document.querySelector('.birthday-stage');if(stage.classList.contains('blown'))return;stage.classList.add('blown');document.getElementById('cakeText').textContent='wish made… okay my girl, one last thing 🥹🤍';document.getElementById('letterButton').classList.remove('hidden')}
function startFinale(){show('letterScreen');const v=document.getElementById('fireworks');v.pause();v.currentTime=0;finaleStarted=false;document.getElementById('player').classList.remove('playing');document.getElementById('finalLetter').classList.add('hidden')}
function playFinale(){if(finaleStarted)return;finaleStarted=true;const v=document.getElementById('fireworks'),a=document.getElementById('music'),prelude=document.getElementById('finalePrelude'),letter=document.getElementById('finalLetter');document.getElementById('songBtn').textContent='Ⅱ';v.currentTime=0;a.currentTime=0;prelude.classList.add('playing');v.play().catch(()=>{});a.play().catch(()=>{});setTimeout(()=>{prelude.classList.add('fade-away');letter.classList.remove('hidden');letter.scrollTop=0},1700);requestAnimationFrame(updateMusic)}
function toggleSong(){const a=document.getElementById('music'),b=document.getElementById('songBtn');if(a.paused){a.play();b.textContent='Ⅱ'}else{a.pause();b.textContent='▶︎'}}
function updateMusic(){const a=document.getElementById('music');if(!a.paused){const pct=a.duration?(a.currentTime/a.duration)*100:0;document.getElementById('seek').style.width=pct+'%';document.getElementById('elapsed').textContent=`${Math.floor(a.currentTime/60)}:${String(Math.floor(a.currentTime%60)).padStart(2,'0')}`;if(a.duration)document.getElementById('duration').textContent=`${Math.floor(a.duration/60)}:${String(Math.floor(a.duration%60)).padStart(2,'0')}`;requestAnimationFrame(updateMusic)}}
document.querySelector('.birthday-stage').addEventListener('click',blowCandles);renderInteractive();buildWishes();renderSlide();
