/* =====================================================
   MOBILE MENU
===================================================== */

const mobileToggle = document.getElementById("mobileToggle");
const mainNav = document.getElementById("mainNav");

if (mobileToggle && mainNav) {
    mobileToggle.addEventListener("click", () => {
        document.body.classList.toggle("menu-open");
        mainNav.classList.toggle("active");
        mobileToggle.classList.toggle("active");
    });

    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            document.body.classList.remove("menu-open");
            mainNav.classList.remove("active");
            mobileToggle.classList.remove("active");
        });
    });
}


/* =====================================================
   STAT COUNTERS
===================================================== */

const counters = document.querySelectorAll(".counter");

const startCounter = counter => {

    const target = Number(counter.dataset.target);

    let current = 0;

    const duration = 1800;
    const startTime = performance.now();

    function updateCounter(time) {

        const progress = Math.min(
            (time - startTime) / duration,
            1
        );

        const easedProgress =
            1 - Math.pow(1 - progress, 3);

        current = Math.floor(
            easedProgress * target
        );

        counter.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    }

    requestAnimationFrame(updateCounter);
};


const counterObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                startCounter(entry.target);

                counterObserver.unobserve(
                    entry.target
                );

            }

        });

    },
    {
        threshold: 0.5
    }
);


counters.forEach(counter => {
    counterObserver.observe(counter);
});



/* =====================================================
   GENERIC HORIZONTAL DRAG / TOUCH SCROLL
===================================================== */

function makeDraggable(selector) {

    const slider = document.querySelector(selector);

    if (!slider) return;

    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    slider.addEventListener(
        "pointerdown",
        event => {

            isDown = true;

            slider.setPointerCapture(event.pointerId);

            startX = event.clientX;
            startScroll = slider.scrollLeft;

            slider.classList.add("dragging");

        }
    );


    slider.addEventListener(
        "pointermove",
        event => {

            if (!isDown) return;

            const distance =
                event.clientX - startX;

            slider.scrollLeft =
                startScroll - distance;

        }
    );


    const stopDragging = () => {

        isDown = false;

        slider.classList.remove("dragging");

    };


    slider.addEventListener(
        "pointerup",
        stopDragging
    );

    slider.addEventListener(
        "pointercancel",
        stopDragging
    );

    slider.addEventListener(
        "pointerleave",
        stopDragging
    );

}


//* AUTO-SCROLLING CAROUSELS ===================================================== //*

function autoScrollSlider(selector, speed = 0.35) {

    const slider = document.querySelector(selector);

    if (!slider) return;

    function move() {

        slider.scrollLeft += speed;

        if (
            slider.scrollLeft + slider.clientWidth >=
            slider.scrollWidth - 2
        ) {
            slider.scrollLeft = 0;
        }

        requestAnimationFrame(move);
    }

    requestAnimationFrame(move);
}


autoScrollSlider(".services-slider", 0.35);
autoScrollSlider(".delivery-track-wrapper", 0.35);
autoScrollSlider(".projects-track-wrapper", 0.3);
autoScrollSlider(".reviews-track-wrapper", 0.3);


/* =====================================================
   START AUTO SLIDERS
===================================================== */

autoScrollSlider(
    ".brands-section",
    0.45
);

autoScrollSlider(
    ".services-slider",
    0.35
);

autoScrollSlider(
    ".delivery-track-wrapper",
    0.35
);

autoScrollSlider(
    ".projects-track-wrapper",
    0.3
);

autoScrollSlider(
    ".reviews-track-wrapper",
    0.3
);



/* =====================================================
   CONSULTATION FORM
===================================================== */

const consultationForm =
    document.getElementById(
        "consultationForm"
    );


if (consultationForm) {

    consultationForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const formData =
                new FormData(
                    consultationForm
                );


            const name =
                formData.get("name");

            const phone =
                formData.get("phone");

            const email =
                formData.get("email");

            const project =
                formData.get("project");

            const message =
                formData.get("message");


            const subject =
                encodeURIComponent(
                    "New Cynosure Construction Consultation"
                );


            const body =
                encodeURIComponent(
`New Consultation Request

Name: ${name}

Phone: ${phone}

Email: ${email}

Project Type: ${project}

Project Details:
${message}`
                );


            /*
             * Opens the user's email client.
             * The message is already prepared.
             */

            window.location.href =
                `mailto:info@cynosureconstruction.com?subject=${subject}&body=${body}`;

        }
    );

}



/* =====================================================
   BACK TO TOP
===================================================== */

const backToTop =
    document.getElementById(
        "backToTop"
    );


if (backToTop) {

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 600) {

                backToTop.classList.add(
                    "show"
                );

            } else {

                backToTop.classList.remove(
                    "show"
                );

            }

        }
    );

}



/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */

const header =
    document.querySelector(
        ".site-header"
    );


if (header) {

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 50) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

        }
    );

}



/* =====================================================
   SMOOTH INTERNAL LINKS
===================================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });
    
window.addEventListener("load", () => {

    const loadingScreen =
        document.getElementById("loadingScreen");

    setTimeout(() => {
        loadingScreen.classList.add("loaded");
    }, 1800);

});