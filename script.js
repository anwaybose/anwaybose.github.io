let publicationsData = [];

fetch("portfolio.json")
.then(r=>r.json())
.then(data=>{

/* basic info */

document.getElementById("name").innerText=data.personal_info.name;

if(data.personal_info.photo) {
  let img = document.getElementById("profile-photo");
  img.src = data.personal_info.photo;
  img.style.display = "block";
}

document.getElementById("headline").innerText=data.personal_info.headline;

document.getElementById("summary").innerText=data.summary;

/* links placeholders */

document.getElementById("linkedin").href=data.personal_info.social_links.linkedin;
document.getElementById("scholar").href="https://scholar.google.com/citations?user=S09uifcAAAAJ&hl=en";
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
d.innerHTML=`
<h3>${ed.degree}</h3>
<b>${ed.institution}</b>, ${ed.location||""}
<p>${ed.duration}</p>
${ed.focus ? `<p><i>Focus:</i> ${ed.focus}</p>` : ""}
`;
edu.appendChild(d);
});

}).catch(err => console.error("Error loading portfolio data:", err));

function renderPublications(filter) {
  let pubContainer = document.getElementById("publications");
  pubContainer.innerHTML = "";
  
  publicationsData.forEach(pub => {
    let isMatch = false;
    let venueLower = pub.venue.toLowerCase();
    let isConf = venueLower.includes('conference') || venueLower.includes('symposium') || venueLower.includes('workshop') || venueLower.includes('proceeding');
    
    if (filter === 'all') isMatch = true;
    else if (filter === 'journal' && !isConf) isMatch = true;
    else if (filter === 'conference' && isConf) isMatch = true;
    
    if (isMatch) {
      let div = document.createElement("div");
      div.className = "publication";
      div.innerHTML = `
        <p><b>${pub.title}</b></p>
        <p>${pub.authors}</p>
        <p><i>${pub.venue}</i>, ${pub.year}</p>
        ${pub.award ? `<p><b>${pub.award}</b></p>` : ""}
      `;
      pubContainer.appendChild(div);
    }
  });
}

window.filterPubs = function(filter) {
  renderPublications(filter);
};
