document.querySelectorAll(".header").forEach(function(header) {
    const button = header.querySelector(".menu-toggle");
    const navigation = header.querySelector(".navigation");

    if (!button || !navigation) {
        return;
    }

    function closeMenu() {
        header.classList.remove("menu-open");
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", "Open navigation");
    }

    button.addEventListener("click", function() {
        const isOpen = header.classList.toggle("menu-open");
        button.setAttribute("aria-expanded", String(isOpen));
        button.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navigation.addEventListener("click", function(event) {
        if (event.target.closest("a")) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
});