// 🌈 Cursor Rainbow Trail
let hue = 0;
document.addEventListener("mousemove", (e) => {
  const trail = document.createElement("div");
  trail.className = "trail";
  trail.style.left = e.clientX + "px";
  trail.style.top = e.clientY + "px";
  trail.style.backgroundColor = `hsl(${hue}, 100%, 60%)`;

  document.body.appendChild(trail);

  // animate color change
  hue = (hue + 20) % 360;

  // remove after animation
  setTimeout(() => {
    trail.remove();
  }, 600);
});

// 🎬 Scroll-based scene reveal
const sections = document.querySelectorAll(".welcome-container, .scene1, .scene3, .scene4");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
}, { threshold: 0.2 }); // 20% in view to trigger

sections.forEach(section => sectionObserver.observe(section));


// 🎵 Scene 1 Sounds
const glitchSound2 = new Audio("assets/scene1/tunetank.com_sparkling-led-lamp.wav");
const clickSound = new Audio("assets/scene1/tunetank.com_light-switch-button-on.wav");
const glitchSound = new Audio("assets/scene1/tunetank.com_radio-static-old-radio-crackle-and-hum.wav");
glitchSound.loop = true; // keep looping while glitching

document.addEventListener("mousemove", (e) => {
  const eye = document.querySelector(".eye-move");
  const container = document.querySelector(".welcome-container");

  // stop if welcome scene is hidden
  if (!container.classList.contains("visible")) return;

  const rect = container.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 350; // scale movement
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * 150;

  eye.style.transform = `translate(${x}px, ${y}px)`;
});

const button = document.querySelector(".light-button");
const sceneSubtext = document.querySelector(".scene-subtext");
const glitchOverlay = document.querySelector(".glitch-overlay");
let clickCount = 0;
let holdTimer;
let prevButtonSrc = "assets/scene1/on button.png"; // default state

button.addEventListener("click", () => {
  // skip normal toggle if glitching
  if (document.body.classList.contains("glitching")) return;
 clickSound.currentTime = 0; // restart sound
  clickSound.play();
  clickCount++;

  
  if (clickCount % 2 === 1) {
    // Odd click -> turn OFF
    document.body.style.backgroundColor = "black";
     document.body.classList.add("lights-off"); // 👈 add this
    button.src = "assets/scene1/off button.png";
    prevButtonSrc = "assets/scene1/off button.png";
  } else {
    // Even click -> turn ON
    document.body.style.backgroundColor = "white";
     document.body.classList.remove("lights-off"); // 👈 remove it
    button.src = "assets/scene1/on button.png";
    prevButtonSrc = "assets/scene1/on button.png";

    if (clickCount === 2) {
      sceneSubtext.classList.add("visible");
    }
  }
});

// Hold for 3s -> glitch mode
button.addEventListener("mousedown", () => {
  holdTimer = setTimeout(() => {
    // Activate glitch effect
    document.body.classList.add("glitching");
    glitchOverlay.classList.add("active");
    button.src = "assets/scene1/on off button.png";
     glitchSound.currentTime = 0;
    glitchSound.play();
    glitchSound2.currentTime = 0;
    glitchSound2.play();
  }, 3000);
});

button.addEventListener("mouseup", () => {
  clearTimeout(holdTimer);
  // Stop glitch if active
  if (document.body.classList.contains("glitching")) {
    document.body.classList.remove("glitching");
    glitchOverlay.classList.remove("active");
    button.src = prevButtonSrc; // restore last state
     glitchSound.pause();
    glitchSound.currentTime = 0; // reset sound
    glitchSound2.pause();
    glitchSound2.currentTime = 0; // reset sound
  }
});

button.addEventListener("mouseleave", () => {
  clearTimeout(holdTimer);
  if (document.body.classList.contains("glitching")) {
    document.body.classList.remove("glitching");
    glitchOverlay.classList.remove("active");
    button.src = prevButtonSrc;
     glitchSound.pause();
    glitchSound.currentTime = 0; // reset sound
    glitchSound2.pause();
    glitchSound2.currentTime = 0; // reset sound
  }
});


  const shapes = document.querySelectorAll('.shape');
  const container = document.querySelector('.shapes-container');
