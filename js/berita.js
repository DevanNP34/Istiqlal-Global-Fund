/* let newsData = [];
let filteredNews = [];

const perPage = 5;
let currentPage = 1;

function renderNews(){

const start = (currentPage-1)*perPage;
const end = start + perPage;

const visible = filteredNews.slice(start,end);

const list = document.getElementById("news-list");
list.innerHTML="";

visible.forEach(n=>{
list.innerHTML += `
<a href="${n.link}" class="news-card">

<img src="${n.image}">

<div class="news-content">
<div class="news-date">${n.date}</div>
<h3>${n.title}</h3>
<p>${n.desc.substring(0,200)}...</p>
</div>

</a>
`;
});

renderResults();
renderPagination();
}

function renderResults(){

const start = (currentPage-1)*perPage+1;
const end = Math.min(currentPage*perPage,filteredNews.length);

document.getElementById("resultsInfo").innerText =
`Menunjukkan ${start}-${end} dari ${filteredNews.length} hasil`;

}

function renderPagination(){

const totalPages = Math.ceil(filteredNews.length / perPage);
const container = document.getElementById("pagination");
container.innerHTML="";

container.appendChild(pageBtn("«",currentPage-1,currentPage===1));

let start = Math.max(1,currentPage-2);
let end = start+4;

if(end>totalPages){
end=totalPages;
start=Math.max(1,end-4);
}

if(start>1){

container.appendChild(pageBtn(1,1));

if(start>2){
container.appendChild(ellipsis());
}

}

for(let i=start;i<=end;i++){
container.appendChild(pageBtn(i,i,false,i===currentPage));
}

if(end<totalPages){

if(end<totalPages-1){
container.appendChild(ellipsis());
}

container.appendChild(pageBtn(totalPages,totalPages));
}

container.appendChild(pageBtn("»",currentPage+1,currentPage===totalPages));

}

function pageBtn(label,page,disabled=false,active=false){

const btn=document.createElement("button");
btn.innerText=label;

btn.className="page-btn";

if(active) btn.classList.add("active");
if(disabled) btn.disabled=true;

btn.onclick=()=>{
currentPage=page;
renderNews();
}

return btn;

}

function ellipsis(){

const span=document.createElement("span");
span.className="ellipsis";
span.innerText="...";
return span;

}

function runSearch(){

const input = document.getElementById("searchBar");
const header = document.getElementById("newsHeader");

const term = input.value.trim().toLowerCase();

if(term === ""){

header.innerText = "Berita";
filteredNews = [...newsData];

}else{

header.innerText = `Hasil pencarian "${input.value}"`;

filteredNews = newsData.filter(n =>
n.title.toLowerCase().includes(term) ||
n.desc.toLowerCase().includes(term)
);

}

currentPage = 1;
renderNews();

}

document.getElementById("searchBar").addEventListener("keydown", function(e){

if(e.key === "Enter"){
runSearch();
}

});

document.getElementById("searchBtn").addEventListener("click", runSearch);

async function loadNews(){

const url = "https://docs.google.com/spreadsheets/d/1RNg5o1tHEuq9vSTYMXjt5PMJX1CQbf_cB3-ertatAsI/gviz/tq?tqx=out:json";

const res = await fetch(url);
const text = await res.text();

const json = JSON.parse(text.substring(47).slice(0,-2));

const rows = json.table.rows;

newsData = rows.map(r => ({
title: r.c[0]?.v || "",
desc: r.c[1]?.v || "",
image: r.c[2]?.v || "",
date: r.c[3]?.f || "",
link: r.c[4]?.v || ""
}))
.filter(n => n.title && n.image && n.link);;

newsData.sort((a,b) => new Date(b.date) - new Date(a.date));

filteredNews = [...newsData];

console.log(newsData);
renderNews();

}

loadNews();

*/


let newsData = [];
let filteredNews = [];

const perPage = 5;
let currentPage = 1;

