const postListEl = document.getElementById("post-list");
const postDetailEl = document.getElementById("post-detail");
const postTitleEl = document.getElementById("post-title");
const postDateEl = document.getElementById("post-date");
const postBodyEl = document.getElementById("post-body");
const themeToggleEl = document.getElementById("theme-toggle");

let postsCache = null;

async function loadPosts() {
  if (postsCache) return postsCache;
  const res = await fetch("posts/posts.json", { cache: "no-store" });
  if (!res.ok) throw new Error("포스트 목록을 불러오지 못했습니다.");
  const posts = await res.json();
  postsCache = posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return postsCache;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
}

async function renderList() {
  postDetailEl.hidden = true;
  postListEl.hidden = false;
  postListEl.innerHTML = "";

  try {
    const posts = await loadPosts();
    if (posts.length === 0) {
      postListEl.innerHTML = '<p class="empty-state">아직 글이 없습니다.</p>';
      return;
    }

    for (const post of posts) {
      const card = document.createElement("article");
      card.className = "post-card";
      card.innerHTML = `
        <h2><a href="#/post/${post.slug}">${post.title}</a></h2>
        <p class="post-date">${formatDate(post.date)}</p>
        <p class="excerpt">${post.excerpt ?? ""}</p>
      `;
      postListEl.appendChild(card);
    }
  } catch (err) {
    postListEl.innerHTML = `<p class="error-state">글 목록을 불러오는 중 오류가 발생했습니다: ${err.message}</p>`;
  }
}

async function renderPost(slug) {
  postListEl.hidden = true;
  postDetailEl.hidden = false;
  postBodyEl.innerHTML = "";

  try {
    const posts = await loadPosts();
    const meta = posts.find((p) => p.slug === slug);
    if (!meta) throw new Error("글을 찾을 수 없습니다.");

    const res = await fetch(`posts/${slug}.md`, { cache: "no-store" });
    if (!res.ok) throw new Error("마크다운 파일을 불러오지 못했습니다.");
    const markdown = await res.text();

    postTitleEl.textContent = meta.title;
    postDateEl.textContent = formatDate(meta.date);
    postBodyEl.innerHTML = marked.parse(markdown);
    window.scrollTo(0, 0);
  } catch (err) {
    postTitleEl.textContent = "글을 불러올 수 없습니다";
    postDateEl.textContent = "";
    postBodyEl.innerHTML = `<p class="error-state">${err.message}</p>`;
  }
}

function route() {
  const hash = window.location.hash;
  const postMatch = hash.match(/^#\/post\/(.+)$/);
  if (postMatch) {
    renderPost(decodeURIComponent(postMatch[1]));
  } else {
    renderList();
  }
}

function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    document.documentElement.setAttribute("data-theme", saved);
  }
}

function toggleTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const current = document.documentElement.getAttribute("data-theme") || (prefersDark ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

themeToggleEl.addEventListener("click", toggleTheme);
window.addEventListener("hashchange", route);
window.addEventListener("DOMContentLoaded", () => {
  initTheme();
  if (!window.location.hash) {
    window.location.hash = "#/";
  } else {
    route();
  }
});
