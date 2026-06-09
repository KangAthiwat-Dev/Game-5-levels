// ==================== LEVEL DATA ====================
const LEVELS = [
  {
    name:'ก้าวแรก',
    difficulty:'⭐ ง่าย',
    objective:'พาน้องหมี 🐻 ไปยังกล่องสมบัติ 🎁 — เรียนรู้การเดิน',
    size:4,
    map:[
      ['start','grass','grass','grass'],
      ['obstacle','obstacle','grass','grass'],
      ['grass','grass','grass','grass'],
      ['grass','grass','grass','end'],
    ],
    start:[0,0], end:[3,3],
    targetSteps:6,
    solution:{
      label:'6 ก้าว',
      flat:[{cmd:'right'},{cmd:'right'},{cmd:'down'},{cmd:'right'},{cmd:'down'},{cmd:'down'}],
      looped:null,
      path:[[0,0],[0,1],[0,2],[1,2],[2,2],[2,3],[3,3]]
    },
    availableCmds:['down','up','left','right'],
    terrainInfo:{obstacle:'🪨 กำแพง'},
  },
  {
    name:'ข้ามแม่น้ำ',
    difficulty:'⭐⭐ ปานกลาง',
    objective:'มีน้ำกั้น! หาเส้นทางที่ไม่ผ่านน้ำ 💧',
    size:5,
    map:[
      ['start','grass','grass','obstacle','grass'],
      ['grass','obstacle','grass','grass','grass'],
      ['grass','grass','grass','water','grass'],
      ['obstacle','grass','water','grass','grass'],
      ['grass','grass','grass','grass','end'],
    ],
    start:[0,0], end:[4,4],
    targetSteps:8,
    solution:{
      label:'8 ก้าว',
      flat:[{cmd:'right'},{cmd:'right'},{cmd:'down'},{cmd:'right'},{cmd:'right'},{cmd:'down'},{cmd:'down'},{cmd:'down'}],
      looped:[{cmd:'loop',n:2},{cmd:'right'},{cmd:'down'},{cmd:'loop',n:2},{cmd:'right'},{cmd:'loop',n:3},{cmd:'down'}],
      path:[[0,0],[0,1],[0,2],[1,2],[1,3],[1,4],[2,4],[3,4],[4,4]]
    },
    availableCmds:['down','up','left','right','loop'],
    terrainInfo:{obstacle:'🪨 กำแพง',water:'💧 น้ำ'},
  },
  {
    name:'ป่าน้ำแข็ง',
    difficulty:'⭐⭐⭐ ยาก',
    objective:'พื้นน้ำแข็งลื่น! ระวังขอบแผนที่ 🧊',
    size:5,
    map:[
      ['start','ice','ice','obstacle','grass'],
      ['grass','ice','obstacle','grass','grass'],
      ['grass','ice','ice','ice','grass'],
      ['obstacle','grass','grass','ice','obstacle'],
      ['grass','grass','grass','ice','end'],
    ],
    start:[0,0], end:[4,4],
    targetSteps:9,
    solution:{
      label:'9 ก้าว',
      flat:[{cmd:'down'},{cmd:'down'},{cmd:'right'},{cmd:'down'},{cmd:'right'},{cmd:'down'},{cmd:'right'},{cmd:'right'},{cmd:'right'}],
      looped:null,
      path:[[0,0],[1,0],[2,0],[2,1],[2,2],[2,3],[3,3],[4,3],[4,4]]
    },
    availableCmds:['down','up','left','right','loop'],
    terrainInfo:{obstacle:'🪨 กำแพง',ice:'🧊 น้ำแข็ง (ลื่น)'},
  },
  {
    name:'ทะเลทราย',
    difficulty:'⭐⭐⭐ ยาก',
    objective:'ทรายร้อน! ใช้บล็อควนซ้ำให้เก่งเพื่อเดินทางไกล 🏜️',
    size:6,
    map:[
      ['start','sand','sand','sand','obstacle','grass'],
      ['grass','obstacle','sand','sand','sand','grass'],
      ['grass','grass','sand','obstacle','sand','grass'],
      ['obstacle','grass','grass','sand','sand','sand'],
      ['grass','grass','grass','obstacle','grass','sand'],
      ['grass','grass','grass','grass','grass','end'],
    ],
    start:[0,0], end:[5,5],
    targetSteps:10,
    solution:{
      label:'10 ก้าว',
      flat:[{cmd:'down'},{cmd:'down'},{cmd:'right'},{cmd:'right'},{cmd:'down'},{cmd:'right'},{cmd:'right'},{cmd:'down'},{cmd:'down'},{cmd:'right'}],
      looped:[{cmd:'loop',n:2},{cmd:'down'},{cmd:'loop',n:2},{cmd:'right'},{cmd:'down'},{cmd:'loop',n:2},{cmd:'right'},{cmd:'loop',n:2},{cmd:'down'},{cmd:'right'}],
      path:[[0,0],[1,0],[2,0],[2,1],[2,2],[3,2],[3,3],[3,4],[4,4],[5,4],[5,5]]
    },
    availableCmds:['down','up','left','right','loop'],
    terrainInfo:{obstacle:'🪨 กำแพง',sand:'🏜️ ทราย'},
  },
  {
    name:'ภูเขาไฟ',
    difficulty:'🔥 ยากมาก',
    objective:'ระวังลาวา! เส้นทางแคบมาก ต้องวางแผนให้ดี 🌋',
    size:6,
    map:[
      ['start','grass','lava','lava','lava','grass'],
      ['grass','grass','grass','lava','grass','grass'],
      ['lava','obstacle','grass','lava','grass','lava'],
      ['lava','grass','grass','grass','obstacle','lava'],
      ['grass','grass','lava','grass','grass','grass'],
      ['grass','obstacle','lava','lava','grass','end'],
    ],
    start:[0,0], end:[5,5],
    targetSteps:10,
    solution:{
      label:'10 ก้าว',
      flat:[{cmd:'down'},{cmd:'down'},{cmd:'right'},{cmd:'right'},{cmd:'down'},{cmd:'down'},{cmd:'right'},{cmd:'right'},{cmd:'down'},{cmd:'right'}],
      looped:[{cmd:'loop',n:2},{cmd:'down'},{cmd:'loop',n:2},{cmd:'right'},{cmd:'loop',n:2},{cmd:'down'},{cmd:'loop',n:2},{cmd:'right'},{cmd:'down'},{cmd:'right'}],
      path:[[0,0],[1,0],[2,0],[2,1],[2,2],[3,2],[3,3],[4,3],[4,4],[5,4],[5,5]]
    },
    availableCmds:['down','up','left','right','loop'],
    terrainInfo:{lava:'🔥 ลาวา',obstacle:'🪨 กำแพง'},
  },
];

