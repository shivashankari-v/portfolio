// =====================
// 1️⃣ Typing Effect
// =====================
const text = ["Full Stack Developer", "UI/UX Enthusiast", "Problem Solver"];
let index = 0;
let char = 0;

function type() {
  const typingEl = document.querySelector(".typing");
  if (!typingEl) return;
  
  if (char < text[index].length) {
    typingEl.innerHTML += text[index][char];
    char++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  const typingEl = document.querySelector(".typing");
  if (!typingEl) return;

  if (char > 0) {
    typingEl.innerHTML = text[index].substring(0, char - 1);
    char--;
    setTimeout(erase, 50);
  } else {
    index = (index + 1) % text.length;
    setTimeout(type, 300);
  }
}

type();

// =====================
// 2️⃣ Neon Glow Effect on Hero
// =====================
const hero = document.querySelector(".hero h1");
if(hero){
  hero.style.animation = "glow 1.5s ease-in-out infinite alternate";
}

// =====================
// 3️⃣ Fetch Backend Data
// =====================
fetch("http://localhost:5000/api/data")
  .then(res => res.json())
  .then(data => {
    // Update Hero
    const heroName = document.querySelector(".hero h1");
    const heroRole = document.querySelector(".hero h2");
    if(heroName) heroName.textContent = data.name;
    if(heroRole) heroRole.textContent = data.role;

    // Backend message
    const messageSection = document.createElement("section");
    messageSection.className = "glass reveal";
    messageSection.innerHTML = `<p>${data.message}</p>`;
    document.body.appendChild(messageSection);

    // Populate projects
    const projectsSection = document.querySelector(".popup-section");
    if(projectsSection){
      data.projects.forEach(proj => {
        const projDiv = document.createElement("div");
        projDiv.className = "project-item popup-section reveal";

        projDiv.innerHTML = `
          <div class="content-left popup-left">
            <h1>${proj.title}</h1>
            <p class="subtitle">${proj.subtitle}</p>
            <p class="desc">${proj.desc}</p>
          </div>
          <div class="image-right popup-right">
            <img src="${proj.image}" alt="${proj.title}" class="popup-img">
          </div>
        `;
        projectsSection.appendChild(projDiv);
      });
    }
  })
  .catch(err => console.error("FETCH ERROR:", err));

// =====================
// 4️⃣ Scroll Reveal Animation
// =====================
function openModal(id) {
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

window.onclick = function(event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};
// Data object to store details for each project
const projectData = {
  meditation: {
    title: "1Code Mind App",
    icon: "🧘",
    desc: "An assistive application UI designed to promote mindfulness and focus on coding for students.",
    components: [
      "Figma - Primary design tool",
      "Auto Layout - For responsive components",
      "Color Theory - Calm palette selection",
      "Prototyping - Interactive user flows"
    ],
    tags: ["UI/UX", "Web Design", "Figma", "Accessibility"]
  },
  projectExpo: {
    title: "Autonomous Path Detector",
    icon: "🤖",
    desc: "A technical project presented at the Intercollege Project Expo. This autonomous system uses sensor fusion to detect and follow specific paths while avoiding obstacles in real-time.",
    components: [
      "Arduino Uno - Central processing unit",
      "Ultrasonic Sensors - For real-time obstacle detection",
      "IR Sensor Array - For precise path tracking",
      "L298N Motor Driver - Controls high-torque DC motors",
      "Chassis - Custom-built aerodynamic frame"
    ],
    tags: ["Robotics", "Arduino", "Embedded C", "Hardware"]
  },
  techTitans: {
    title: "Tech Titans Platform",
    icon: "💻",
    desc: "A gaming-inspired coding platform designed for competitive learning and teamwork.",
    components: [
      "Dark Mode UI - Reduced eye strain",
      "Dashboard - Performance tracking metrics",
      "Leaderboard - Social competition features"
    ],
    tags: ["Product Design", "Figma", "Gamification"]
  }
};

function openPopup(projectId) {
  const data = projectData[projectId];
  const modal = document.getElementById('projectModal');

  // Fill the modal with data
  document.getElementById('modalTitle').innerText = data.title;
  document.getElementById('modalIcon').innerText = data.icon;
  document.getElementById('modalDesc').innerText = data.desc;

  // Fill components list
  const compList = document.getElementById('modalComponents');
  compList.innerHTML = data.components.map(item => `<li>${item}</li>`).join('');

  // Fill tags
  const tagContainer = document.getElementById('modalTags');
  tagContainer.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join('');

  // Show modal
  modal.style.display = 'flex';
}

function closeModal() {
  document.getElementById('projectModal').style.display = 'none';
}

// Close if user clicks outside the box
window.onclick = function(event) {
  const modal = document.getElementById('projectModal');
  if (event.target == modal) {
    closeModal();
  }
}
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  
  reveals.forEach(section => {
    const windowHeight = window.innerHeight;
    const revealTop = section.getBoundingClientRect().top;
    const revealPoint = 150;

    if(revealTop < windowHeight - revealPoint) {
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  });

  // Project popups
  const popups = document.querySelectorAll(".popup-section");
  popups.forEach(popup => {
    const top = popup.getBoundingClientRect().top;
    if(top < window.innerHeight - 100){
      popup.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // Initial call

// =====================
// 5️⃣ Lightbox / Modal for Project Images
// =====================
document.addEventListener("click", function(e){
  if(e.target.classList.contains("popup-img")){
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.8)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "9999";

    const img = document.createElement("img");
    img.src = e.target.src;
    img.style.maxWidth = "80%";
    img.style.maxHeight = "80%";
    img.style.borderRadius = "16px";
    img.style.boxShadow = "0 0 40px #00f7ff";

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", () => {
      overlay.remove();
    });
  }
});

// =====================
// 6️⃣ Glow Keyframes (inject dynamically if not in CSS)
// =====================
const style = document.createElement('style');
style.innerHTML = `
@keyframes glow {
  from { text-shadow: 0 0 10px #00c8ff, 0 0 20px #00c8ff; }
  to { text-shadow: 0 0 20px #00f7ff, 0 0 40px #00f7ff; }
}`;
document.head.appendChild(style);
