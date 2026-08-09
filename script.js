/* =====================================================
   CYNOSURE CONSTRUCTION
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   LOADING SCREEN
===================================================== */

window.addEventListener("load", () => {

    const loadingScreen =
        document.getElementById("loadingScreen");

    if (!loadingScreen) return;

    setTimeout(() => {
        loadingScreen.classList.add("loaded");
    }, 1400);

});


/* =====================================================
   MOBILE MENU
===================================================== */

const mobileToggle =
    document.getElementById("mobileToggle");

const mainNav =
    document.getElementById("mainNav");

if (mobileToggle && mainNav) {

    mobileToggle.addEventListener("click", () => {

        document.body.classList.toggle("menu-open");

        mainNav.classList.toggle("active");

        mobileToggle.classList.toggle("active");


        const isOpen =
            mainNav.classList.contains("active");

        mobileToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    mainNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            document.body.classList.remove(
                "menu-open"
            );

            mainNav.classList.remove("active");

            mobileToggle.classList.remove("active");


            mobileToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =====================================================
   HERO VIDEO
===================================================== */

const heroVideo =
    document.querySelector(".hero-video");

if (heroVideo) {

    heroVideo.muted = true;

    heroVideo.setAttribute("playsinline", "");

    heroVideo.play().catch(() => {

        /*
         * Some mobile browsers block autoplay.
         * The video remains available and can
         * start when the browser allows it.
         */

    });

}


/* =====================================================
   STAT COUNTERS
===================================================== */

const counters =
    document.querySelectorAll(".stat-number");


function startCounter(counter) {

    const target =
        Number(counter.dataset.target);

    if (isNaN(target)) return;

    const duration = 1800;

    const startTime =
        performance.now();


    function updateCounter(currentTime) {

        const progress =
            Math.min(
                (currentTime - startTime) /
                duration,
                1
            );


        /*
         * Smooth ease-out animation
         */

        const eased =
            1 - Math.pow(
                1 - progress,
                3
            );


        const value =
            Math.floor(
                eased * target
            );


        counter.textContent = value;


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            counter.textContent = target;

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


/* COUNTER OBSERVER */

if (counters.length) {

    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        startCounter(
                            entry.target
                        );

                        counterObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.45
            }
        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

}


/* =====================================================
   AUTOMATIC HORIZONTAL CARDS
===================================================== */

function autoMoveCards(selector, speed) {

    const wrapper =
        document.querySelector(selector);

    if (!wrapper) return;


    let animationId;


    function move() {

        /*
         * Move the cards automatically.
         */

        wrapper.scrollLeft += speed;


        /*
         * When we reach the end,
         * start again from the beginning.
         */

        if (
            wrapper.scrollLeft +
            wrapper.clientWidth >=
            wrapper.scrollWidth - 2
        ) {

            wrapper.scrollLeft = 0;

        }


        animationId =
            requestAnimationFrame(move);

    }


    animationId =
        requestAnimationFrame(move);


    /*
     * Pause automatic movement while
     * the user is touching the card area.
     */

    wrapper.addEventListener(
        "pointerdown",
        () => {

            cancelAnimationFrame(
                animationId
            );

        }
    );


    wrapper.addEventListener(
        "pointerup",
        () => {

            animationId =
                requestAnimationFrame(move);

        }
    );


    wrapper.addEventListener(
        "pointercancel",
        () => {

            animationId =
                requestAnimationFrame(move);

        }
    );

}


/*
 * SERVICES
 */

autoMoveCards(
    ".services-section .horizontal-wrapper",
    0.28
);


/*
 * PROCESS
 */

autoMoveCards(
    ".process-section .horizontal-wrapper",
    0.28
);


/*
 * PROJECTS
 */

autoMoveCards(
    ".projects-section .horizontal-wrapper",
    0.24
);


/*
 * TESTIMONIALS
 */

autoMoveCards(
    ".testimonials-section .horizontal-wrapper",
    0.24
);


/* =====================================================
   GALLERY
===================================================== */

const galleryImages = [

    "assets/gallery-1.jpg",
    "assets/gallery-2.jpg",
    "assets/gallery-3.jpg"

];


let currentGallery =
    0;


const galleryImage =
    document.getElementById(
        "galleryImage"
    );


const galleryCounter =
    document.getElementById(
        "galleryCounter"
    );


const galleryPrev =
    document.getElementById(
        "galleryPrev"
    );


const galleryNext =
    document.getElementById(
        "galleryNext"
    );


function showGalleryImage(index) {

    if (!galleryImage) return;


    /*
     * Keep the number between 0 and 2.
     */

    if (index < 0) {

        currentGallery =
            galleryImages.length - 1;

    } else if (
        index >= galleryImages.length
    ) {

        currentGallery = 0;

    } else {

        currentGallery = index;

    }


    galleryImage.src =
        galleryImages[currentGallery];


    if (galleryCounter) {

        galleryCounter.textContent =
            `${currentGallery + 1} / ${galleryImages.length}`;

    }

}


/*
 * PREVIOUS
 */

if (galleryPrev) {

    galleryPrev.addEventListener(
        "click",
        () => {

            showGalleryImage(
                currentGallery - 1
            );

        }
    );

}


/*
 * NEXT
 */

if (galleryNext) {

    galleryNext.addEventListener(
        "click",
        () => {

            showGalleryImage(
                currentGallery + 1
            );

        }
    );

}


/*
 * Start with gallery photo 1.
 */

showGalleryImage(0);


/* =====================================================
   ENQUIRY FORM
===================================================== */

const consultationForm =
    document.getElementById(
        "consultationForm"
    );


const enquiryMessage =
    document.getElementById(
        "formSuccess"
    );


if (consultationForm) {

    consultationForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const submitButton =
                consultationForm.querySelector(
                    ".submit-button"
                );


            const formData =
                new FormData(
                    consultationForm
                );


            /*
             * Disable button while sending.
             */

            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "SENDING...";

            }


            /*
             * IMPORTANT:
             *
             * This sends the enquiry to the
             * form service instead of opening
             * the visitor's Gmail application.
             *
             * Replace YOUR_FORM_ID with your
             * actual Formspree form ID.
             */

            try {

                const response =
                    await fetch(
                        "https://formspree.io/f/YOUR_FORM_ID",
                        {
                            method: "POST",

                            body: formData,

                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                if (response.ok) {

                    consultationForm.reset();


                    if (enquiryMessage) {

                        enquiryMessage.textContent =
                            "Thank you. Your enquiry has been sent successfully.";

                        enquiryMessage.classList.add(
                            "show"
                        );

                    }


                    if (submitButton) {

                        submitButton.textContent =
                            "ENQUIRY SENT ✓";

                    }


                } else {

                    throw new Error(
                        "Unable to send enquiry."
                    );

                }


            } catch (error) {

                if (enquiryMessage) {

                    enquiryMessage.textContent =
                        "Something went wrong. Please try again.";

                    enquiryMessage.classList.add(
                        "show"
                    );

                }


                if (submitButton) {

                    submitButton.textContent =
                        "SEND ENQUIRY";

                }

            }


            /*
             * Re-enable button.
             */

            setTimeout(() => {

                if (submitButton) {

                    submitButton.disabled =
                        false;

                }

            }, 3000);

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

            if (
                window.scrollY > 500
            ) {

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


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

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

            if (
                window.scrollY > 40
            ) {

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
                    link.getAttribute(
                        "href"
                    );


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
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


/* =====================================================
   END
===================================================== */