// ==================== GAME STATE ====================
const EMOJIS={start:'🐻',end:'🎁',obstacle:'🪨',water:'💧',grass:'',ice:'🧊',sand:'🏝️',lava:'🔥'};
const CMD_ICONS={down:'⬇',up:'⬆',left:'⬅',right:'➡'};
const CMD_LABELS={down:'ลง',up:'ขึ้น',left:'ซ้าย',right:'ขวา'};
const CMD_CLASS={down:'dn',up:'up',left:'lt',right:'rt'};
const BLOCKED=['water','lava','obstacle'];

let currentLevel=0;
let pos={r:0,c:0};
let program=[];
let running=false;
let completedLevels=[];
let levelStars={};

try{
  completedLevels=JSON.parse(localStorage.getItem('beargame_done')||'[]');
  levelStars=JSON.parse(localStorage.getItem('beargame_stars')||'{}');
}catch(e){}

function saveProgress(){
  try{
    localStorage.setItem('beargame_done',JSON.stringify(completedLevels));
    localStorage.setItem('beargame_stars',JSON.stringify(levelStars));
  }catch(e){}
}

// ==================== BUILD UI ====================
function buildLevelTabs(){
  const wrap=document.getElementById('level-tabs');
  wrap.innerHTML='';
  LEVELS.forEach((lv,i)=>{
    const btn=document.createElement('button');
    btn.className='lvl-btn'+(i===currentLevel?' active':'')+(completedLevels.includes(i)?' done':'');
    const stars=levelStars[i]||0;
    const starStr=stars>0?('⭐'.repeat(stars)):'';
    btn.innerHTML=`<span>ด่าน ${i+1}</span><span class="star">${starStr||''}</span>`;
    btn.onclick=()=>{if(!running){loadLevel(i);}};
    wrap.appendChild(btn);
  });
  // Progress bar
  const pct=(completedLevels.length/LEVELS.length)*100;
  document.getElementById('progress-bar').style.width=pct+'%';
}

