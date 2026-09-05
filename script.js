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
