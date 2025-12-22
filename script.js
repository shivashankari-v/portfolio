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