function loadLevel(idx){
  currentLevel=idx;
  running=false;
  program=[];
  pos={r:LEVELS[idx].start[0],c:LEVELS[idx].start[1]};

  const lv=LEVELS[idx];
  document.getElementById('lv-label').textContent=`ด่านที่ ${idx+1}`;
  document.getElementById('lv-name').textContent=lv.name;
  document.getElementById('lv-diff').textContent=lv.difficulty;
  document.getElementById('objective').textContent=lv.objective;
  document.getElementById('target-steps').textContent=lv.solution.looped?lv.solution.looped.length:lv.solution.flat.length;

  // Update grid size
  const g=document.getElementById('grid');
  g.style.gridTemplateColumns=`repeat(${lv.size},60px)`;
  g.style.gridTemplateRows=`repeat(${lv.size},60px)`;

  // Palette
  buildPalette(lv.availableCmds);

  // Clear program
  const prog=document.getElementById('prog');
  prog.querySelectorAll('.placed').forEach(b=>b.remove());
  const h=document.getElementById('hint');
  if(h)h.style.display='';
  document.getElementById('msg').textContent='';
  document.getElementById('msg').className='msg';
  document.getElementById('block-count').textContent='0';
  document.getElementById('stars-preview').textContent='⭐⭐⭐';

  // Legend
  buildLegend(lv.terrainInfo);

  buildGrid([]);
  buildLevelTabs();
}

function buildPalette(cmds){
  const pal=document.getElementById('palette');
  pal.innerHTML='<div class="palette-label">บล็อคคำสั่ง</div>';
  cmds.forEach(cmd=>{
    if(cmd==='loop'){
      const b=document.createElement('div');
      b.className='blk lp';b.draggable=true;b.dataset.cmd='loop';
      b.innerHTML=`🔁 ×<input class="lp-n" id="lpn" type="number" min="1" max="9" value="2" onclick="event.stopPropagation()"> ถัดไป`;
      pal.appendChild(b);
    } else {
      const b=document.createElement('div');
      b.className=`blk ${CMD_CLASS[cmd]||''}`;b.draggable=true;b.dataset.cmd=cmd;
      b.textContent=`${CMD_ICONS[cmd]} ${CMD_LABELS[cmd]}`;
      pal.appendChild(b);
    }
  });
  setupDrag();
}

function buildLegend(info){
  const leg=document.getElementById('legend');
  const bg={obstacle:'#3d2b1f',water:'#1a4a6b',grass:'#2d5a1b',ice:'#a8d8e8',sand:'#8b7355',lava:'#7a2020',start:'#5a3e00',end:'#1b4d1b'};
  let html=`<div class="li"><div class="ld" style="background:#5a3e00;border:2px solid var(--gold)"></div>เริ่ม</div>`;
  html+=`<div class="li"><div class="ld" style="background:#1b4d1b;border:2px solid var(--green)"></div>สิ้นสุด</div>`;
  html+=`<div class="li"><div class="ld" style="background:#2d5a1b"></div>หญ้า</div>`;
  for(const [type,label] of Object.entries(info)){
    html+=`<div class="li"><div class="ld" style="background:${bg[type]||'#555'}"></div>${label}</div>`;
  }
  leg.innerHTML=html;
}

function buildGrid(pathCells){
  const lv=LEVELS[currentLevel];
  const g=document.getElementById('grid');g.innerHTML='';
  const pathSet=new Set((pathCells||[]).map(([r,c])=>r+','+c));
  for(let r=0;r<lv.size;r++) for(let c=0;c<lv.size;c++){
    const d=document.createElement('div');
    const type=lv.map[r][c];
    d.className='cell '+type;
    d.id=`c${r}${c}`;
    if(pathSet.has(r+','+c)&&type!=='start'&&type!=='end') d.classList.add('path-cell');
    d.textContent=EMOJIS[type]||'';
    g.appendChild(d);
  }
  drawPlayer();
}

function drawPlayer(){
  document.querySelectorAll('.player').forEach(e=>e.remove());
  const cell=document.getElementById(`c${pos.r}${pos.c}`);
  if(cell){
    cell.textContent='';
    const s=document.createElement('span');
    s.className='player';s.textContent='🐻';
    cell.appendChild(s);
  }
}

