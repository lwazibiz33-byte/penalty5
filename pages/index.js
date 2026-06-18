import { useState, useEffect, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

// ─── LOGO ───────────────────────────────────────────────────────────────────
const LOGO = "data:image/webp;base64,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";

// ─── NATIONS ────────────────────────────────────────────────────────────────
const NATIONS = [
  {id:"nga",name:"Nigeria",      short:"NGA",flag:"🇳🇬",color:"#008751",dark:"#005C37",kit:"#FFFFFF",skin:"#7A4020",crowd:"#1A6B2A"},
  {id:"mar",name:"Morocco",      short:"MAR",flag:"🇲🇦",color:"#C1272D",dark:"#8B0000",kit:"#FFFFFF",skin:"#C8956C",crowd:"#B01820"},
  {id:"gha",name:"Ghana",        short:"GHA",flag:"🇬🇭",color:"#006B3F",dark:"#004A2B",kit:"#FCD116",skin:"#7A4020",crowd:"#1A5B30"},
  {id:"rsa",name:"South Africa", short:"RSA",flag:"🇿🇦",color:"#007A4D",dark:"#005535",kit:"#FFB81C",skin:"#7A4020",crowd:"#1A6B40"},
  {id:"sen",name:"Senegal",      short:"SEN",flag:"🇸🇳",color:"#00853F",dark:"#005C2B",kit:"#FFFFFF",skin:"#7A4020",crowd:"#1A6B30"},
];
const ZONES=[{id:0,label:"LEFT",arrow:"←"},{id:1,label:"CENTRE",arrow:"↑"},{id:2,label:"RIGHT",arrow:"→"}];
const MULTS=[1.5,2.2,3.5,5.0,10.0];
const W=500,H=460;
const GL={l:162,r:338,top:58,bot:128};
const GZW=(GL.r-GL.l)/3;
const BS={x:250,y:232};
const BD=[{x:192,y:92},{x:250,y:79},{x:308,y:92}];
const KX=[202,250,298];
const WU=500;
const C={bg:"#04100A",card:"#0D1A0F",surf:"#0A1510",bdr:"#1A2E1C",gold:"#FFD700",grn:"#00D97E",red:"#E8453C",wht:"#F0EDE8",mut:"#4A6A4A"};

function kick(pz){const kz=Math.floor(Math.random()*3);return{bz:pz,kz,scored:kz!==pz};}
function p2(a){return[...a].sort(()=>Math.random()-0.5).slice(0,2);}
function narr(o){if(!o)return"";const s=ZONES[o.bz].label,d=ZONES[o.kz].label;return o.scored?"Shot "+s+". Keeper dived "+d+". Unstoppable.":"Keeper read it. Dived "+d+". Perfectly saved.";}

// ─── MINI GOAL DIAGRAM ───────────────────────────────────────────────────────
function MiniGoal({zone, color}){
  const zones=[{sx:17,sy:24,tx:10,ty:12},{sx:30,sy:24,tx:30,ty:12},{sx:43,sy:24,tx:50,ty:12}];
  const z=zones[zone];
  const zoneRects=[[4,2,16,21],[20,2,20,21],[40,2,16,21]];
  const [rx,ry,rw,rh]=zoneRects[zone];
  return(
    <svg width="60" height="27" viewBox="0 0 60 27" style={{display:"block"}}>
      <rect x="4" y="2" width="52" height="21" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" fill="rgba(0,0,0,0.25)" rx="1"/>
      <rect x={rx} y={ry} width={rw} height={rh} fill={color+"66"} rx="1"/>
      <line x1="24" y1="2" x2="24" y2="23" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
      <line x1="36" y1="2" x2="36" y2="23" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
      <path d={"M "+z.sx+","+z.sy+" Q "+((z.sx+z.tx)/2)+","+(z.sy-8)+" "+z.tx+","+z.ty} stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeDasharray="3,2" fill="none"/>
      <circle cx={z.tx} cy={z.ty} r="3" fill="white"/>
    </svg>
  );
}

// ─── INTRO ───────────────────────────────────────────────────────────────────
function Intro({done}){
  const [ph,setPh]=useState(0);
  const [fl,setFl]=useState(false);
  useEffect(()=>{
    const ts=[
      setTimeout(()=>setPh(1),150),
      setTimeout(()=>{setPh(2);setFl(true);setTimeout(()=>setFl(false),250);},600),
      setTimeout(()=>setPh(3),1300),
      setTimeout(()=>setPh(4),2100),
      setTimeout(go,6000),
    ];
    return()=>ts.forEach(clearTimeout);
  },[]);
  function go(){setFl(true);setTimeout(done,300);}
  return(
    <div onClick={ph>=4?go:undefined} style={{background:"#000",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",fontFamily:"Inter,sans-serif",cursor:ph>=4?"pointer":"default"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 38%,#091A0B 0%,#000 68%)"}}/>
      <div style={{position:"absolute",top:0,left:"15%",width:"70%",height:"45%",background:"radial-gradient(ellipse at 50% 0%,rgba(255,255,220,0.07) 0%,transparent 70%)"}}/>
      <div style={{position:"absolute",inset:0,opacity:fl?1:0,background:"white",transition:"opacity 0.12s",pointerEvents:"none",zIndex:30}}/>
      <div style={{position:"relative",zIndex:10,display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
        <div style={{opacity:ph>=2?1:0,transform:ph>=2?"scale(1) translateY(0)":"scale(0.25) translateY(50px)",transition:"opacity 0.35s,transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",filter:ph>=2?"drop-shadow(0 0 28px #22FF44) drop-shadow(0 0 55px #009920)":"none"}}>
          <img src={LOGO} alt="Penalty 5" style={{width:"min(86vw,410px)",display:"block"}}/>
        </div>
        <div style={{opacity:ph>=3?1:0,transition:"opacity 0.5s 0.1s",letterSpacing:6,fontSize:11,color:"rgba(255,255,255,0.45)",fontWeight:700}}>WORLD CUP SHOOTOUT</div>
        <div style={{opacity:ph>=4?1:0,transform:ph>=4?"scale(1)":"scale(0.75)",transition:"opacity 0.4s,transform 0.4s cubic-bezier(0.34,1.56,0.64,1)"}}>
          <button onClick={go} style={{padding:"14px 46px",background:"linear-gradient(135deg,#22FF44,#009C3B)",border:"none",borderRadius:40,color:"#000",fontSize:15,fontWeight:900,cursor:"pointer",letterSpacing:2,boxShadow:"0 0 28px rgba(34,255,68,0.55)",animation:"kPulse 1.6s ease-in-out infinite"}}>⚽ KICK OFF</button>
        </div>
      </div>
      <div style={{position:"absolute",bottom:18,fontSize:10,color:"rgba(255,255,255,0.15)",letterSpacing:3,zIndex:10}}>SENEZO MEDIA GROUP · DEMO</div>
      <style>{`
        html,body{background:#000!important;margin:0;padding:0}
        @keyframes kPulse{0%,100%{box-shadow:0 0 28px rgba(34,255,68,0.55)}50%{box-shadow:0 0 55px rgba(34,255,68,0.9)}}
        *{box-sizing:border-box}
      `}</style>
    </div>
  );
}
// ─── 3D PITCH COMPONENT ────────────────────────────────────────────────────
function Pitch3D({ kickerTeam, keeperTeam, ph, sz, kzone, anim, bx, by, pw, rip }) {
  const ballX3 = ((bx - 250) / 250) * 6;
  const ballY3 = 3.5 - ((by - 80) / 150) * 3;
  const keeperX3 = ((KX[kzone] - 250) / 250) * 4.5;

  return (
    <group>
      {/* Pitch */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, -2]}>
        <planeGeometry args={[10, 12]} />
        <meshStandardMaterial color="#1A5C1A" />
      </mesh>

      {/* Goal */}
      <group position={[0, 1.8, -5.5]}>
        <mesh position={[-2, 0, 0]}>
          <boxGeometry args={[0.15, 1.5, 0.15]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[2, 0, 0]}>
          <boxGeometry args={[0.15, 1.5, 0.15]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[0, 0.75, 0]}>
          <boxGeometry args={[4.15, 0.15, 0.15]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[0, 0.4, -0.8]}>
          <planeGeometry args={[3.9, 1.2]} />
          <meshStandardMaterial color="rgba(255,255,255,0.15)" side={2} />
        </mesh>
      </group>

      {/* Keeper */}
      <group position={[keeperX3, 0.3, -4.8]}>
        <mesh position={[0, 0.6, 0]}>
          <capsuleGeometry args={[0.3, 0.8]} />
          <meshStandardMaterial color={keeperTeam.color} />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.25]} />
          <meshStandardMaterial color={keeperTeam.skin} />
        </mesh>
        <mesh position={[-0.35, 0.9, 0]}>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
        <mesh position={[0.35, 0.9, 0]}>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
      </group>

      {/* Kicker */}
      <group position={[0, -0.3, 2.5]}>
        <mesh position={[0, 0.7, 0]}>
          <capsuleGeometry args={[0.32, 0.9]} />
          <meshStandardMaterial color={kickerTeam.color} />
        </mesh>
        <mesh position={[0, 1.35, 0]}>
          <sphereGeometry args={[0.25]} />
          <meshStandardMaterial color={kickerTeam.skin} />
        </mesh>
        <mesh position={[-0.15, 0.15, 0]}>
          <capsuleGeometry args={[0.12, 0.5]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[0.15, 0.15, 0]}>
          <capsuleGeometry args={[0.12, 0.5]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>

      {/* Ball */}
      <mesh position={[ballX3, ballY3, (by > 200 ? 2 : -3)]}>
        <sphereGeometry args={[0.25]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
}
// ════════════════════════════════════════════════════════════════════════════
export default function Penalty5(){
  const [intro,setIntro]=useState(true);
  const [scr,setScr]=useState("matchup");
  const [teams,setTeams]=useState(()=>p2(NATIONS));
  const [kn,setKn]=useState(1);
  const [pot,setPot]=useState(0);
  const [bet,setBet]=useState(100);
  const [log,setLog]=useState([]);
  const [res,setRes]=useState(null);
  const [fp,setFp]=useState(0);
  const [ph,setPh]=useState("idle");
  const [bt,setBt]=useState(5);
  const [sz,setSz]=useState(null);
  const [out,setOut]=useState(null);
  const [ct,setCt]=useState(5);
  const [pw,setPw]=useState(0);
  const [bx,setBx]=useState(BS.x);
  const [by,setBy]=useState(BS.y);
  const [kzone,setKzone]=useState(1);
  const [anim,setAnim]=useState(false);
  const [rip,setRip]=useState(false);

  const knR=useRef(1),potR=useRef(0),betR=useRef(100),logR=useRef([]);
  const tR=useRef(null),pwR=useRef(null),coR=useRef(null),bbR=useRef(null);

  useEffect(()=>{knR.current=kn;},[kn]);
  useEffect(()=>{potR.current=pot;},[pot]);
  useEffect(()=>{betR.current=bet;},[bet]);
  useEffect(()=>{logR.current=log;},[log]);

  const kt=teams[0],kpt=teams[1];

  const doKick=useCallback((pz)=>{
    if(pz===null)pz=1;
    setPh("animating");setAnim(true);
    const r=kick(pz);
    setKzone(r.kz);
    setTimeout(()=>{
      setAnim(false);
      const n=knR.current,b=betR.current;
      const np=r.scored?Math.round(b*MULTS[n-1]):0;
      const nl=[...logR.current,{...r,kn:n}];
      logR.current=nl;setLog(nl);
      if(r.scored){potR.current=np;setPot(np);setRip(true);setTimeout(()=>setRip(false),1000);}
      setOut({...r,kn:n,pot:np});setPh("showing");
      if(!r.scored){potR.current=0;setPot(0);setTimeout(()=>{setRes("saved");setFp(0);setScr("summary");},2500);}
      else if(n>=5){setTimeout(()=>{setRes("done");setFp(np);setScr("summary");},2100);}
      else{setTimeout(()=>{
        setPh("cto");let t=5;setCt(t);
        coR.current=setInterval(()=>{t--;setCt(t);if(t<=0){clearInterval(coR.current);const nk=knR.current+1;knR.current=nk;setKn(nk);bbR.current?.();}},1000);
      },1800);}
    },2100);
  },[]);

  const windup=useCallback((z)=>{
    setPh("windup");setPw(0);let p=0;const step=100/(WU/16);
    pwR.current=setInterval(()=>{p=Math.min(100,p+step);setPw(p);if(p>=100){clearInterval(pwR.current);doKick(z);}},16);
  },[doKick]);

  const startBet=useCallback(()=>{
    setBx(BS.x);setBy(BS.y);setKzone(1);setSz(null);setOut(null);setAnim(false);setPw(0);setRip(false);
    setPh("betting");let t=5;setBt(t);
    tR.current=setInterval(()=>{t--;setBt(t);if(t<=0){clearInterval(tR.current);doKick(null);}},1000);
  },[doKick]);

  useEffect(()=>{bbR.current=startBet;},[startBet]);

  const pickZone=useCallback((z)=>{if(ph!=="betting")return;clearInterval(tR.current);setSz(z);windup(z);},[ph,windup]);
  const collect=useCallback(()=>{clearInterval(coR.current);setRes("cash");setFp(potR.current);setScr("summary");},[]);
  const riskIt=useCallback(()=>{clearInterval(coR.current);const nk=knR.current+1;knR.current=nk;setKn(nk);startBet();},[startBet]);

  const newGame=useCallback(()=>{
    const nt=p2(NATIONS);setTeams(nt);
    setKn(1);knR.current=1;setPot(0);potR.current=0;
    setLog([]);logR.current=[];setRes(null);setFp(0);
    setScr("game");setTimeout(startBet,400);
  },[startBet]);

  const Dots=()=>(
    <div style={{display:"flex",gap:5,justifyContent:"center",marginTop:4}}>
      {MULTS.map((_,i)=>{const k=log[i],cur=!k&&i===kn-1&&ph!=="idle";return<div key={i} style={{width:10,height:10,borderRadius:"50%",transition:"all 0.3s",background:!k?(cur?C.gold:C.bdr):k.scored?C.grn:C.red,boxShadow:cur?"0 0 8px "+C.gold+"99":"none"}}/>;})}</div>
  );

  if(intro){ return (<Intro done={()=>setIntro(false)}/>); }

  // ── MATCHUP ────────────────────────────────────────────────────────────────
  if(scr==="matchup") return(
    <div style={{background:C.bg,minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"Inter,sans-serif",color:C.wht,padding:20,boxSizing:"border-box"}}>
      <img src={LOGO} alt="Penalty 5" style={{width:"min(72vw,300px)",marginBottom:16,filter:"drop-shadow(0 0 16px rgba(34,200,50,0.4))"}}/>
      <div style={{display:"flex",alignItems:"center",gap:20,marginBottom:18}}>
        <div style={{textAlign:"center"}}><div style={{fontSize:44}}>{teams[0].flag}</div><div style={{fontSize:11,fontWeight:800,marginTop:5,letterSpacing:1}}>{teams[0].name.toUpperCase()}</div></div>
        <div style={{fontSize:13,fontWeight:900,color:C.mut,padding:"6px 14px",border:"1px solid "+C.bdr,borderRadius:20}}>VS</div>
        <div style={{textAlign:"center"}}><div style={{fontSize:44}}>{teams[1].flag}</div><div style={{fontSize:11,fontWeight:800,marginTop:5,letterSpacing:1}}>{teams[1].name.toUpperCase()}</div></div>
      </div>
      <div style={{background:C.card,border:"1px solid "+C.bdr,borderRadius:14,padding:"13px 18px",width:"100%",maxWidth:340,marginBottom:14}}>
        <div style={{fontSize:10,color:C.mut,letterSpacing:2,marginBottom:9}}>ESCALATING POT</div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
          {MULTS.map((m,i)=>(<div key={i} style={{textAlign:"center"}}>
            <div style={{fontSize:9,color:C.mut,marginBottom:3}}>KICK {i+1}</div>
            <div style={{fontSize:14,fontWeight:900,color:i===4?C.gold:C.wht}}>{m}x</div>
          </div>))}
        </div>
        <div style={{fontSize:10,color:C.mut,textAlign:"center",lineHeight:1.5}}>Score → pot grows · Cash out anytime · Save = pot lost</div>
      </div>
      <div style={{background:C.card,border:"1px solid "+C.bdr,borderRadius:14,padding:"11px 18px",width:"100%",maxWidth:340,marginBottom:14}}>
        <div style={{fontSize:10,color:C.mut,letterSpacing:2,marginBottom:7}}>HOW TO PLAY</div>
        {["You are the kicker — pick Left, Centre or Right","Keeper dives randomly — beat them to score","Cash out after any goal or ride it all the way to 10x"].map((t,i)=>(
          <div key={i} style={{display:"flex",gap:9,marginBottom:6}}><span style={{color:C.gold,fontWeight:900,fontSize:11,marginTop:1,minWidth:14}}>0{i+1}</span><span style={{fontSize:11,lineHeight:1.5}}>{t}</span></div>
        ))}
      </div>
      <div style={{width:"100%",maxWidth:340,marginBottom:16}}>
        <div style={{fontSize:10,color:C.mut,letterSpacing:2,marginBottom:7}}>YOUR BET (R)</div>
        <div style={{display:"flex",gap:7,marginBottom:6}}>
          {[50,100,200,500].map(v=>(<button key={v} onClick={()=>setBet(v)} style={{flex:1,padding:"11px 0",borderRadius:9,background:bet===v?"rgba(255,215,0,0.13)":C.card,border:"1px solid "+(bet===v?C.gold:C.bdr),color:bet===v?C.gold:C.mut,fontWeight:800,fontSize:13,cursor:"pointer"}}>{v}</button>))}
        </div>
        <div style={{fontSize:10,color:C.mut,textAlign:"center"}}>Max payout: R{bet*10} if you score all 5 kicks</div>
      </div>
      <button onClick={newGame} style={{width:"100%",maxWidth:340,padding:"15px 0",background:"linear-gradient(135deg,#FFD700,#C8900A)",border:"none",borderRadius:13,color:"#000",fontSize:15,fontWeight:900,cursor:"pointer",letterSpacing:1}}>START SHOOTOUT →</button>
      <div style={{marginTop:16,fontSize:10,color:C.bdr,letterSpacing:1}}>PENALTY 5 · SENEZO MEDIA GROUP · DEMO</div>
      <style>{`html,body{background:#04100A!important;margin:0}button:active{transform:scale(0.97)}*{box-sizing:border-box}`}</style>
    </div>
  );

  // ── SUMMARY ────────────────────────────────────────────────────────────────
  if(scr==="summary"){
    const profit=fp-bet;
    const icon=res==="done"?"🏆":res==="cash"?"💰":"🧤";
    const title=res==="done"?"PERFECT SHOOTOUT!":res==="cash"?"CASHED OUT":"SAVED";
    const goals=log.filter(k=>k.scored).length;
    return(
      <div style={{background:C.bg,minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"Inter,sans-serif",color:C.wht,padding:22,boxSizing:"border-box"}}>
        <img src={LOGO} alt="Penalty 5" style={{width:"min(58vw,210px)",marginBottom:12,filter:"drop-shadow(0 0 10px rgba(34,200,50,0.22))"}}/>
        <div style={{fontSize:48,marginBottom:5}}>{icon}</div>
        <div style={{fontSize:20,fontWeight:900,letterSpacing:3,color:res==="saved"?C.mut:C.gold,marginBottom:4}}>{title}</div>
        <div style={{fontSize:11,color:C.mut,marginBottom:18}}>{teams[0].flag} {teams[0].name} vs {teams[1].flag} {teams[1].name}</div>
        <div style={{display:"flex",gap:9,marginBottom:18}}>
          {MULTS.map((_,i)=>{const k=log[i];return(
            <div key={i} style={{textAlign:"center",opacity:!k?0.22:1}}>
              <div style={{width:36,height:36,borderRadius:"50%",background:!k?C.bdr:k.scored?C.grn:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,margin:"0 auto"}}>{!k?"·":k.scored?"⚽":"🧤"}</div>
              <div style={{fontSize:9,color:C.mut,marginTop:3}}>{MULTS[i]}x</div>
            </div>
          );})}
        </div>
        <div style={{background:C.card,border:"1px solid "+C.bdr,borderRadius:14,padding:18,width:"100%",maxWidth:300,marginBottom:18}}>
          <div style={{fontSize:10,color:C.mut,letterSpacing:2,marginBottom:12}}>RESULT</div>
          {[["Goals scored",goals+" of 5"],["Bet placed","R"+bet]].map(([l,v])=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:9}}><span style={{color:C.mut,fontSize:13}}>{l}</span><span style={{fontWeight:700,fontSize:13}}>{v}</span></div>
          ))}
          <div style={{borderTop:"1px solid "+C.bdr,paddingTop:11,marginTop:4}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
              <span style={{color:C.mut,fontSize:13}}>Collected</span>
              <span style={{fontWeight:900,fontSize:27,color:fp>0?C.gold:C.red}}>R{fp}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <span style={{color:C.mut,fontSize:12}}>Net profit</span>
              <span style={{fontWeight:800,fontSize:15,color:profit>=0?C.grn:C.red}}>{profit>=0?"+":""}R{profit}</span>
            </div>
          </div>
        </div>
        <button onClick={newGame} style={{width:"100%",maxWidth:300,padding:"13px 0",background:"linear-gradient(135deg,#FFD700,#C8900A)",border:"none",borderRadius:11,color:"#000",fontSize:14,fontWeight:900,cursor:"pointer",marginBottom:8}}>PLAY AGAIN ↺</button>
        <div style={{fontSize:10,color:C.bdr,letterSpacing:1}}>PENALTY 5 · SENEZO MEDIA GROUP · DEMO</div>
        <style>{`html,body{background:#04100A!important;margin:0}button:active{transform:scale(0.97)}*{box-sizing:border-box}`}</style>
      </div>
    );
  }

  // ── GAME ──────────────────────────────────────────────────────────────────
  const nm=MULTS[kn]||null;

  return(
    <div style={{background:C.bg,minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",fontFamily:"Inter,sans-serif",color:C.wht,padding:"10px 12px",boxSizing:"border-box"}}>

      {/* ── SCOREBOARD ── */}
      <div style={{width:"100%",maxWidth:520,display:"flex",gap:8,marginBottom:8,alignItems:"stretch"}}>
        <div style={{flex:1,background:C.card,border:"1px solid "+kt.color+"66",borderRadius:12,padding:"9px 12px"}}>
          <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4}}>
            <div style={{fontSize:22}}>{kt.flag}</div>
            <div>
              <div style={{fontSize:11,fontWeight:800,letterSpacing:0.5}}>{kt.name.toUpperCase()}</div>
              <div style={{fontSize:9,color:kt.color,fontWeight:700}}>KICKER</div>
            </div>
          </div>
          <Dots/>
        </div>
        <div style={{background:C.card,border:"1px solid "+(pot>0?C.gold:C.bdr),borderRadius:12,padding:"8px 14px",textAlign:"center",minWidth:130,transition:"border-color 0.3s",boxShadow:pot>0?"0 0 16px "+C.gold+"22":"none"}}>
          <div style={{fontSize:10,color:C.mut,letterSpacing:2,marginBottom:2}}>PENALTY 5</div>
          <div style={{fontSize:pot>0?28:14,fontWeight:900,color:pot>0?C.gold:C.wht,lineHeight:1,transition:"all 0.4s",textShadow:pot>0?"0 0 16px "+C.gold+"88":"none"}}>{pot>0?"R"+pot:"—"}</div>
          <div style={{fontSize:9,color:pot>0?C.gold:C.mut,marginTop:2,letterSpacing:1}}>{pot>0?MULTS[kn-2]+"x · AT RISK":"PLACE YOUR SHOT"}</div>
        </div>
        <div style={{flex:1,background:C.card,border:"1px solid "+kpt.color+"66",borderRadius:12,padding:"9px 12px",textAlign:"right"}}>
          <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4,justifyContent:"flex-end"}}>
            <div>
              <div style={{fontSize:11,fontWeight:800,letterSpacing:0.5}}>{kpt.name.toUpperCase()}</div>
              <div style={{fontSize:9,color:kpt.color,fontWeight:700}}>KEEPER</div>
            </div>
            <div style={{fontSize:22}}>{kpt.flag}</div>
          </div>
        </div>
      </div>

      {/* ── 3D PITCH CANVAS ────────────────────────────────────────────────── */}
      <div style={{width:"100%",maxWidth:520,height:300,position:"relative",borderRadius:16,overflow:"hidden",marginBottom:8,border:"1px solid "+C.bdr}}>
        <Canvas camera={{position:[0, 3.5, 10], fov:45}}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5,10,5]} intensity={0.8} />
          <hemisphereLight args={["#87CEFA","#1A5C1A",0.3]} />
          <Pitch3D kickerTeam={kt} keeperTeam={kpt} ph={ph} sz={sz} kzone={kzone} anim={anim} bx={bx} by={by} pw={pw} rip={rip} />
        </Canvas>
        {ph==="showing"&&out&&(
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.76)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,borderRadius:16,zIndex:20}}>
            <div style={{fontSize:52}}>{out.scored?"⚽":"🧤"}</div>
            <div style={{fontSize:38,fontWeight:900,letterSpacing:5,color:out.scored?C.gold:C.mut,textShadow:"0 0 30px "+(out.scored?C.gold:C.mut)+"77"}}>{out.scored?"GOAL!":"SAVED!"}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",textAlign:"center",maxWidth:"70%",lineHeight:1.6}}>{narr(out)}</div>
            {out.scored&&<div style={{padding:"8px 22px",borderRadius:22,background:"rgba(255,215,0,0.18)",border:"1px solid "+C.gold,color:C.gold,fontWeight:800,fontSize:15}}>{"POT: R"+out.pot+" · "+MULTS[out.kn-1]+"x"}</div>}
            {!out.scored&&<div style={{padding:"8px 22px",borderRadius:22,background:"rgba(232,69,60,0.18)",border:"1px solid "+C.red,color:C.red,fontWeight:800,fontSize:14}}>{"Pot lost · −R"+bet}</div>}
          </div>
        )}
      </div>

      {/* ── CONTROL PANEL ── */}
      <div style={{width:"100%",maxWidth:520,background:C.card,border:"1px solid "+(ph==="cto"?C.gold:C.bdr),borderRadius:14,padding:"13px 14px",transition:"border-color 0.3s",boxShadow:ph==="cto"?"0 0 22px "+C.gold+"22":"none"}}>

        {/* BETTING */}
        {ph==="betting"&&(
          <>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div>
                <div style={{fontSize:13,fontWeight:800}}>PICK YOUR SPOT</div>
                <div style={{fontSize:10,color:C.mut,marginTop:2}}>{"KICK "+kn+" OF 5  ·  IF GOAL → R"+Math.round(bet*MULTS[kn-1])+" ("+MULTS[kn-1]+"x)"+(pot>0?"  ·  Pot R"+pot+" at risk":"")}</div>
              </div>
              <div style={{width:36,height:36,borderRadius:"50%",border:"2px solid "+(bt<=1?C.red:C.gold),background:bt<=1?"rgba(232,69,60,0.15)":"rgba(255,215,0,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:900,color:bt<=1?C.red:C.gold,transition:"all 0.3s"}}>{bt}</div>
            </div>
            <div style={{display:"flex",gap:8,marginBottom:10}}>
              {ZONES.map((z,zi)=>(
                <button key={z.id} onClick={()=>pickZone(z.id)} style={{flex:1,padding:"12px 6px 10px",background:"#1A5C1A",border:"2px solid "+C.grn,borderRadius:11,color:"white",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,transition:"all 0.12s"}}>
                  <div style={{fontSize:11,fontWeight:900,letterSpacing:1,display:"flex",alignItems:"center",gap:4}}>
                    {z.arrow}
                    {z.label}
                  </div>
                  <div style={{fontSize:9,color:"rgba(255,255,255,0.65)",marginBottom:5}}>SHOOT {z.label}</div>
                  <MiniGoal zone={zi} color="white"/>
                </button>
              ))}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.mut}}>
              <span>{"Bet: R"+bet}</span>
              {pot>0&&<span style={{color:C.gold}}>{"💰 Pot: R"+pot}</span>}
              <span>{"Max: R"+bet*10}</span>
            </div>
          </>
        )}

        {/* WINDUP */}
        {ph==="windup"&&<div style={{textAlign:"center",padding:"10px 0"}}><div style={{fontSize:13,fontWeight:800,color:C.gold,letterSpacing:2,marginBottom:3}}>{"SHOOTING "+(sz!==null?ZONES[sz].label:"")+" "+(sz!==null?ZONES[sz].arrow:"")}</div><div style={{fontSize:11,color:C.mut}}>Run-up locked in...</div></div>}

        {/* ANIMATING */}
        {ph==="animating"&&<div style={{textAlign:"center",padding:"12px 0"}}>
          <div style={{fontSize:12,fontWeight:700,color:C.mut,letterSpacing:3,marginBottom:9}}>IN THE AIR...</div>
          <div style={{display:"flex",justifyContent:"center",gap:7}}>{[0,1,2].map(i=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:C.gold,animation:"dp 1.2s ease-in-out "+(i*0.2)+"s infinite"}}/>)}</div>
        </div>}

        {/* SHOWING */}
        {ph==="showing"&&<div style={{textAlign:"center",padding:"9px 0",color:C.mut,fontSize:12}}>{out?.scored?"Deciding your next move...":"Game over."}</div>}

        {/* CASHOUT OFFER */}
        {ph==="cto"&&(
          <div style={{display:"flex",flexDirection:"column",gap:11}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontSize:11,color:C.mut}}>{"KICK "+(kn-1)+" ⚽ SCORED"}</div>
              <div style={{fontSize:10,color:C.mut}}>{"Saved → "}<span style={{color:C.red}}>{"lose R"+bet}</span>{"  ·  Goal → "}<span style={{color:C.gold}}>{nm?"R"+Math.round(bet*nm):"—"}</span></div>
            </div>
            <div style={{textAlign:"center",padding:"12px 0",background:"rgba(255,215,0,0.07)",borderRadius:11,border:"1px solid rgba(255,215,0,0.22)"}}>
              <div style={{fontSize:10,color:C.gold,letterSpacing:2,marginBottom:3}}>CURRENT POT</div>
              <div style={{fontSize:44,fontWeight:900,color:C.gold,lineHeight:1,textShadow:"0 0 22px "+C.gold+"77"}}>{"R"+pot}</div>
              <div style={{fontSize:10,color:C.mut,marginTop:3}}>{MULTS[kn-2]+"x your bet · secured if you collect"}</div>
            </div>
            <div style={{display:"flex",gap:9}}>
              <button onClick={collect} style={{flex:2,padding:"14px 0",background:"linear-gradient(135deg,"+C.grn+",#009B5A)",border:"none",borderRadius:11,color:"#000",fontSize:14,fontWeight:900,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",animation:"pulse 1s ease-in-out infinite"}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontSize:18}}>💵</span>
                  <span>{"COLLECT R"+pot}</span>
                </div>
                <span style={{fontSize:10,fontWeight:600,opacity:0.75,marginTop:3}}>{"SAFE · "+ct+"s left"}</span>
              </button>
              {nm&&<button onClick={riskIt} style={{flex:1,padding:"14px 0",background:C.surf,border:"2px solid "+C.gold,borderRadius:11,color:C.gold,fontSize:13,fontWeight:800,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center"}}>
                <span>{"KICK "+kn+" →"}</span>
                <span style={{fontSize:10,color:C.mut,marginTop:3}}>{nm+"x · R"+Math.round(bet*nm)}</span>
              </button>}
            </div>
          </div>
        )}

        {ph==="idle"&&<div style={{textAlign:"center",padding:10,color:C.mut,fontSize:13}}>Loading...</div>}
      </div>

      <div style={{marginTop:12,fontSize:10,color:C.bdr,letterSpacing:1}}>PENALTY 5 · SENEZO MEDIA GROUP · DEMO</div>
      <style>{`
        html,body{background:#04100A!important;margin:0;padding:0}
        @keyframes dp{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.02)}}
        @keyframes rp{0%{opacity:0}30%{opacity:1}100%{opacity:0}}
        button:active{transform:scale(0.97)}
        *{box-sizing:border-box}
      `}</style>
    </div>
  );
}
