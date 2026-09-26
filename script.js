document.addEventListener("DOMContentLoaded", () => {
  const P = PORTFOLIO;
  document.querySelectorAll("[data-brand]").forEach(e => e.textContent = P.brand.name);
  document.querySelectorAll("[data-role]").forEach(e => e.textContent = P.brand.role);
  document.querySelectorAll("[data-logo]").forEach(e => e.src = P.brand.logo);
  document.querySelectorAll("[data-discord]").forEach(e => e.textContent = P.brand.discord);
  document.querySelectorAll("[data-id]").forEach(e => e.textContent = P.brand.discordId);
  document.querySelectorAll("[data-email]").forEach(e => e.textContent = P.brand.email);

  const chips = document.querySelector("#chips");
  P.hero.chips.forEach(x => chips.insertAdjacentHTML("beforeend", `<span class="chip">${x}</span>`));

  const about = document.querySelector("#aboutText");
  P.about.paragraphs.forEach(x => about.insertAdjacentHTML("beforeend", `<p>${x}</p>`));

  const strengths = document.querySelector("#strengths");
  P.strengths.forEach(([n,t,d]) => strengths.insertAdjacentHTML("beforeend", `<div class="strength"><span class="num">${n}</span><b>${t}</b><span>${d}</span></div>`));

  const projects = document.querySelector("#projects");
  P.projects.forEach(p => {
    const cls = p.status === "COMPLETADO" ? "completed" : p.status === "AVANZANDO" ? "advancing" : "soon";
    projects.insertAdjacentHTML("beforeend", `<article class="project reveal">
      <div class="projectTop"><span class="type">${p.type}</span><span class="status ${cls}">${p.status}</span></div>
      <h3>${p.name}</h3><p>${p.description}</p>
      <div class="bar"><div class="fill" style="--p:${p.progress}%"></div></div><div class="percent">${p.progress}%</div>
    </article>`);
  });

  const reviews = document.querySelector("#reviews");
  P.reviews.forEach(r => reviews.insertAdjacentHTML("beforeend", `<article class="review reveal"><div class="stars">★★★★★</div><p>“${r.text}”</p><b>${r.name}</b><small>${r.role}</small></article>`));

  document.querySelector("#contactText").textContent = P.contactText;

  document.querySelectorAll(".copy").forEach(btn => btn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(btn.dataset.copy);
    const old = btn.textContent; btn.textContent = "COPIADO ✓";
    setTimeout(() => btn.textContent = old, 1400);
  }));

  const io = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("show")), {threshold:.12});
  document.querySelectorAll(".reveal").forEach(e => io.observe(e));

  setTimeout(() => { document.querySelector("#loader").style.opacity="0"; setTimeout(()=>document.querySelector("#loader").remove(),800); }, 1900);
});