// ==================== DRAG & DROP ====================
let dragSetupDone = false;
function setupDrag(){
  const pal=document.getElementById('palette');
  const prog=document.getElementById('prog');

  if(!dragSetupDone){
    dragSetupDone=true;

    prog.addEventListener('dragover',e=>{e.preventDefault();prog.classList.add('over');});
    prog.addEventListener('dragleave',()=>prog.classList.remove('over'));
    prog.addEventListener('drop',e=>{
      e.preventDefault();prog.classList.remove('over');
      const d=e.dataTransfer.getData('text');if(d)addBlock(d);
    });
  }

  // Remove old dragstart listener and re-add fresh one on palette
  const oldPal=pal.cloneNode(true);
  pal.parentNode.replaceChild(oldPal,pal);
  const newPal=document.getElementById('palette');
  newPal.addEventListener('dragstart',e=>{
    const b=e.target.closest('[data-cmd]');if(!b)return;
    if(b.classList.contains('placed')){e.preventDefault();return;}
    const cmd=b.dataset.cmd;
    const lpn=newPal.querySelector('#lpn');
    e.dataTransfer.setData('text',cmd==='loop'?'loop:'+(lpn?lpn.value:2):cmd);
  });
}

function addBlock(data){
  const hint=document.getElementById('hint');if(hint)hint.style.display='none';
  const b=document.createElement('div');
  b.className='blk placed ';
  if(data.startsWith('loop')){
    const n=data.split(':')[1]||2;
    b.classList.add('lp');
    b.innerHTML=`🔁×${n} ถัดไป`;
    b.dataset.cmd='loop';b.dataset.n=n;
  } else {
    b.classList.add(CMD_CLASS[data]||'');
    b.textContent=`${CMD_ICONS[data]} ${CMD_LABELS[data]}`;
    b.dataset.cmd=data;
  }
  b.title='คลิกเพื่อลบ';
  b.addEventListener('click',()=>{if(!running){b.remove();updateProg();}});
  document.getElementById('prog').appendChild(b);
  updateProg();
}

function updateProg(){
  program=[];
  document.getElementById('prog').querySelectorAll('.placed').forEach(b=>{
    program.push(b.dataset.cmd==='loop'?{cmd:'loop',n:parseInt(b.dataset.n)||2}:{cmd:b.dataset.cmd});
  });
  const count=program.length;
  document.getElementById('block-count').textContent=count;

  const lv=LEVELS[currentLevel];
  const s=calcStars(program.length,lv);
  document.getElementById('stars-preview').textContent=program.length>0?'⭐'.repeat(s)+'☆'.repeat(3-s):'⭐⭐⭐';
}

function expandProg(p){
  const out=[];let i=0;
  while(i<p.length){
    if(p[i].cmd==='loop'&&i+1<p.length){
      for(let k=0;k<p[i].n;k++) out.push(p[i+1]);
      i+=2;
    } else {out.push(p[i]);i++;}
  }
  return out;
}

function calcStars(blockCount, lv){
  const sol=lv.solution;
  // threshold สำหรับ 3 ดาว: ถ้ามี looped solution ให้ใช้ความยาวนั้น ถ้าไม่มีใช้ flat
  const best3 = sol.looped ? sol.looped.length : sol.flat.length;
  const best2 = sol.flat.length;
  if(blockCount <= best3) return 3;
  if(blockCount <= best2) return 2;
  return 1;
}

