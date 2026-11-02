
        const menuToggle = document.querySelector(".menu-toggle");
        const navMenu = document.querySelector(".nav-menu");
        const searchInput = document.querySelector(".sca");
        const shopButton = document.querySelector(".btn-shop");
        const collection = document.querySelector("#collection");
        const searchTerms = Array.from(navMenu.querySelectorAll("a"), (link) => link.textContent.trim());
        const searchPrefix = "Try Searching for ";
        const shouldAnimateSearchPlaceholder = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let searchTermIndex = 0;
        let searchCharacterIndex = 0;
        let isDeletingSearchTerm = false;
        let searchTypingTimer;

        if (shopButton && collection) {
            [shopButton, collection].forEach((element) => {
                element.addEventListener("pointerenter", () => {
                    shopButton.classList.add("is-hovered");
                    collection.classList.add("is-hovered");
                });
                element.addEventListener("pointerleave", () => {
                    shopButton.classList.remove("is-hovered");
                    collection.classList.remove("is-hovered");
                });
            });
        }

        menuToggle.addEventListener("click", () => {
            const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
            menuToggle.setAttribute("aria-expanded", String(!isExpanded));
            menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
            navMenu.classList.toggle("is-open", !isExpanded);
        });

        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
                navMenu.classList.remove("is-open");
            });
        });

        function animateSearchPlaceholder() {
            if (document.activeElement === searchInput || searchTerms.length === 0) {
                return;
            }

            const term = searchTerms[searchTermIndex];
            searchInput.placeholder = searchPrefix + term.slice(0, searchCharacterIndex);

            let delay = isDeletingSearchTerm ? 55 : 100;
            if (!isDeletingSearchTerm && searchCharacterIndex === term.length) {
                isDeletingSearchTerm = true;
                delay = 1100;
            } else if (isDeletingSearchTerm && searchCharacterIndex === 0) {
                isDeletingSearchTerm = false;
                searchTermIndex = (searchTermIndex + 1) % searchTerms.length;
                delay = 250;
            } else {
                searchCharacterIndex += isDeletingSearchTerm ? -1 : 1;
            }

            searchTypingTimer = window.setTimeout(animateSearchPlaceholder, delay);
        }

        searchInput.addEventListener("focus", () => {
            window.clearTimeout(searchTypingTimer);
            searchInput.placeholder = "Try Searching for...";
        });
        searchInput.addEventListener("blur", () => {
            if (shouldAnimateSearchPlaceholder) {
                animateSearchPlaceholder();
            }
        });

        if (shouldAnimateSearchPlaceholder) {
            animateSearchPlaceholder();
        }
  const gallery = document.querySelector('.image-gallery');
  const leftBtn = document.querySelector('.left-btn');
  const rightBtn = document.querySelector('.right-btn');

  leftBtn.addEventListener('click', () => {
    gallery.scrollBy({ left: -300, behavior: 'smooth' });
  });

  rightBtn.addEventListener('click', () => {
    gallery.scrollBy({ left: 300, behavior: 'smooth' });
  });