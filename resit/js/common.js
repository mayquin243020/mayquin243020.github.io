
document.querySelectorAll(".header").forEach(function(header) {
    const button = header.querySelector(".menu-toggle");
    const navigation = header.querySelector(".navigation");

    if (!button || !navigation) {
        return;
    }

    let savedScrollY = 0;

    function closeMenu() {
        if (!header.classList.contains("menu-open")) {
            return;
        }

        header.classList.remove("menu-open");
        document.body.classList.remove("menu-open");

        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";

        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", "Open navigation");

        window.scrollTo(0, savedScrollY);
    }

    button.addEventListener("click", function() {
        if (header.classList.contains("menu-open")) {
            closeMenu();
            return;
        }

        savedScrollY = window.scrollY;

        header.classList.add("menu-open");
        document.body.classList.add("menu-open");

        document.body.style.position = "fixed";
        document.body.style.top = "-" + savedScrollY + "px";
        document.body.style.width = "100%";

        button.setAttribute("aria-expanded", "true");
        button.setAttribute("aria-label", "Close navigation");
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
