/* ===============
  Scroll menu
=============== */

window.onload = () => {
  const newsGroup = document.querySelector(".news-group");
  const figures = newsGroup.querySelectorAll("figure");
  const style = getComputedStyle(newsGroup);
  const gap = parseInt(style.gap) || 0;
  const figureWidth = figures[0].offsetWidth + gap;

  const itemsPerScroll = 3;
  const scrollStep = figureWidth * itemsPerScroll;
  const maxScroll = figureWidth * figures.length;

  let scrollPosition = 0;
  let autoScrollInterval;
  let isReturning = false;

  function scrollToPosition(pos, duration = 1500) {
    scrollPosition = pos;

    if (scrollPosition >= maxScroll) {
      // 最後まで行ったら2秒待って一瞬で戻る
      clearInterval(autoScrollInterval);
      isReturning = true;

      // 最後までスムースにスクロール
      newsGroup.scrollTo({
        left: maxScroll,
        behavior: "smooth",
      });

      setTimeout(() => {
        // 一瞬で先頭に戻す（スムースにしないならsmooth => auto）
        newsGroup.scrollTo({ left: 0, behavior: "smooth" });
        scrollPosition = 0;

        // 先頭に戻ってから2秒待って自動スクロール再開
        setTimeout(() => {
          isReturning = false;
          startAutoScroll();
        }, 1500);
      }, 1500);

      return;
    }

    if (scrollPosition < 0) {
      scrollPosition = 0; // 端を超えないように調整
    }

    if (!isReturning) {
      newsGroup.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }

  function scrollNext() {
    scrollToPosition(scrollPosition + scrollStep);
  }

  function scrollPrev() {
    scrollToPosition(scrollPosition - scrollStep);
  }

  function startAutoScroll() {
    autoScrollInterval = setInterval(scrollNext, 4000); // 4秒ごとにスクロール
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  // ボタン取得
  const prevBtn = document.querySelector(".news-scroll-btn.prev");
  const nextBtn = document.querySelector(".news-scroll-btn.next");

  prevBtn.addEventListener("click", () => {
    if (isReturning) return;
    stopAutoScroll();
    scrollPrev();
    startAutoScroll();
  });

  nextBtn.addEventListener("click", () => {
    if (isReturning) return;
    stopAutoScroll();
    scrollNext();
    startAutoScroll();
  });

  newsGroup.addEventListener("mouseenter", stopAutoScroll);
  newsGroup.addEventListener("mouseleave", () => {
    if (!isReturning) startAutoScroll();
  });

  startAutoScroll();
};

/* ===============
  Hamburger menu
=============== */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".header-nav-menu");
const overlay = document.getElementById("overlay");
const icon = menuToggle.querySelector("ion-icon");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  overlay.classList.toggle("active");

  if (navMenu.classList.contains("active")) {
    icon.setAttribute("name", "close-outline");
  } else {
    icon.setAttribute("name", "menu-outline");
  }
});

overlay.addEventListener("click", () => {
  navMenu.classList.remove("active");
  overlay.classList.remove("active");
  icon.setAttribute("name", "menu-outline");
});

/* ===============
  Header fixed
=============== */

window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  const body = document.body;
  const headerHeight = header.offsetHeight;

  if (window.scrollY > headerHeight) {
    header.classList.add("fixed");
    body.style.paddingTop = `${headerHeight}px`;
  } else {
    header.classList.remove("fixed");
    body.style.paddingTop = 0;
  }
});
