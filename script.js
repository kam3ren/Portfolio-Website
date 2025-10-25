// ===============================
// AUTO-SKILL DETECTION FROM PROJECTS
// ===============================
const projects = document.querySelectorAll("#projects .card p");

// Define categories and their colors
const skillCategories = {
  "Web Development": {
    color: "#58a6ff",
    skills: ["HTML", "CSS", "JavaScript", "React", "Angular", "Vue", "Node.js", "Express", "PHP"]
  },
  "Mobile Development": {
    color: "#2ecc71",
    skills: ["Java", "Kotlin", "Swift", "Flutter"]
  },
  "Data & Backend": {
    color: "#9b59b6",
    skills: ["Python", "Django", "Flask", "SQL"]
  },
  "General Languages": {
    color: "#e67e22",
    skills: ["C++", "C#", "Ruby", "Go", "Rust"]
  }
};

// Flatten skills for lookup
let allSkills = [];
for (let cat in skillCategories) {
  allSkills = allSkills.concat(skillCategories[cat].skills);
}

const skillCounts = {};
let totalProjects = projects.length;

// Count how many projects mention each keyword
projects.forEach(proj => {
  let text = proj.textContent.toLowerCase();
  allSkills.forEach(skill => {
    if (text.includes(skill.toLowerCase())) {
      skillCounts[skill] = (skillCounts[skill] || 0) + 1;
    }
  });
});

// ===============================
// RENDER OR UPDATE SKILL BARS
// ===============================
const skillsSection = document.querySelector("#skills");

Object.keys(skillCounts).forEach(skill => {
  let existingBar = [...skillsSection.querySelectorAll(".skill-bar span")]
    .find(span => span.textContent.trim().toLowerCase() === skill.toLowerCase());

  // Create new bar if it doesn't exist
  if (!existingBar) {
    const skillBar = document.createElement("div");
    skillBar.classList.add("skill-bar");
    skillBar.innerHTML = `
      <span>${skill}</span>
      <div class="bar"><div class="bar-fill" data-skill="0%"></div></div>
    `;
    skillsSection.appendChild(skillBar);
    existingBar = skillBar.querySelector("span");
  }

  // Update percentage based on project frequency
  const barFill = existingBar.parentElement.querySelector(".bar-fill");
  let percentage = Math.round((skillCounts[skill] / totalProjects) * 100);
  barFill.dataset.skill = percentage + "%";

  // Assign category color
  let assignedColor = "#e67e22"; // default (General Languages/Other)
  for (let cat in skillCategories) {
    if (skillCategories[cat].skills.includes(skill)) {
      assignedColor = skillCategories[cat].color;
      break;
    }
  }
  barFill.style.background = assignedColor;
});

// ===============================
// ANIMATE BARS WHEN VISIBLE
// ===============================
const skillBars = document.querySelectorAll('.bar-fill');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      bar.style.width = bar.dataset.skill;
    }
  });
}, { threshold: 0.5 });
skillBars.forEach(bar => observer.observe(bar));

// ===============================
// THEME TOGGLE WITH LOCALSTORAGE
// ===============================
const toggleBtn = document.getElementById("themeToggle");
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  toggleBtn.textContent = "☀️ Light";
}
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  if (document.body.classList.contains("light")) {
    toggleBtn.textContent = "☀️ Light";
    localStorage.setItem("theme", "light");
  } else {
    toggleBtn.textContent = "🌙 Dark";
    localStorage.setItem("theme", "dark");
  }
});

// ===============================
// SECTION FADE-IN ON SCROLL
// ===============================
const sections = document.querySelectorAll("section, footer");
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });
sections.forEach(sec => {
  sec.classList.add("fade-in");
  sectionObserver.observe(sec);
});

// ===============================
// SMOOTH SCROLL FOR NAV LINKS
// ===============================
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

// Smooth scroll for "View My Work" button
const viewWorkBtn = document.querySelector('.btn[href="#projects"]');
if (viewWorkBtn) {
  viewWorkBtn.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector('#projects');
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // Add a click animation pulse
    viewWorkBtn.classList.add('clicked');
    setTimeout(() => viewWorkBtn.classList.remove('clicked'), 500);
  });
}


// ===============================
// TYPING EFFECT
// ===============================
const typingText = document.querySelector("#typing-text");
const words = ["Software Engineer", "Web Developer", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
function typeEffect() {
  if (charIndex < words[wordIndex].length) {
    typingText.textContent += words[wordIndex][charIndex];
    charIndex++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(eraseEffect, 2000);
  }
}
function eraseEffect() {
  if (charIndex > 0) {
    typingText.textContent = words[wordIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 50);
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 500);
  }
}
typeEffect();

// ===============================
// PRELOADER (MIN 2 SECONDS)
// ===============================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("hide");
  }, 2000);
});
