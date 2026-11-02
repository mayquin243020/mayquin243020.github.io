
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



document.addEventListener("DOMContentLoaded", function () {

    const reviewTrack = document.querySelector(".review-track");
    const reviews = document.querySelectorAll(".review-track > .review");
    const reviewDots = document.querySelectorAll(".review-dots span");


    console.log("Review track:", reviewTrack);
    console.log("Reviews:", reviews.length);
    console.log("Review dots:", reviewDots.length);

    if (!reviewTrack || reviews.length === 0 || reviewDots.length === 0) {
        console.error("Review HTML not found. Please check your HTML.");
        return;
    }

    let currentReview = 0;


    function showReview(index) {

    
        if (index < 0) {
            index = reviews.length - 1;
        }

        if (index >= reviews.length) {
            index = 0;
        }

        currentReview = index;

     
        reviewTrack.style.transform =
            "translateX(-" + (currentReview * 100) + "%)";

        reviewDots.forEach(function (dot, i) {
            if (i === currentReview) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });

        console.log("Showing review:", currentReview + 1);
    }

    reviewDots.forEach(function (dot, index) {

        dot.style.cursor = "pointer";

        dot.addEventListener("click", function () {
            showReview(index);
        });

    });


    let startX = 0;

    reviewTrack.addEventListener("touchstart", function (event) {
        startX = event.touches[0].clientX;
    }, { passive: true });

    reviewTrack.addEventListener("touchend", function (event) {
        const endX = event.changedTouches[0].clientX;
        const distance = startX - endX;

        if (distance > 50) {
            showReview(currentReview + 1);
        } else if (distance < -50) {
            showReview(currentReview - 1);
        }
    });


    let mouseStartX = 0;
    let isDragging = false;

    reviewTrack.addEventListener("mousedown", function (event) {
        mouseStartX = event.clientX;
        isDragging = true;
    });

    document.addEventListener("mouseup", function (event) {
        if (!isDragging) {
            return;
        }

        isDragging = false;

        const distance = mouseStartX - event.clientX;

        if (distance > 50) {
            showReview(currentReview + 1);
        } else if (distance < -50) {
            showReview(currentReview - 1);
        }
    });

    showReview(0);

});
