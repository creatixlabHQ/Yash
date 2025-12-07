function runCounter(id, max){
  let c=0;const el=document.getElementById(id);
  const i=setInterval(()=>{
    c+=Math.ceil(max/60);
    if(c>=max){el.textContent=max;clearInterval(i);}
    else el.textContent=c;
  },30);
}

runCounter("forms",1200)
runCounter("users",600)
runCounter("emails",9800)

function copyCode(){
  const code = document.getElementById("codeBox").innerText;
  navigator.clipboard.writeText(code)
  alert("Code copied ✅")
}

function scrollToSection(id){
  document.getElementById(id).scrollIntoView({behavior:"smooth"})
}

// particles
const canvas=document.createElement("canvas")
canvas.style.position="fixed"
canvas.style.inset="0"
canvas.style.zIndex="-1"
document.body.appendChild(canvas)
const ctx=canvas.getContext("2d")

function resize(){
  canvas.width=innerWidth
  canvas.height=innerHeight
}
resize()
window.addEventListener("resize",resize)

const dots=new Array(80).fill().map(()=>({
  x:Math.random()*innerWidth,
  y:Math.random()*innerHeight,
  r:Math.random()*2+1,
  dx:Math.random()-.5,
  dy:Math.random()-.5
}))

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height)
  ctx.fillStyle="#00ffe1"
  dots.forEach(d=>{
    d.x+=d.dx
    d.y+=d.dy
    if(d.x<0||d.x>innerWidth)d.dx*=-1
    if(d.y<0||d.y>innerHeight)d.dy*=-1
    ctx.beginPath()
    ctx.arc(d.x,d.y,d.r,0,Math.PI*2)
    ctx.fill()
  })
  requestAnimationFrame(animate)
}
animate()
