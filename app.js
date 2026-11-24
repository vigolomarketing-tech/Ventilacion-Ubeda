(() => {
  const C = CONFIG, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const wa = (text) => `https://wa.me/${C.contacto.whatsapp}?text=${encodeURIComponent(text)}`;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Colores desde CONFIG (para rebrandear cambiando solo data.js)
  const root = document.documentElement.style, col = C.colores;
  root.setProperty("--red", col.primario); root.setProperty("--orange", col.acento);
  root.setProperty("--ink", col.oscuro); root.setProperty("--bg", col.fondo);

  // Enlaces a WhatsApp
  $$("[data-wa]").forEach((a) => { a.href = wa(C.contacto.mensajeWhatsapp); a.target = "_blank"; a.rel = "noopener"; });

  // Menú móvil
  const burger = $("#burger"), links = $("#links");
  const setMenu = (open) => { links.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); };
  burger.onclick = () => setMenu(!links.classList.contains("open"));
  links.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });

  // Abierto ahora (hora de Argentina)
  function abierto() {
    const p = new Intl.DateTimeFormat("en-US", { timeZone: "America/Argentina/Buenos_Aires", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
    const g = (t) => p.find((x) => x.type === t).value;
    const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(g("weekday"));
    const min = (+g("hour") % 24) * 60 + +g("minute");
    const m = (h) => { const [a, b] = h.split(":"); return +a * 60 + +b; };
    return (C.horarios[dia] || []).some(([a, b]) => min >= m(a) && min < m(b));
  }
  const todo24 = Object.values(C.horarios).every((d) => d.length === 1 && d[0][0] === "00:00" && d[0][1] === "24:00");
  $("#openNow").textContent = todo24 ? "Abierto las 24 horas, todos los días." : abierto() ? "Abierto ahora." : "Cerrado ahora. Escribinos y te respondemos en cuanto abramos.";
  $("#hor").textContent = todo24 ? "Abierto las 24 horas, todos los días" : "Consultanos por WhatsApp";

  // Contacto
  $("#dir").textContent = C.contacto.direccion;
  const tel = $("#tel"); tel.textContent = C.contacto.telefono; tel.href = "tel:+" + C.contacto.whatsapp;
  const mail = $("#mail"); mail.textContent = C.contacto.email; mail.href = "mailto:" + C.contacto.email;
  $("#comoLlegar").href = C.contacto.mapsLink; $("#mapa").src = C.contacto.mapsEmbed;
  $("#year").textContent = new Date().getFullYear();

  // Ventiladores SVG
  const blade = "M-8,-16 C34,-30 62,-74 34,-132 C2,-128 -36,-84 -24,-18Z";
  const blades = Array.from({ length: 6 }, (_, i) => `<path d="${blade}" fill="url(#blade)" transform="rotate(${i * 60})"/>`).join("");
  $("#bladesHero").innerHTML = blades; $("#bladesBig").innerHTML = blades;
  $("#sizes").innerHTML = C.diametros.map((d) => `<li>Ø${d}</li>`).join("");

  const spins = $$(".fan .spin");
  let ang = 0, speed = 140, lastY = scrollY, last = performance.now();
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function tick(now) {
    const dt = Math.min(now - last, 50) / 1000; last = now;
    const v = Math.abs(scrollY - lastY) / Math.max(dt, .001); lastY = scrollY;
    speed += (140 + Math.min(v * .6, 1400) - speed) * Math.min(dt * 3, 1); // gira más rápido al hacer scroll
    ang = (ang + speed * dt) % 360;
    spins.forEach((s) => s.setAttribute("transform", `rotate(${ang.toFixed(1)})`));
    requestAnimationFrame(tick);
  }
  if (!reduce) requestAnimationFrame(tick);

  // Inclinación 3D del hero
  const stage = $("#stage"), inner = $("#stageInner");
  const tilt = (x, y) => {
    const r = stage.getBoundingClientRect();
    const dx = (x - r.left) / r.width - .5, dy = (y - r.top) / r.height - .5;
    stage.classList.add("touched");
    inner.style.transform = `rotateY(${dx * 28}deg) rotateX(${-dy * 28}deg)`;
  };
  if (!reduce) {
    addEventListener("pointermove", (e) => tilt(e.clientX, e.clientY), { passive: true });
    stage.addEventListener("pointerleave", () => { inner.style.transform = ""; stage.classList.remove("touched"); });
  }

  // Productos
  const cats = C.categorias, nombreCat = Object.fromEntries(cats.map((c) => [c.id, c.nombre]));
  let filtro = "todos";
  const carrito = (() => { try { return JSON.parse(localStorage.getItem("ubeda-cot") || "{}"); } catch { return {}; } })();
  const guardar = () => { try { localStorage.setItem("ubeda-cot", JSON.stringify(carrito)); } catch {} };
  const prod = (id) => C.productos.find((p) => p.id === id);

  $("#lines").innerHTML = cats.map((c) => `
    <button class="line" data-cat="${c.id}">
      <img src="${c.foto}" alt="" loading="lazy" width="300" height="400">
      <span class="n">${(n => n + (n === 1 ? " modelo" : " modelos"))(C.productos.filter((p) => p.categoria === c.id).length)}</span>
      <div><h3>${esc(c.nombre)}</h3><p>${esc(c.frase)}</p></div>
    </button>`).join("");

  const opciones = [{ id: "todos", nombre: "Todos" }, ...cats];
  $("#chips").innerHTML = opciones.map((o) => `<button class="chip-btn" role="tab" data-cat="${o.id}" aria-selected="${o.id === filtro}">${esc(o.nombre)}</button>`).join("");

  function renderGrid() {
    const lista = C.productos.filter((p) => filtro === "todos" || p.categoria === filtro);
    $("#grid").innerHTML = lista.map((p, i) => `
      <article class="card" style="animation-delay:${Math.min(i, 8) * 40}ms">
        <div class="card-img"><img src="${p.foto}" alt="${esc(p.alt)}" loading="lazy" width="424" height="424"></div>
        <div class="card-body">
          <span class="tag">${esc(nombreCat[p.categoria])}</span>
          <h3>${esc(p.nombre)}</h3>
          <p class="spec">${esc(p.spec)}</p>
          <p class="uso">${esc(p.uso)}</p>
          <div class="card-foot">
            <span class="price">Consultar precio</span>
            <button class="add ${carrito[p.id] ? "has" : ""}" data-add="${p.id}" aria-label="Agregar ${esc(p.nombre)} a la cotización">+${carrito[p.id] ? `<span class="q">${carrito[p.id]}</span>` : ""}</button>
          </div>
        </div>
      </article>`).join("");
    $$("#chips .chip-btn").forEach((b) => b.setAttribute("aria-selected", b.dataset.cat === filtro));
  }
  function setFiltro(id, scroll) {
    filtro = id; renderGrid();
    if (scroll) $("#chips").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  $("#chips").onclick = (e) => { const b = e.target.closest("[data-cat]"); if (b) setFiltro(b.dataset.cat); };
  $("#lines").onclick = (e) => { const b = e.target.closest("[data-cat]"); if (b) setFiltro(b.dataset.cat, true); };
  $("#grid").onclick = (e) => {
    const b = e.target.closest("[data-add]"); if (!b) return;
    carrito[b.dataset.add] = (carrito[b.dataset.add] || 0) + 1; guardar(); renderGrid(); renderCot();
  };

  // Galería
  $("#gal").innerHTML = C.galeria.map((g) => `<div class="shot"><img src="${g.foto}" alt="${esc(g.alt)}" loading="lazy" width="340" height="340"></div>`).join("");

  // Carruseles (flechas)
  $$("[data-car]").forEach((b) => b.addEventListener("click", () => {
    const t = document.getElementById(b.dataset.car), item = t.firstElementChild;
    t.scrollBy({ left: +b.dataset.dir * (item.offsetWidth + 18), behavior: "smooth" });
  }));

  // Cotización
  const sheet = $("#sheet"), back = $("#sheetBack"), fab = $("#quoteFab");
  const openSheet = () => { sheet.hidden = back.hidden = false; $("#sheetClose").focus(); };
  const closeSheet = () => { sheet.hidden = back.hidden = true; fab.focus(); };
  fab.onclick = openSheet; back.onclick = closeSheet; $("#sheetClose").onclick = closeSheet;
  addEventListener("keydown", (e) => { if (e.key === "Escape" && !sheet.hidden) closeSheet(); });

  function renderCot() {
    const ids = Object.keys(carrito).filter((id) => prod(id));
    const total = ids.reduce((s, id) => s + carrito[id], 0);
    fab.hidden = !total; $("#quoteCount").textContent = total;
    $("#qlist").innerHTML = ids.length ? ids.map((id) => {
      const p = prod(id);
      return `<li><img src="${p.foto}" alt="" width="56" height="56"><div class="t">${esc(p.nombre)}<small>${esc(p.spec)}</small></div>
        <div class="qty"><button data-q="-1" data-id="${id}" aria-label="Quitar uno">−</button><span>${carrito[id]}</span><button data-q="1" data-id="${id}" aria-label="Agregar uno">+</button></div></li>`;
    }).join("") : `<li class="empty">Todavía no agregaste equipos.</li>`;
    if (!ids.length && !sheet.hidden) closeSheet();
  }
  $("#qlist").onclick = (e) => {
    const b = e.target.closest("[data-q]"); if (!b) return;
    const id = b.dataset.id; carrito[id] = (carrito[id] || 0) + +b.dataset.q;
    if (carrito[id] <= 0) delete carrito[id];
    guardar(); renderCot(); renderGrid();
  };
  $("#qClear").onclick = () => { Object.keys(carrito).forEach((k) => delete carrito[k]); guardar(); renderCot(); renderGrid(); };
  $("#formCot").onsubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const items = Object.keys(carrito).filter(prod).map((id) => `• ${carrito[id]}x ${prod(id).nombre} — ${prod(id).spec}`);
    const datos = [`Nombre: ${f.get("nombre")}`, f.get("localidad") && `Localidad: ${f.get("localidad")}`, f.get("nota") && `Aclaraciones: ${f.get("nota")}`].filter(Boolean);
    const msg = ["¡Hola! Quiero cotizar estos equipos:", ...items, ...datos].join("\n");
    open(wa(msg), "_blank", "noopener");
  };

  // Formulario "a medida"
  $("#formMedida").onsubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const msg = ["¡Hola! Quiero un presupuesto para un extractor a medida:", `Equipo: ${f.get("tipo")}`, `Uso: ${f.get("uso")}`, f.get("medida") && `Medida o detalle: ${f.get("medida")}`, `Nombre: ${f.get("nombre")}`, f.get("localidad") && `Localidad: ${f.get("localidad")}`].filter(Boolean).join("\n");
    open(wa(msg), "_blank", "noopener");
  };

  // Aparecer al hacer scroll
  const io = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: .12 });
  $$(".section .wrap > h2, .steps li, .custom-fan, .map, .info").forEach((el) => { el.classList.add("rv"); io.observe(el); });

  renderGrid(); renderCot();
})();
