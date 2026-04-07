const sheetURL = "https://docs.google.com/spreadsheets/d/1RNg5o1tHEuq9vSTYMXjt5PMJX1CQbf_cB3-ertatAsI/gviz/tq?tqx=out:json";

const container = document.getElementById("events-container");
const type = container.dataset.type;

fetch(sheetURL)
    .then(res => res.text())
    .then(rep => {

        const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
        const rows = jsonData.table.rows;

        const kegiatanData = rows.map(r => ({

            type: r.c[16]?.v || "",
            event: r.c[17]?.v || "",
            short: r.c[18]?.v || "",
            long: r.c[19]?.v || r.c[19]?.f || "",

            photos: (r.c[20]?.v || r.c[20]?.f || "")
                .split("\n")
                .map(p => p.trim())
                .filter(p => p !== "")

        }))
        .filter(k => k.type && k.event && k.short);

        renderKegiatan(kegiatanData);

    });



function renderKegiatan(data) {

    const container = document.getElementById("events-container");

    container.innerHTML = "";

    data
        .filter(item => item.type.toLowerCase() === type.toLowerCase())
        .forEach(item => {

            const card = document.createElement("div");

            card.className = "col-md-4";

            card.innerHTML = `

                <div class="event-card">

                    <img src="${item.photos[0] || ''}">

                    <div class="event-overlay">

                        <h5>${item.event}</h5>

                        <p>${item.short}</p>

                        <button 
                            class="btn btn-sm btn-gold event-detail"
                            data-event="${item.event}"
                            data-photos='${JSON.stringify(item.photos)}'
                            data-long="${item.long.replace(/"/g, '&quot;')}"
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



let galleryImages = [];
let currentIndex = 0;



function setupModal() {

    const modal = document.getElementById("eventModal");

    document.querySelectorAll(".event-detail").forEach(btn => {

        btn.addEventListener("click", () => {

            galleryImages = JSON.parse(btn.dataset.photos);
            currentIndex = 0;

            updateImage();

            document.getElementById("modal-event").innerText = btn.dataset.event;
            document.getElementById("modal-description").innerText = btn.dataset.long;

            modal.classList.add("show");

        });

    });


    document.querySelector(".event-close").addEventListener("click", () => {
        modal.classList.remove("show");
    });


    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });


    const nextBtn = document.querySelector(".gallery-next");
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            updateImage();
        });
    }


    const prevBtn = document.querySelector(".gallery-prev");
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            updateImage();
        });
    }

}



function updateImage() {

    if (!galleryImages.length) return;

    document.getElementById("modal-photo").src =
        galleryImages[currentIndex];

}