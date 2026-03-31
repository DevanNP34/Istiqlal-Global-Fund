const sheetURL = "https://docs.google.com/spreadsheets/d/1RNg5o1tHEuq9vSTYMXjt5PMJX1CQbf_cB3-ertatAsI/gviz/tq?tqx=out:json";

const type = "IGF";

fetch(sheetURL)
.then(res => res.text())
.then(rep => {

const jsonData = JSON.parse(rep.substring(47).slice(0, -2));

const rows = jsonData.table.rows;

const kegiatanData = rows.map(r => ({

type: r.c[16]?.v || "",
event: r.c[17]?.v || "",
short: r.c[18]?.v || "",
long: r.c[19]?.v || "",
photo: r.c[20]?.v || ""

}))
.filter(k => k.type && k.event && k.short);

renderKegiatan(kegiatanData);

});

function renderKegiatan(data){

const container = document.getElementById("events-container");

data
.filter(item => item.type.toLowerCase() === type.toLowerCase())
.forEach(item => {

const card = document.createElement("div");

card.className = "col-md-4";

card.innerHTML = `

<div class="event-card">

<img src="${item.photo}">

<div class="event-overlay">

<h5>${item.event}</h5>

<p>${item.short}</p>

<button class="btn btn-sm btn-gold event-detail"
data-event="${item.event}"
data-photo="${item.photo}"
data-long="${item.long}"
>
Detil Kegiatan
</button>

</div>

</div>

`;

container.appendChild(card);

});

setupModal();

}

function setupModal(){

const modal = document.getElementById("eventModal");

document.querySelectorAll(".event-detail").forEach(btn => {

btn.addEventListener("click", () => {

document.getElementById("modal-event").innerText = btn.dataset.event;
document.getElementById("modal-photo").src = btn.dataset.photo;
document.getElementById("modal-description").innerText = btn.dataset.long;

modal.classList.add("show");

});

});

document.querySelector(".event-close").addEventListener("click", () => {
modal.classList.remove("show");
});

modal.addEventListener("click", (e)=>{
if(e.target === modal){
modal.classList.remove("show");
}
});

}