// ==================== RUN ====================
async function runProgram(){
  if(running)return;running=true;
  updateProg();
  setMsg('','');
  const lv=LEVELS[currentLevel];
  pos={r:lv.start[0],c:lv.start[1]};
  buildGrid([]);

  const exp=expandProg(program);
  if(!exp.length){setMsg('ยังไม่มีคำสั่ง ลากบล็อคมาก่อนนะ 🙂','inf');running=false;return;}

  const visited=[[lv.start[0],lv.start[1]]];

  for(const s of exp){
    await delay(340);
    let{r,c}=pos,nr=r,nc=c;
    if(s.cmd==='down')nr++;
    else if(s.cmd==='up')nr--;
    else if(s.cmd==='left')nc--;
    else if(s.cmd==='right')nc++;

    if(nr<0||nr>=lv.size||nc<0||nc>=lv.size){
      setMsg('ออกนอกแผนที่! 😅 ลองเส้นทางอื่น','err');running=false;return;
    }
    const cellType=lv.map[nr][nc];
    if(cellType==='obstacle'){setMsg('ชนกำแพง! 🪨 หลีกเลี่ยงหิน','err');running=false;return;}
    if(cellType==='water'){setMsg('ตกน้ำ! 💧 น้องหมีว่ายน้ำไม่เป็น','err');running=false;return;}
    if(cellType==='lava'){setMsg('โดนลาวา! 🔥 ร้อนมาก! เลี่ยงด้วย','err');running=false;return;}

    pos={r:nr,c:nc};
    visited.push([nr,nc]);
    buildGrid(visited);
  }

  await delay(200);
  if(pos.r===lv.end[0]&&pos.c===lv.end[1]){
    const blockCount=program.length;
    const steps=exp.length;
    const stars=calcStars(blockCount,lv);
    onLevelComplete(stars,steps,blockCount);
  } else {
    setMsg('ยังไม่ถึงจุดหมาย ลองปรับเส้นทางอีกครั้ง!','inf');
  }
  running=false;
}

function onLevelComplete(stars,steps,blockCount){
  if(!completedLevels.includes(currentLevel)) completedLevels.push(currentLevel);
  if((levelStars[currentLevel]||0)<stars) levelStars[currentLevel]=stars;
  saveProgress();

  const msgs3=['สุดยอด! ใช้บล็อคน้อยมาก! 🏆','เยี่ยมเลย! โค้ดกระชับมาก! 🌟','ฉลาดมาก! ใช้ลูปได้เก่งเลย! ✨'];
  const msgs2=['ดีมาก! ลองใช้ลูปเพื่อลดบล็อคให้ได้ 3 ดาว!','ผ่านแล้ว! ลองหาวิธีใช้บล็อคให้น้อยกว่านี้ได้!','ดี! ลองใช้วนซ้ำให้ได้ 3 ดาว!'];
  const msgs1=['ผ่านด่านแล้ว! แต่ใช้บล็อคเยอะมาก ลองใหม่!','ผ่านได้! ลองปรับให้ใช้บล็อคน้อยกว่านี้นะ!'];

  const msgs=stars===3?msgs3:stars===2?msgs2:msgs1;
  const desc=msgs[Math.floor(Math.random()*msgs.length)];

  document.getElementById('win-emoji').textContent=stars===3?'🏆':stars===2?'🌟':'🎉';
  document.getElementById('win-title').textContent=`ผ่านด่าน ${currentLevel+1}!`;
  document.getElementById('win-desc').textContent=desc+` (${blockCount} บล็อค / ${steps} ก้าว)`;
  document.getElementById('win-stars').textContent='⭐'.repeat(stars)+'☆'.repeat(3-stars);

  const nextBtn=document.getElementById('win-next-btn');
  if(currentLevel<LEVELS.length-1){
    nextBtn.style.display='';
    nextBtn.textContent=`ด่านที่ ${currentLevel+2} ➡`;
  } else {
    nextBtn.style.display='none';
  }

  document.getElementById('win-overlay').classList.add('show');
  buildLevelTabs();
}

function nextLevel(){
  closeWin();
  if(currentLevel<LEVELS.length-1) loadLevel(currentLevel+1);
}

function closeWin(){
  document.getElementById('win-overlay').classList.remove('show');
  resetGame();
}

function resetGame(){
  running=false;
  const lv=LEVELS[currentLevel];
  pos={r:lv.start[0],c:lv.start[1]};
  program=[];
  document.getElementById('prog').querySelectorAll('.placed').forEach(b=>b.remove());
  const h=document.getElementById('hint');if(h)h.style.display='';
  setMsg('','');
  document.getElementById('block-count').textContent='0';
  document.getElementById('stars-preview').textContent='⭐⭐⭐';
  buildGrid([]);
}

function setMsg(t,tp){
  const e=document.getElementById('msg');
  e.className='msg'+(tp?' '+tp:'');
  e.textContent=t;
}

function delay(ms){return new Promise(res=>setTimeout(res,ms));}

// ==================== INIT ====================
setupDrag();
loadLevel(0);
