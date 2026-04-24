const sheetURL = "https://script.google.com/macros/s/AKfycbyxxvCkbOvl31tb7nT4_hJWyFRfG7NynmZiPtQIjxkwiFKYgSl_GwG2RXkILY3Nlt3v/exec";

const container = document.getElementById("events-container");
const type = container.dataset.type;

const loader = document.getElementById("events-loader");

fetch(sheetURL)
    .then(res => res.json())
    .then(rows => {

        const kegiatanData = rows.slice(1).map(r => ({

            type: r[16] || "",
            event: r[17] || "",
            desc: r[18] || "",

            photos: (r[19] || "")
                .split("\n")
                .map(p => p.trim())
                .filter(p => p !== "")

        }))

        loader.style.display = "none";
        renderKegiatan(kegiatanData);

    })
    .catch(err => {

        loader.innerHTML = `
            <p class="text-danger">
                Gagal memuat kegiatan
            </p>
        `;

        console.error(err);

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

                    <img src="${(item.photos[0] || '').replace('img:', '').replace('vid:', '')}">

                    <div class="event-overlay">

                        <h5>${item.event}</h5>

                        <button 
                            class="btn btn-sm btn-gold event-detail"
                            data-event="${item.event}"
                            data-photos='${JSON.stringify(item.photos)}'
                            data-desc="${item.desc.replace(/"/g, '&quot;')}"
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
            document.getElementById("modal-description").innerText = btn.dataset.desc;

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

function setupZoom() {

    const zoom = document.getElementById("imageZoom");
    const zoomImg = document.getElementById("zoomedImage");
    const modalPhoto = document.getElementById("modal-photo");

    if (!modalPhoto || modalPhoto.tagName === "IFRAME") return;

    modalPhoto.style.cursor = "zoom-in";

    modalPhoto.onclick = () => {

        zoomImg.src = modalPhoto.src;
        zoom.classList.add("show");

    };

    zoom.onclick = () => {
        zoom.classList.remove("show");
    };

}

function updateImage() {

    if (!galleryImages.length) return;

    const prev = document.querySelector(".gallery-prev");
    const next = document.querySelector(".gallery-next");

    if (galleryImages.length <= 1) {
        prev.style.display = "none";
        next.style.display = "none";
    } else {
        prev.style.display = "block";
        next.style.display = "block";
    }

    const file = galleryImages[currentIndex];
    const container = document.querySelector(".modal-gallery");
    const isVideo = file.startsWith("vid:");
    const cleanFile = file.replace("vid:", "").replace("img:", "");

    if (isVideo) {

    document.getElementById("modal-photo").outerHTML = `
    <iframe 
    id="modal-photo"
    src="${cleanFile}"
    allow="autoplay"
    allowfullscreen>
    </iframe>
    `;

    } else {

    document.getElementById("modal-photo").outerHTML =
    `<img id="modal-photo" src="${cleanFile}">`;

    }

    document.getElementById("gallery-current").innerText =
        currentIndex + 1;

    document.getElementById("gallery-total").innerText =
        galleryImages.length;

    setupZoom();
}