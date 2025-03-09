document.addEventListener("DOMContentLoaded", function () {
    const artItems = document.querySelectorAll(".art-item");
    const descriptionBox = document.getElementById("art-description");

    artItems.forEach(item => {
        item.addEventListener("mouseenter", function () {
            const description = this.getAttribute("data-description");
            descriptionBox.textContent = description;
        });
    });

    document.querySelector(".art-container").addEventListener("mouseleave", function () {
        descriptionBox.textContent = "Hover over an artwork to see details.";
    });
});
