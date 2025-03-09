document.addEventListener("DOMContentLoaded", function () {
    const map = L.map("map", {minZoom: 2}).setView([48.9081051, -15.4817954], 2);

    // Load map tiles (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    // Fetch adventure data
    fetch("/api/adventures")
        .then(response => response.json())
        .then(data => {
            data.forEach(adventure => {
                const marker = L.marker(adventure.coords).addTo(map);

                const popupContent = `
                    <h3>${adventure.name}</h3>`;
                marker.bindPopup(popupContent);

                marker.on("popupopen", function () {
                    displayAdventureMedia(adventure);
                });
            });
        })
        .catch(error => console.error("Error loading adventures:", error));
});

// Function to display images and videos below the map
function displayAdventureMedia(adventure) {
    const mediaContainer = document.getElementById("adventure-media");
    mediaContainer.innerHTML = `<h3>${adventure.name}</h3>`;

    adventure.image.forEach((src) => {
        if (src.endsWith(".mp4")) {
            const video = document.createElement("video");
            video.src = src;
            video.controls = true;
            video.width = 300;
            video.classList.add("adventure-media");
            mediaContainer.appendChild(video);
        } else {
            const img = document.createElement("img");
            img.src = src;
            img.alt = "Adventure Image";
            img.style.width = "300px";
            img.style.margin = "10px";
            img.classList.add("adventure-media");
            mediaContainer.appendChild(img);
        }
    });
}
