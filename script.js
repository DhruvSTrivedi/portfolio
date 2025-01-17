console.log("script.js is loaded!");

document.addEventListener("DOMContentLoaded", function () {
    // Typing Effect for Hero Section
    function typeText(elementId, text, speed = 50, delay = 500) {
        const el = document.getElementById(elementId);
        if (!el) return;

        el.innerHTML = "";
        let i = 0;
        setTimeout(() => {
            function type() {
                if (i < text.length) {
                    el.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    el.classList.add("finished-typing");
                }
            }
            type();
        }, delay);
    }

    typeText(
        "animated-text",
        "Hi, I'm Dhruv Trivedi — a Data Enthusiast exploring insights through numbers, algorithms, and visualizations.",
        35,
        1000
    );

    // Fetch and Display Projects from projects.json
    (function loadProjects() {
        console.log("Fetching projects.json...");

        fetch("./projects.json")
            .then((response) => {
                console.log("Response received:", response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((projects) => {
                console.log("Projects fetched successfully:", projects);

                const slidesContainer = document.getElementById("carousel-slides");
                const dropdown = document.getElementById("project-select");
                if (!slidesContainer || !dropdown) {
                    console.error("Error: Required containers not found!");
                    return;
                }

                let maxNameLength = 0; // Track the longest project name length

                projects.forEach((project, index) => {
                    const slide = document.createElement("div");
                    slide.classList.add("carousel-slide");
                    slide.innerHTML = `
                        <h3>${project.name}</h3>
                        <p>${project.description}</p>
                        <a href="${project.projectURL}" target="_blank" class="view-details">View Project</a>
                        <a href="${project.githubURL}" target="_blank" class="github-link">View GitHub</a>
                    `;
                    slidesContainer.appendChild(slide);

                    // Add to dropdown
                    const dropdownOption = document.createElement("option");
                    dropdownOption.value = index;
                    dropdownOption.textContent = project.name;
                    dropdown.appendChild(dropdownOption);

                    // Update maxNameLength based on the length of each project name
                    if (project.name.length > maxNameLength) {
                        maxNameLength = project.name.length;
                    }
                });

                // Dynamically adjust the dropdown font size based on maxNameLength
                const baseFontSize = 18; // Default font size in px
                const maxFontSize = 24; // Maximum font size
                const fontSize = Math.min(baseFontSize + maxNameLength / 4, maxFontSize); // Dynamically calculate size
                dropdown.style.fontSize = `${fontSize}px`; // Apply calculated font size

                console.log(`Total slides added: ${slidesContainer.childElementCount}`);
                updateSlideIndicator();

                // Update carousel on dropdown change
                dropdown.addEventListener("change", (e) => {
                    currentIndex = parseInt(e.target.value, 10);
                    updateCarousel();
                });
            })
            .catch((error) => console.error("❌ Failed to load projects.json:", error));
    })();

    // Carousel Navigation
    let currentIndex = 0;

    function updateCarousel() {
        const slides = document.querySelectorAll(".carousel-slide");
        const totalSlides = slides.length;

        if (!slides.length) {
            console.error("No slides found for carousel.");
            return;
        }

        const container = document.querySelector(".carousel-inner");
        if (!container) {
            console.error(".carousel-inner not found!");
            return;
        }

        container.style.transform = `translateX(-${currentIndex * 100}%)`;
        console.log(`Updated carousel to index ${currentIndex}. Total slides: ${totalSlides}`);
        updateSlideIndicator();
    }

    document.getElementById("prev-btn").addEventListener("click", () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateCarousel();
    });

    document.getElementById("next-btn").addEventListener("click", () => {
        const slides = document.querySelectorAll(".carousel-slide");
        currentIndex = Math.min(slides.length - 1, currentIndex + 1);
        updateCarousel();
    });

    // Slide Indicator
    function updateSlideIndicator() {
        const slideIndicator = document.getElementById("slide-indicator");
        const totalSlides = document.querySelectorAll(".carousel-slide").length;
        if (slideIndicator) {
            slideIndicator.textContent = `${currentIndex + 1}/${totalSlides}`;
        }
    }

    // Scroll Effect for Fade-in Elements
    function handleScrollEffects() {
        const fadeInElements = document.querySelectorAll(".fade-in");

        function checkScroll() {
            fadeInElements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight - 50) {
                    el.classList.add("show");
                }
            });
        }

        window.addEventListener("scroll", checkScroll);
        checkScroll();
    }

    handleScrollEffects();
});

function handleScrollEffects() {
  const fadeInElements = document.querySelectorAll(".fade-in, .certification-item");

  function checkScroll() {
    fadeInElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll();
}

handleScrollEffects();



document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navLinks = document.querySelector(".main-header__navigation-links");

  // Toggle the 'show' class on the navigation links
  hamburgerMenu.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    // Ensure the dropdown is visible when toggled
    if (navLinks.classList.contains("show")) {
      navLinks.style.display = "flex";
    } else {
      navLinks.style.display = "none";
    }
  });

  // Handle resizing between mobile and desktop
  const handleResize = () => {
    if (window.innerWidth > 768) {
      // Desktop: Show navigation links, hide hamburger menu
      hamburgerMenu.style.display = "none";
      navLinks.style.display = "flex";
      navLinks.classList.remove("show"); // Remove mobile-specific classes
    } else {
      // Mobile: Show hamburger menu, hide navigation links by default
      hamburgerMenu.style.display = "inline-block";
      if (!navLinks.classList.contains("show")) {
        navLinks.style.display = "none";
      }
    }
  };

  // Initialize resize handling and attach event listener
  handleResize();
  window.addEventListener("resize", handleResize);

  // Handle clicking outside the navigation menu to close it
  document.addEventListener("click", (event) => {
    if (
      !hamburgerMenu.contains(event.target) &&
      !navLinks.contains(event.target) &&
      navLinks.classList.contains("show")
    ) {
      navLinks.classList.remove("show");
      navLinks.style.display = "none";
    }
  });
});



particlesJS('particles-js', {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ["#0073e6", "#005bb5", "#00d1e6", "#f2a900"]
    },
    shape: {
      type: ["circle", "triangle", "polygon"],
      polygon: {
        nb_sides: 6
      }
    },
    opacity: {
      value: 0.8,
      random: true,
      anim: {
        enable: true,
        speed: 0.5,
        opacity_min: 0.3,
        sync: false
      }
    },
    size: {
      value: 5,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 2,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ccc",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
});


// Select the theme toggle button and icon
const themeToggleButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Function to apply the theme
function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    document.body.classList.remove('dark-theme');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
}

// Event listener for theme toggle
themeToggleButton.addEventListener('click', () => {
  // Check current theme
  const isDark = document.body.classList.contains('dark-theme');
  
  // Toggle theme
  const newTheme = isDark ? 'light' : 'dark';
  applyTheme(newTheme);

  // Save theme preference to localStorage
  localStorage.setItem('theme', newTheme);
});

// On page load, check and apply saved theme
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light theme
  applyTheme(savedTheme);
});
