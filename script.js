fetch("portfolio.json")
.then(response => response.json())
.then(data => {

document.getElementById("name").innerText = data.personal_info.name;
document.getElementById("headline").innerText = data.personal_info.headline;
document.getElementById("location").innerText = data.personal_info.location;

document.getElementById("summary").innerText = data.summary;

/* Research Interests */
const researchList = document.getElementById("research");
data.research_interests.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item;
    researchList.appendChild(li);
});

/* Competencies */
const compList = document.getElementById("competencies");
data.core_competencies.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item;
    compList.appendChild(li);
});

/* Experience */
const expDiv = document.getElementById("experience");
data.experience.forEach(job => {

let div = document.createElement("div");

div.innerHTML = `
<h3>${job.role} — ${job.organization}</h3>
<p><i>${job.duration}</i></p>
<p>${job.description || ""}</p>
<ul>
${job.highlights.map(h => `<li>${h}</li>`).join("")}
</ul>
`;

expDiv.appendChild(div);

});

/* Publications */

const pubDiv = document.getElementById("publications");

data.publications.forEach(pub => {

let p = document.createElement("p");

p.innerHTML = `
<b>${pub.title}</b><br>
${pub.authors}<br>
${pub.venue} (${pub.year})
`;

pubDiv.appendChild(p);

});

/* Education */

const eduDiv = document.getElementById("education");

data.education.forEach(e => {

let p = document.createElement("p");

p.innerHTML = `
<b>${e.degree}</b><br>
${e.institution}<br>
${e.duration}
`;

eduDiv.appendChild(p);

});

});
