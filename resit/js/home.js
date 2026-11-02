document.addEventListener("DOMContentLoaded", function () {

    const text = document.querySelector(".hidden-marquee .explorehidden");

    if (text) {
        let position = window.innerWidth;

        function moveText() {
            position -= 1;

            if (position < -text.offsetWidth) {
                position = window.innerWidth;
            }

            text.style.transform = `translateX(${position}px)`;

            requestAnimationFrame(moveText);
        }

        moveText();
    }

});