const sparkleSound = new Audio("assets/scene3/tunetank.com_windchime-sparkle.wav");

  let shownColors = {
    orange: false,
    purple: false,
    green: false
  };

  function isOverlapping(el1, el2) {
    const r1 = el1.getBoundingClientRect();
    const r2 = el2.getBoundingClientRect();
    return !(r2.left > r1.right || 
             r2.right < r1.left || 
             r2.top > r1.bottom ||
             r2.bottom < r1.top);
  }

  function showColorText(word, color) {
  const textEl = document.createElement('div');
  textEl.className = "color-fx";
  textEl.textContent = word;
  textEl.style.color = color;
  document.body.appendChild(textEl);

  // Trigger animation
  setTimeout(() => textEl.classList.add('show'), 50);

  // Fade out & remove
  setTimeout(() => {
    textEl.style.opacity = 0;
    setTimeout(() => textEl.remove(), 2000);
  }, 900);
}


  function checkCollisions() {
    const red = document.querySelector('.circle');
    const blue = document.querySelector('.square');
    const yellow = document.querySelector('.triangle');

    if (isOverlapping(red, yellow) && !shownColors.orange) {
      showColorText("orange", "orange");
      shownColors.orange = true;
      sparkleSound.currentTime = 0; // restart sound
  sparkleSound.play();
    }
    if (isOverlapping(red, blue) && !shownColors.purple) {
      showColorText("purple", "purple");
      shownColors.purple = true;
      sparkleSound.currentTime = 0; // restart sound
  sparkleSound.play();
    }
    if (isOverlapping(blue, yellow) && !shownColors.green) {
      showColorText("green", "green");
      shownColors.green = true;
      sparkleSound.currentTime = 0; // restart sound
  sparkleSound.play();
    }
  }

  shapes.forEach(shape => {
    shape.addEventListener('mousedown', (e) => {
      const rect = container.getBoundingClientRect();
      const target = e.target;

      let offsetX = e.clientX - target.offsetLeft - rect.left;
      let offsetY = e.clientY - target.offsetTop - rect.top;

      function onMouseMove(ev) {
        let x = ev.clientX - rect.left - offsetX;
        let y = ev.clientY - rect.top - offsetY;

        x = Math.max(0, Math.min(x, rect.width - target.offsetWidth));
        y = Math.max(0, Math.min(y, rect.height - target.offsetHeight));

        target.style.left = x + 'px';
        target.style.top = y + 'px';

        checkCollisions();
      }

      function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  });


// 🎈 Scene 4 Bubbles
const bubblesContainer = document.querySelector(".bubbles-container");
let bubbleInterval;

function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  // random size
  const size = Math.floor(Math.random() * 60) + 40; // 40–100px
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  // random horizontal position
  const x = Math.random() * (bubblesContainer.offsetWidth - size);
  bubble.style.left = `${x}px`;

  // click sound + remove
  bubble.addEventListener("click", () => {
    const popSound = new Audio("assets/scene4/tunetank.com_pop-bouncy-plop.wav");
    popSound.play();
    bubble.remove();
  });

  // remove when animation ends
  bubble.addEventListener("animationend", () => bubble.remove());

  bubblesContainer.appendChild(bubble);
}

// Use IntersectionObserver instead of scroll check
const scene4 = document.querySelector(".scene4");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // start bubbles
      if (!bubbleInterval) {
        createBubble();
        bubbleInterval = setInterval(createBubble, 1200);
      }
    } else {
      // stop bubbles
      clearInterval(bubbleInterval);
      bubbleInterval = null;
    }
  });
}, { threshold: 0.2 }); // trigger when 20% of scene4 is visible

observer.observe(scene4);
