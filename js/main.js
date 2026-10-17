(function () {
  "use strict";
  const W = window.WEDDING;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const get = (path) => path.split(".").reduce((o, k) => (o ? o[k] : ""), W) || "";
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");

  /* ---------- Đổ dữ liệu từ config ---------- */
  $$("[data-f]").forEach((el) => {
    const v = get(el.dataset.f);
    if (v) el.textContent = v; else if (!el.closest("h1,h2")) el.remove();
  });
  $$("[data-src]").forEach((el) => (el.src = get(el.dataset.src)));
  $$("[data-bg]").forEach((el) => (el.style.backgroundImage = `url("${get(el.dataset.bg)}")`));

  /* ---------- Ngày giờ ---------- */
  const wedding = new Date(W.date);
  const vn = (opt) => new Intl.DateTimeFormat("vi-VN", { timeZone: "Asia/Ho_Chi_Minh", ...opt }).format(wedding);
  const dd = vn({ day: "2-digit" }), mm = vn({ month: "2-digit" }), yyyy = vn({ year: "numeric" });
  const hhmm = vn({ hour: "2-digit", minute: "2-digit", hour12: false });
  $("#heroDate").textContent = `${dd} . ${mm} . ${yyyy}`;
  $("#dbWeekday").textContent = vn({ weekday: "long" });
  $("#dbTime").textContent = `Vào lúc ${hhmm}`;
  $("#dbDay").textContent = dd;
  $("#dbMonth").textContent = `Tháng ${mm}`;
  $("#dbYear").textContent = yyyy;

  /* ---------- Bản đồ ---------- */
  $("#mapBtn").href = W.venue.mapUrl;
  if (W.venue.mapEmbed) {
    $("#mapWrap").innerHTML = `<iframe src="${esc(W.venue.mapEmbed)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Bản đồ"></iframe>`;
  }

  /* ---------- Đếm ngược ---------- */
  function tick() {
    let s = Math.max(0, Math.floor((wedding - Date.now()) / 1000));
    if (s === 0 && Date.now() - wedding > 86400000) {
      $(".countdown").outerHTML = '<p class="cd-done">Chúng mình đã về chung một nhà ♥</p>';
      return clearInterval(timer);
    }
    if (!$("#cdD")) return;
    $("#cdD").textContent = pad(Math.floor(s / 86400)); s %= 86400;
    $("#cdH").textContent = pad(Math.floor(s / 3600)); s %= 3600;
    $("#cdM").textContent = pad(Math.floor(s / 60));
    $("#cdS").textContent = pad(s % 60);
  }
  const timer = setInterval(tick, 1000); tick();

  /* ---------- Lịch tháng ---------- */
  (function calendar() {
    const y = +yyyy, m = +mm - 1, d = +dd;
    const first = (new Date(y, m, 1).getDay() + 6) % 7; // T2 = 0
    const days = new Date(y, m + 1, 0).getDate();
    let h = `<h4>THÁNG ${pad(m + 1)} / ${y}</h4><div class="cal-grid">`;
    ["T2", "T3", "T4", "T5", "T6", "T7", "CN"].forEach((x) => (h += `<span class="dow">${x}</span>`));
    for (let i = 0; i < first; i++) h += "<span></span>";
    for (let i = 1; i <= days; i++) h += `<span class="day${i === d ? " hl" : ""}">${i}</span>`;
    $("#calendar").innerHTML = h + "</div>";
  })();

  /* ---------- Chuyện tình, timeline, dresscode ---------- */
  $("#story").innerHTML = (W.story || []).map((s) =>
    `<div class="story-item reveal"><b>${esc(s.date)}</b><h4>${esc(s.title)}</h4><p>${esc(s.text)}</p></div>`).join("");
  if (!W.story || !W.story.length) $("#story").remove();
  $("#timeline").innerHTML = W.timeline.map((t) =>
    `<li class="reveal"><span class="t">${esc(t.time)}</span><span class="l">${esc(t.label)}</span></li>`).join("");
  $("#swatches").innerHTML = W.dresscode.colors.map((c) => `<span style="background:${esc(c)}" title="${esc(c)}"></span>`).join("");

  /* ---------- Album: slide 3D + lightbox ---------- */
  const N = W.album.length;
  let cur = 0, idx = 0, auto;
  $("#cfStage").innerHTML = W.album.map((src, i) =>
    `<div class="cf-item" data-i="${i}" role="button" aria-label="Ảnh ${i + 1}"><img src="${esc(src)}" loading="${i < 3 ? "eager" : "lazy"}" alt="Ảnh cưới ${i + 1}" /></div>`).join("");
  const items = $$(".cf-item");
  function layout() {
    items.forEach((el, i) => {
      let o = i - cur;
      if (o > N / 2) o -= N; else if (o < -N / 2) o += N; // vòng tròn
      const a = Math.abs(o);
      el.style.transform = `translateX(${o * 58}%) translateZ(${-a * 150}px) rotateY(${-o * 42}deg) scale(${a ? 0.85 : 1})`;
      el.style.opacity = a > 3 ? 0 : 1 - a * 0.22;
      el.style.zIndex = 100 - a;
      el.style.pointerEvents = a > 2 ? "none" : "";
      el.classList.toggle("active", a === 0);
    });
    $("#cfCount").textContent = `${cur + 1} / ${N}`;
  }
  const go = (i) => { cur = (i + N) % N; layout(); };
  const restart = () => { clearInterval(auto); auto = setInterval(() => go(cur + 1), 3800); };
  $("#cfPrev").onclick = () => { go(cur - 1); restart(); };
  $("#cfNext").onclick = () => { go(cur + 1); restart(); };
  $("#cfStage").addEventListener("click", (e) => {
    const it = e.target.closest(".cf-item"); if (!it) return;
    const i = +it.dataset.i;
    if (i === cur) show(i); else { go(i); restart(); }
  });
  let sx = 0;
  const cf = $("#album");
  cf.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
  cf.addEventListener("touchend", (e) => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) { go(cur + (dx < 0 ? 1 : -1)); restart(); } });
  layout(); restart();

  const lb = $("#lightbox"), lbImg = $("#lbImg");
  const show = (i) => { idx = (i + N) % N; lbImg.src = W.album[idx]; lb.hidden = false; };
  $("#lbPrev").onclick = () => show(idx - 1);
  $("#lbNext").onclick = () => show(idx + 1);
  let tx = 0;
  lb.addEventListener("touchstart", (e) => (tx = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => { const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); });

  /* ---------- Mừng cưới ---------- */
  $("#gifts").innerHTML = W.gifts.map((g) => `
    <div class="gift">
      <p class="caps">${esc(g.owner)}</p>
      ${g.qr ? `<img src="${esc(g.qr)}" alt="QR ${esc(g.owner)}" />` : ""}
      <p>${esc(g.bank)}</p>
      <p class="acc">${esc(g.account)}</p>
      <p class="small">${esc(g.holder)}</p>
      <button class="btn btn-dark" data-copy="${esc(g.account)}">Sao chép số tài khoản</button>
    </div>`).join("");
  $("#giftBtn").onclick = () => ($("#giftModal").hidden = false);
  $("#gifts").addEventListener("click", async (e) => {
    const b = e.target.closest("[data-copy]"); if (!b) return;
    try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = "Đã sao chép ✓"; }
    catch { b.textContent = b.dataset.copy; }
  });

  /* Đóng modal/lightbox */
  $$(".modal, .lightbox").forEach((m) => m.addEventListener("click", (e) => {
    if (e.target === m || e.target.hasAttribute("data-close")) m.hidden = true;
  }));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") $$(".modal, .lightbox").forEach((m) => (m.hidden = true));
    if (!lb.hidden && e.key === "ArrowRight") show(idx + 1);
    if (!lb.hidden && e.key === "ArrowLeft") show(idx - 1);
  });

  /* ---------- Nhạc nền + mở phong bì ---------- */
  const audio = $("#bgm"), mBtn = $("#musicBtn");
  if (W.music) audio.src = W.music; else mBtn.remove();
  const setPlaying = (p) => mBtn.classList.toggle("playing", p);
  mBtn.onclick = () => (audio.paused ? audio.play().then(() => setPlaying(true)).catch(() => {}) : (audio.pause(), setPlaying(false)));
  $("#openBtn").onclick = () => {
    $("#envelope").classList.add("opened");
    document.body.classList.remove("locked");
    ticker.start();
    if (W.music) audio.play().then(() => setPlaying(true)).catch(() => {});
  };

  /* ---------- Hiệu ứng khi cuộn ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));

  /* ---------- RSVP + lời chúc ---------- */
  const LS = "wedding-wishes";
  const local = { get() { try { return JSON.parse(localStorage.getItem(LS)) || []; } catch { return []; } },
                  add(w) { try { localStorage.setItem(LS, JSON.stringify([w, ...this.get()].slice(0, 50))); } catch {} } };
  let wishList = [];
  const wishHtml = (w) => `<div class="wish"><b>${esc(w.name)}</b><p>${esc(w.message)}</p></div>`;
  function renderWishes(list) {
    wishList = list.filter((w) => w.message);
    $("#wishes").innerHTML = wishList.map(wishHtml).join("");
    ticker.start();
  }
  async function loadWishes() {
    if (!W.sheetApi) return renderWishes(local.get());
    try {
      const r = await fetch(W.sheetApi + "?action=wishes");
      renderWishes(await r.json());
    } catch { renderWishes(local.get()); }
  }

  /* Lời chúc chạy luân phiên ở góc màn hình */
  const ticker = (() => {
    const el = $("#wishTicker"), nameEl = $("#wtName"), msgEl = $("#wtMsg"), bar = $("#wtBar");
    let i = 0, timer = null, closed = false;
    const DELAY = 2000; // thời gian hiển thị mỗi lời chúc (ms)
    el.style.setProperty("--wt-d", DELAY + "ms");
    function next() {
      if (!wishList.length) return;
      el.classList.remove("show");
      setTimeout(() => {
        const w = wishList[i++ % wishList.length];
        nameEl.textContent = w.name;
        msgEl.textContent = w.message;
        bar.classList.remove("run"); void bar.offsetWidth; bar.classList.add("run"); // chạy lại thanh tiến trình
        el.classList.add("show");
      }, 300); // chờ hiệu ứng trượt ra
    }
    return {
      start() {
        if (closed || timer || !wishList.length || document.body.classList.contains("locked")) return;
        el.hidden = false; next();
        timer = setInterval(next, DELAY + 300);
      },
      showNow() { i = 0; clearInterval(timer); timer = null; this.start(); },
      close() { closed = true; clearInterval(timer); timer = null; el.classList.remove("show"); setTimeout(() => (el.hidden = true), 300); },
    };
  })();
  const toWishes = () => $(".wishes-sec").scrollIntoView({ behavior: "smooth" });
  $(".wt-text").onclick = toWishes;
  $(".wt-text").onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toWishes(); } };
  $("#wtClose").onclick = () => ticker.close();
  loadWishes();

  $("#rsvpForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = e.target, btn = f.querySelector("button"), msg = $("#formMsg");
    const data = Object.fromEntries(new FormData(f));
    data.time = new Date().toISOString();
    btn.disabled = true; msg.textContent = "Đang gửi...";
    try {
      if (W.sheetApi) {
        await fetch(W.sheetApi, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(data) });
      }
      local.add(data);
      msg.textContent = "Cảm ơn bạn vì những lời chúc tốt đẹp! ♥";
      f.reset();
      if (data.message) {
        wishList.unshift({ name: data.name, message: data.message });
        $("#wishes").insertAdjacentHTML("afterbegin", wishHtml(data));
        ticker.showNow();
      }
    } catch {
      msg.textContent = "Gửi chưa thành công, bạn thử lại giúp mình nhé.";
    } finally { btn.disabled = false; }
  });
})();
