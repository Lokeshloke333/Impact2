document.addEventListener("DOMContentLoaded", function() {
    // Function to load a component
    function loadComponent(id, file) {
        return fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.text();
            })
            .then(data => {
                const element = document.getElementById(id);
                if (element) {
                    element.innerHTML = data;
                    if (id === 'navbar-placeholder') {
                        // Use requestAnimationFrame to ensure DOM is updated before init
                        requestAnimationFrame(() => initNavbar(element));
                    }
                }
            })
            .catch(error => console.error(`Error loading component ${file}:`, error));
    }

    // Initialize Navbar Interactivity
    function initNavbar(container) {
        // Search within the container first for robustness
        const menuBtn = container.querySelector("#menu-btn") || document.getElementById("menu-btn");
        const mobileMenu = container.querySelector("#mobile-menu") || document.getElementById("mobile-menu");
        const hamburgerIcon = container.querySelector("#hamburger-icon") || document.getElementById("hamburger-icon");
        const closeIcon = container.querySelector("#close-icon") || document.getElementById("close-icon");

        const servicesToggle = container.querySelector("#services-toggle") || document.getElementById("services-toggle");
        const servicesDropdown = container.querySelector("#services-dropdown") || document.getElementById("services-dropdown");
        const servicesArrow = servicesToggle ? servicesToggle.querySelector("svg") : null;

        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                mobileMenu.classList.toggle("hidden");
                if (hamburgerIcon) hamburgerIcon.classList.toggle("hidden");
                if (closeIcon) closeIcon.classList.toggle("hidden");
            });
        }

        if (servicesToggle && servicesDropdown) {
            servicesToggle.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                servicesDropdown.classList.toggle("hidden");
                if (servicesArrow) servicesArrow.classList.toggle("rotate-180");
            });
        }

        if (mobileMenu) {
            mobileMenu.querySelectorAll("a:not(#services-toggle)").forEach((link) => {
                link.addEventListener("click", () => {
                    mobileMenu.classList.add("hidden");
                    if (hamburgerIcon) hamburgerIcon.classList.remove("hidden");
                    if (closeIcon) closeIcon.classList.add("hidden");
                });
            });
        }
    }

    // Load Navbar and Footer
    loadComponent('navbar-placeholder', 'components/navbar.html');
    loadComponent('footer-placeholder', 'components/footer.html');
});
