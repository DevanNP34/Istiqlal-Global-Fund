async function loadBrands(){

    const loader = document.getElementById("brands-loader");

    const url = "https://script.google.com/macros/s/AKfycbyxxvCkbOvl31tb7nT4_hJWyFRfG7NynmZiPtQIjxkwiFKYgSl_GwG2RXkILY3Nlt3v/exec";

    const res = await fetch(url);
    const rows = await res.json();

    const brands = rows.slice(1).map(r => ({
        category: r[9] || "",
        name: r[10] || "",
        logo: r[11] || ""
    }))
    .filter(n => n.category && n.name);

    loader.style.display = "none";

    renderBrands(brands);

}

function renderBrands(brands){

    const categories = {
        "BUMN": "bumn-list",
        "Perbankan": "perbankan-list",
        "Kementrian": "kementrian-list",
        "Lembaga": "lembaga-list",
        "Perusahaan Mandiri": "mandiri-list"
    };

    Object.keys(categories).forEach(cat => {

        const container = document.getElementById(categories[cat]);
        container.innerHTML = "";

        brands
        .filter(b => b.category === cat)
        .forEach(b => {

            container.innerHTML += `
            <div class="col-6 col-md-4 col-lg-3 col-xl-2">
                <div class="logo-card">
                    <img src="${b.logo}">
                    <div class="logo-overlay">${b.name}</div>
                </div>
            </div>
    `       ;

        });

    });

}

loadBrands();