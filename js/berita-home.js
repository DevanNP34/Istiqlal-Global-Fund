/* async function loadLatestNews(){

    const url = "https://docs.google.com/spreadsheets/d/1RNg5o1tHEuq9vSTYMXjt5PMJX1CQbf_cB3-ertatAsI/gviz/tq?tqx=out:json";

    const res = await fetch(url);
    const text = await res.text();

    const json = JSON.parse(text.substring(47).slice(0,-2));
    const rows = json.table.rows;

    let news = rows.map(r => ({
        title: r.c[0]?.v || "",
        image: r.c[2]?.v || "",
        date: r.c[3]?.f || "",
        link: r.c[4]?.v || ""
    }))
    .filter(n => n.title && n.image && n.link);;

    news.sort((a,b)=> new Date(b.date) - new Date(a.date));

    news = news.slice(0,3);

    const container = document.getElementById("latest-news");

    news.forEach(n => {

        container.innerHTML += `
        <a href="${n.link}" class="latest-news-item">

        <img src="${n.image}">

        <div class="latest-news-date">${n.date}</div>

        <div class="latest-news-title">${n.title}</div>

        </a>
        `;

    });

}

loadLatestNews();
*/

function formatDate(dateStr){

    const date = new Date(dateStr);

    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

}

async function loadLatestNews(){

    const url = "https://script.google.com/macros/s/AKfycbyxxvCkbOvl31tb7nT4_hJWyFRfG7NynmZiPtQIjxkwiFKYgSl_GwG2RXkILY3Nlt3v/exec";

    const res = await fetch(url);
    const data = await res.json();

    const rows = data.slice(1);

    let news = rows.map(r => ({
        title: r[0] || "",
        image: r[2] || "",
        date: formatDate(r[3]) || "",
        link: r[4] || ""
    }))
    .filter(n => n.title && n.image && n.link);

    news.sort((a,b)=> new Date(b.date) - new Date(a.date));

    news = news.slice(0,3);

    const container = document.getElementById("latest-news");

    container.innerHTML = "";

    news.forEach(n => {

        container.innerHTML += `
        <a href="${n.link}" class="latest-news-item">

            <img src="${n.image}">

            <div class="latest-news-date">${n.date}</div>

            <div class="latest-news-title">${n.title}</div>

        </a>
        `;

    });

}

loadLatestNews();