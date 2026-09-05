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
const hero = document.querySelector(".hero-left h1");
if (hero) {
  hero.style.animation = "glow 1.5s ease-in-out infinite alternate";
}

const glowStyle = document.createElement("style");
glowStyle.innerHTML = `
@keyframes glow {
  from { text-shadow: 0 0 10px #00c8ff, 0 0 20px #00c8ff; }
  to { text-shadow: 0 0 20px #00f7ff, 0 0 40px #00f7ff; }
}`;
document.head.appendChild(glowStyle);

// =====================
// 3️⃣ Scroll Reveal Animation
// =====================
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach(section => {
    const windowHeight = window.innerHeight;
    const revealTop = section.getBoundingClientRect().top;
    const revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // Initial call

// =====================
// 4️⃣ Project Details Modal
// =====================
// Real content for each project — this is what actually renders when a
// card's "View Case Study" button is clicked.
const projectData = {
  meditation: {
    title: "Learning App",
    icon: "🧘",
    desc: "An assistive mobile UI designed to promote mindfulness and focus for students. Built around a calm visual language, gentle motion, and a distraction-free session flow.",
    components: [
      "Onboarding flow",
      "Guided session player screen",
      "Progress tracker",
      "Reminder notification UI"
    ],
    tags: ["Figma", "UI/UX Design", "Prototyping", "Accessibility"]
  },
  techTitans: {
    title: "Tech Titans – Coding Platform",
    icon: "💻",
    desc: "A gaming-inspired coding platform concept designed for competitive, team-based learning — leaderboard-driven, with visual feedback loops to keep users engaged.",
    components: [
      "Team dashboard",
      "Leaderboard system",
      "Challenge cards",
      "Achievement badges"
    ],
    tags: ["Figma", "Product Design", "Gamification", "Wireframing"]
  },
  projectExpo: {
    title: "Autonomous Path Detector",
    icon: "🤖",
    desc: "A robotics project presented at the Intercollege Project Expo, using sensor fusion to detect and follow a path while avoiding obstacles in real time. Won 1st prize among 50+ competing teams.",
    components: [
      "Arduino Uno — central processing unit",
      "Ultrasonic sensors — real-time obstacle detection",
      "IR sensor array — precise path tracking",
      "L298N motor driver — controls DC motors",
      "Custom-built chassis"
    ],
    tags: ["Robotics", "Arduino", "Embedded C", "Hardware"]
  }
};

function openPopup(projectId) {
  const data = projectData[projectId];
  const modal = document.getElementById("projectModal");
  if (!data || !modal) return;

  document.getElementById("modalIcon").textContent = data.icon;
  document.getElementById("modalTitle").textContent = data.title;
  document.getElementById("modalDesc").textContent = data.desc;

  const compList = document.getElementById("modalComponents");
  compList.innerHTML = data.components.map(item => `<li>${item}</li>`).join("");

  const tagContainer = document.getElementById("modalTags");
  tagContainer.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join("");

  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // lock background scroll while modal is open
}

function closeModal() {
  const modal = document.getElementById("projectModal");
  if (!modal) return;
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = ""; // restore scrolling
}

// Close when clicking the dark overlay (outside modal-content)
document.getElementById("projectModal")?.addEventListener("click", (e) => {
  if (e.target.id === "projectModal") closeModal();
});

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// =====================
// 5️⃣ Lightbox for project thumbnail images
// =====================
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("card-image-clickable")) {
    const overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";

    const img = document.createElement("img");
    img.src = e.target.src;
    img.alt = e.target.alt;
    img.className = "lightbox-img";

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", () => overlay.remove());
    document.addEventListener("keydown", function escClose(ev) {
      if (ev.key === "Escape") {
        overlay.remove();
        document.removeEventListener("keydown", escClose);
      }
    });
  }
});
