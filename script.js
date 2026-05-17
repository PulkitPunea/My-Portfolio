let currentTheme="light";
function toggleTheme(){
  currentTheme=currentTheme==="light"?"dark":"light";
  document.documentElement.setAttribute("data-theme",currentTheme);
  document.getElementById("themeBtn").textContent=currentTheme==="dark"?"☀️":"🌙";
}
function scrollToSection(id){
  document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  document.querySelectorAll(".nav-tab").forEach(t=>t.classList.remove("active"));
  event.target.classList.add("active");
}
const roles=["3D Games","Blueprint Logic","C++ Plugins","UE4 Systems","Game Mechanics"];
let ri=0,ci=0,deleting=false,tw=document.getElementById("typewriter");
function typeLoop(){
  const word=roles[ri];
  if(!deleting){tw.textContent=word.slice(0,ci+1);ci++;if(ci===word.length){deleting=true;setTimeout(typeLoop,1800);return}}
  else{tw.textContent=word.slice(0,ci-1);ci--;if(ci===0){deleting=false;ri=(ri+1)%roles.length}}
  setTimeout(typeLoop,deleting?60:110);
}
typeLoop();
function animateSkills(){document.querySelectorAll(".skill-fill").forEach(el=>{el.style.width=el.dataset.w+"%"});}
const skillsObs=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){animateSkills();skillsObs.disconnect();}},{threshold:.3});
skillsObs.observe(document.getElementById("skillsGrid"));
function filterProjects(q){
  const rows=document.querySelectorAll("#appsGrid .app-row");
  let any=false;
  rows.forEach(r=>{
    const match=!q||r.dataset.tags.includes(q.toLowerCase())||r.querySelector(".app-name").textContent.toLowerCase().includes(q.toLowerCase());
    r.style.display=match?"":"none";if(match)any=true;
  });
  document.getElementById("noResults").style.display=any?"none":"block";
}