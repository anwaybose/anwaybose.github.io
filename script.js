let publicationsData = [];

fetch("portfolio.json")
.then(r=>r.json())
.then(data=>{

/* basic info */

document.getElementById("name").innerText=data.personal_info.name;

document.getElementById("headline").innerText=data.personal_info.headline;

document.getElementById("summary").innerText=data.summary;

/* links placeholders */

document.getElementById("linkedin").href="ADD_LINKEDIN_URL";
document.getElementById("scholar").href="ADD_GOOGLE_SCHOLAR_URL";

document.getElementById("github").href=data.personal_info.social_links.github;

/* research */

let rlist=document.getElementById("research");

data.research_interests.forEach(r=>{
let li=document.createElement("li");
li.innerText=r;
rlist.appendChild(li);
});

/* experience */

let exp=document.getElementById("experience");

data.experience.forEach(e=>{
let div=document.createElement("div");

div.innerHTML=`
<h3>${e.role}</h3>
<b>${e.organization}</b>
<p>${e.duration}</p>
<p>${e.description||""}</p>
<ul>
${(e.highlights||[]).map(h=>`<li>${h}</li>`).join("")}
</ul>
`;

exp.appendChild(div);
});

/* publications */

publicationsData=data.publications;
renderPublications("all");

/* education */

let edu=document.getElementById("education");

data.education.forEach(ed=>{

let d=document.createElement("div");
}