function renderNews(){

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    const visible = filteredNews.slice(start, end);

    const list = document.getElementById("news-list");
    list.innerHTML = "";

    visible.forEach(n => {

        list.innerHTML += `
            <a href="${n.link}" class="news-card">

                <img src="${n.image}">

                <div class="news-content">
                    <div class="news-date">${n.date}</div>
                    <h3>${n.title}</h3>
                    <p>${n.desc.substring(0,200)}...</p>
                </div>

            </a>
        `;

    });

    renderResults();
    renderPagination();
}



function renderResults(){

    const start = (currentPage - 1) * perPage + 1;
    const end = Math.min(currentPage * perPage, filteredNews.length);

    document.getElementById("resultsInfo").innerText =
        `Menunjukkan ${start}-${end} dari ${filteredNews.length} hasil`;

}



function renderPagination(){

    const totalPages = Math.ceil(filteredNews.length / perPage);
    const container = document.getElementById("pagination");

    container.innerHTML = "";

    container.appendChild(
        pageBtn("«", currentPage - 1, currentPage === 1)
    );

    let start = Math.max(1, currentPage - 2);
    let end = start + 4;

    if (end > totalPages) {
        end = totalPages;
        start = Math.max(1, end - 4);
    }

    if (start > 1){

        container.appendChild(pageBtn(1, 1));

        if (start > 2){
            container.appendChild(ellipsis());
        }

    }

    for (let i = start; i <= end; i++){
        container.appendChild(
            pageBtn(i, i, false, i === currentPage)
        );
    }

    if (end < totalPages){

        if (end < totalPages - 1){
            container.appendChild(ellipsis());
        }

        container.appendChild(
            pageBtn(totalPages, totalPages)
        );

    }

    container.appendChild(
        pageBtn("»", currentPage + 1, currentPage === totalPages)
    );

}



function pageBtn(label, page, disabled = false, active = false){

    const btn = document.createElement("button");
    btn.innerText = label;

    btn.className = "page-btn";

    if (active) btn.classList.add("active");
    if (disabled) btn.disabled = true;

    btn.onclick = () => {
        currentPage = page;
        renderNews();
    };

    return btn;

}



function ellipsis(){

    const span = document.createElement("span");
    span.className = "ellipsis";
    span.innerText = "...";

    return span;

}



function runSearch(){

    const input = document.getElementById("searchBar");
    const header = document.getElementById("newsHeader");

    const term = input.value.trim().toLowerCase();

    if (term === ""){

        header.innerText = "Berita";
        filteredNews = [...newsData];

    } else {

        header.innerText = `Hasil pencarian "${input.value}"`;

        filteredNews = newsData.filter(n =>
            n.title.toLowerCase().includes(term) ||
            n.desc.toLowerCase().includes(term)
        );

    }

    currentPage = 1;
    renderNews();

}



document
.getElementById("searchBar")
.addEventListener("keydown", function(e){

    if (e.key === "Enter"){
        runSearch();
    }

});


document
.getElementById("searchBtn")
.addEventListener("click", runSearch);

function formatDate(dateStr){

    const date = new Date(dateStr);

    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

}

async function loadNews(){

    const loader = document.getElementById("loader");

    const url =
    "https://script.google.com/macros/s/AKfycbyxxvCkbOvl31tb7nT4_hJWyFRfG7NynmZiPtQIjxkwiFKYgSl_GwG2RXkILY3Nlt3v/exec";

    const res = await fetch(url);
    const rows = await res.json();

    newsData = rows.slice(1).map(r => ({

        title: r[0] || "",
        desc: r[1] || "",
        image: r[2] || "",
        date: formatDate(r[3]) || "",
        link: r[4] || ""

    }))
    .filter(n => n.title && n.image && n.link);

    loader.style.display = "none";

    newsData.sort((a, b) =>
        new Date(b.date) - new Date(a.date)
    );

    filteredNews = [...newsData];

    console.log(newsData);

    renderNews();

}



loadNews();