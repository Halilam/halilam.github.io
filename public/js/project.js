document.addEventListener("DOMContentLoaded", function () {
    const projectsContainer = document.getElementById("projects-container");

    // Fetch the project data
    fetch("/data/projects.json")
        .then(response => response.json())
        .then(projects => {
            displayProjects(projects);

            window.allProjects = projects;
        })
        .catch(error => console.error("Error loading projects:", error));
});

// Function to display projects based on the provided list
function displayProjects(projects) {
    const projectsContainer = document.getElementById("projects-container");
    projectsContainer.innerHTML = "";

    projects.forEach(project => {
        const projectCard = document.createElement("a");
        projectCard.href = project.link;
        projectCard.target = "_blank";
        projectCard.classList.add("project-link");

        projectCard.innerHTML = `
            <div class="project-card" data-category="${project.category}">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" />
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                </div>
            </div>
        `;
        projectsContainer.appendChild(projectCard);
    });
}

function filterProjects(category) {
    if (!window.allProjects) return;

    document.querySelectorAll(".filter-button").forEach(button => {
        button.classList.remove("active");
    });

    const activeButton = document.querySelector(`.filter-button[onclick="filterProjects('${category}')"]`);
    if (activeButton) {
        activeButton.classList.add("active");
    }

    if (category === "all") {
        displayProjects(window.allProjects);
    } else {
        const filteredProjects = window.allProjects.filter(project => project.category === category);
        displayProjects(filteredProjects);
    }
}

