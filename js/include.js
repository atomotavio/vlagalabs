async function includePartials() {
  const nodes = document.querySelectorAll("[data-include]");
  await Promise.all([...nodes].map(async (el) => {
    const file = el.getAttribute("data-include");
    const res = await fetch(file, { cache: "no-cache" });
    if (!res.ok) {
      el.innerHTML = `<!-- include failed: ${file} (${res.status}) -->`;
      return;
    }
    el.innerHTML = await res.text();
  }));
}

function initMobileNav() {
  const btn = document.querySelector(".nav-toggle");
  const menu = document.querySelector("#nav-menu");
  if (!btn || !menu) return;

  function closeMenu() {
    menu.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
  }

  btn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });

  menu.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) closeMenu();
  });

  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("is-open")) return;
    if (menu.contains(e.target) || btn.contains(e.target)) return;
    closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

(async function bootstrap() {
  await includePartials();
  initMobileNav();
})();
