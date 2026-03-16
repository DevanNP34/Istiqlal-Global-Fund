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
<a href="news-page.html" class="news-card">

<img src="${n.image}">

<div class="news-content">
<div class="news-date">${n.date}</div>
<h3>${n.title}</h3>
<p>${n.desc}</p>
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
`Showing ${start}-${end} Of ${filteredNews.length} Results`;

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

let filteredNews = [...newsData];

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



renderNews();