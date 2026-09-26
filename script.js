const $ = (selector) => document.querySelector(selector);

function fillContent() {
  document.title = `${CONFIG.identity.name} — Portfolio`;

  const name = document.querySelectorAll("[data-name]");
  name.forEach(el => el.textContent = CONFIG.identity.name);

  $("#heroRole").textContent = CONFIG.identity.role;
  $("#heroBadge").textContent = CONFIG.identity.badge;
  $("#heroDescription").textContent = CONFIG.identity.description;

  $("#statExperience").textContent = CONFIG.identity.experience;
  $("#statProjects").textContent = CONFIG.identity.projects;
  $("#statFocus").textContent = CONFIG.identity.focus;

  $("#aboutTitle").textContent = CONFIG.about.title;
  $("#aboutText").innerHTML = CONFIG.about.paragraphs.map(p => `<p>${p}</p>`).join("");

  $("#strengths").innerHTML = CONFIG.strengths.map((item, i) => `
    <article class="strength-card reveal" style="--delay:${i * 80}ms">
      <div class="strength-icon">${item.icon}</div>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `).join("");

  $("#differenceList").innerHTML = CONFIG.difference.map((item, i) => `
    <div class="accordion-item ${i === 0 ? "active" : ""}">
      <button class="accordion-button" type="button">
        <span class="number">0${i + 1}</span>
        <span>
          <strong>${item.title}</strong>
          <small>${item.subtitle}</small>
        </span>
        <b>${i === 0 ? "−" : "+"}</b>
      </button>
      <div class="accordion-content"><p>${item.detail}</p></div>
    </div>
  `).join("");

  $("#servicesList").innerHTML = CONFIG.services.map((item, i) => `
    <div class="accordion-item">
      <button class="accordion-button" type="button">
        <span class="number">0${i + 1}</span>
        <span>
          <strong>${item.title}</strong>
          <small>${item.subtitle}</small>
        </span>
        <b>+</b>
      </button>
      <div class="accordion-content"><p>${item.detail}</p></div>
    </div>
  `).join("");

  $("#servers").innerHTML = CONFIG.servers.map((server, i) => `
    <article class="server-card reveal" style="--delay:${i * 90}ms">
      <div class="server-number">0${i + 1}</div>
      <div class="server-mark">${server.name.slice(0, 1)}</div>
      <div>
        <h3>${server.name}</h3>
        <span>${server.players}</span>
      </div>
      <strong>${server.role}</strong>
    </article>
  `).join("");

  $("#works").innerHTML = CONFIG.works.map((work, i) => `
    <article class="work-card project-card reveal" style="--delay:${i * 110}ms">
      <div class="project-shine"></div>
      <div class="work-top">
        <span>0${i + 1}</span>
        <em>${work.category}</em>
      </div>
      <div class="work-preview">
        <div class="fake-discord">
          <i></i><i></i><i></i>
          <div class="fake-line long"></div>
          <div class="fake-line"></div>
          <div class="fake-line medium"></div>
          <div class="fake-box"></div>
        </div>
        <div class="project-scan"></div>
      </div>
      <div class="project-title-row">
        <h3>${work.title}</h3>
        <span class="project-status ${work.statusType || 'progress'}"><i></i>${work.status || 'AVANZANDO'}</span>
      </div>
      <p>${work.text}</p>
      <div class="project-progress"><span style="--progress:${work.statusType === 'done' ? '100%' : work.statusType === 'soon' ? '8%' : '68%'}"></span></div>
    </article>
  `).join("");

  $("#reviews").innerHTML = CONFIG.reviews.map((review, i) => `
    <article class="review-card reveal" style="--delay:${i * 100}ms">
      <div class="quote">“</div>
      <p>${review.text}</p>
      <div class="review-author">
        <div class="avatar">${review.name.slice(0,1)}</div>
        <div><strong>${review.name}</strong><small>${review.role}</small></div>
      </div>
    </article>
  `).join("");

  $("#discordText").textContent = CONFIG.contact.discord;
  $("#emailText").textContent = CONFIG.contact.email;

  const discordLinks = document.querySelectorAll("[data-discord]");
  discordLinks.forEach(a => {
    if (CONFIG.contact.discordUrl && CONFIG.contact.discordUrl !== "#") {
      a.href = CONFIG.contact.discordUrl;
    }
  });
}

function setupAccordion() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".accordion-button");
    if (!button) return;

    const item = button.parentElement;
    const parent = item.parentElement;

    [...parent.children].forEach(other => {
      if (other !== item) {
        other.classList.remove("active");
        const icon = other.querySelector(".accordion-button b");
        if (icon) icon.textContent = "+";
      }
    });

    item.classList.toggle("active");
    const icon = item.querySelector(".accordion-button b");
    if (icon) icon.textContent = item.classList.contains("active") ? "−" : "+";
  });
}

function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

function setupNav() {
  const nav = $(".nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  });

  document.querySelectorAll("[data-scroll]").forEach(button => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.scroll);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const menu = $(".menu-toggle");
  const links = $(".nav-links");
  menu.addEventListener("click", () => {
    links.classList.toggle("open");
    menu.classList.toggle("open");
  });

  links.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      menu.classList.remove("open");
    });
  });
}

function setupCopy() {
  document.querySelectorAll("[data-copy]").forEach(button => {
    button.addEventListener("click", async () => {
      const value = button.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        const old = button.textContent;
        button.textContent = "COPIADO";
        setTimeout(() => button.textContent = old, 1300);
      } catch {
        button.textContent = value;
      }
    });
  });
}

function setupLoader() {
  const loader = $(".loader");
  let progress = 0;
  const bar = $(".loader-bar");
  const percent = $(".loader-percent");

  const timer = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);
      setTimeout(() => loader.classList.add("hide"), 250);
    }
    bar.style.width = progress + "%";
    percent.textContent = progress + "%";
  }, 70);
}

document.addEventListener("DOMContentLoaded", () => {
  fillContent();
  setupAccordion();
  setupReveal();
  setupNav();
  setupCopy();
  setupLoader();
});
