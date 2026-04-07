async function loadBrands(){

    const url = "https://docs.google.com/spreadsheets/d/1RNg5o1tHEuq9vSTYMXjt5PMJX1CQbf_cB3-ertatAsI/gviz/tq?tqx=out:json";

    const res = await fetch(url);
    const text = await res.text();

    const json = JSON.parse(text.substring(47).slice(0,-2));
    const rows = json.table.rows;

    const brands = rows.map(r => ({
        category: r.c[9]?.v || "",
        name: r.c[10]?.v || "",
        logo: r.c[11]?.v || ""
    }))
    .filter(n => n.category && n.name && n.logo);;

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