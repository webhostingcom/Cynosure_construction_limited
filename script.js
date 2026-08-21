/* =====================================================
   CYNOSURE CONSTRUCTION
   MAIN JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       LOADING SCREEN
    ================================================= */

    const loadingScreen =
        document.getElementById("loadingScreen");

    if (loadingScreen) {

        window.addEventListener("load", () => {

            setTimeout(() => {
                loadingScreen.classList.add("loaded");
            }, 1000);

        });

    }


    /* =================================================
       MOBILE MENU
    ================================================= */

    const mobileToggle =
        document.getElementById("mobileToggle");

    const mainNav =
        document.getElementById("mainNav");


    if (mobileToggle && mainNav) {

        mobileToggle.addEventListener("click", () => {

            const opened =
                mainNav.classList.toggle("active");

            mobileToggle.classList.toggle(
                "active",
                opened
            );

            document.body.classList.toggle(
                "menu-open",
                opened
            );

            mobileToggle.setAttribute(
                "aria-expanded",
                String(opened)
            );

        });


        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("active");

                mobileToggle.classList.remove("active");

                document.body.classList.remove(
                    "menu-open"
                );

                mobileToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =================================================
       HERO VIDEO
    ================================================= */

    const heroVideo =
        document.getElementById("heroVideo");


    if (heroVideo) {

        heroVideo.muted = true;
        heroVideo.playsInline = true;

        heroVideo.play().catch(() => {});

    }


    /* =================================================
       CYNOSURE TEXT VIDEO
    ================================================= */

    const cynosureVideo =
        document.getElementById(
            "cynosureTextVideo"
        );

    const cynosureCanvas =
        document.getElementById(
            "cynosureTextCanvas"
        );


    if (
        cynosureVideo &&
        cynosureCanvas
    ) {

        const ctx =
            cynosureCanvas.getContext("2d");


        let animationStarted = false;


        function resizeCynosureCanvas() {

            const rect =
                cynosureCanvas.getBoundingClientRect();

            const ratio =
                window.devicePixelRatio || 1;


            cynosureCanvas.width =
                rect.width * ratio;

            cynosureCanvas.height =
                rect.height * ratio;


            ctx.setTransform(
                ratio,
                0,
                0,
                ratio,
                0,
                0
            );

        }


        function drawCynosureVideo() {

            const width =
                cynosureCanvas.clientWidth;

            const height =
                cynosureCanvas.clientHeight;


            if (!width || !height) {

                requestAnimationFrame(
                    drawCynosureVideo
                );

                return;

            }


            ctx.clearRect(
                0,
                0,
                width,
                height
            );


            /* -----------------------------------------
               TEXT MASK
            ----------------------------------------- */

            ctx.save();


            const fontSize =
                Math.min(
                    width * 0.17,
                    175
                );


            ctx.font =
                `700 ${fontSize}px "DM Sans", sans-serif`;

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillStyle = "#000";


            ctx.fillText(
                "CYNOSURE",
                width / 2,
                height / 2
            );


            /* -----------------------------------------
               KEEP VIDEO ONLY INSIDE TEXT
            ----------------------------------------- */

            ctx.globalCompositeOperation =
                "source-in";


            if (
                cynosureVideo.readyState >= 2 &&
                cynosureVideo.videoWidth &&
                cynosureVideo.videoHeight
            ) {

                const videoWidth =
                    cynosureVideo.videoWidth;

                const videoHeight =
                    cynosureVideo.videoHeight;


                const videoRatio =
                    videoWidth / videoHeight;

                const canvasRatio =
                    width / height;


                let drawWidth;
                let drawHeight;
                let offsetX;
                let offsetY;


                if (
                    videoRatio > canvasRatio
                ) {

                    drawHeight = height;

                    drawWidth =
                        height * videoRatio;

                    offsetX =
                        (width - drawWidth) / 2;

                    offsetY = 0;

                } else {

                    drawWidth = width;

                    drawHeight =
                        width / videoRatio;

                    offsetX = 0;

                    offsetY =
                        (height - drawHeight) / 2;

                }


                ctx.drawImage(
                    cynosureVideo,
                    offsetX,
                    offsetY,
                    drawWidth,
                    drawHeight
                );

            }


            ctx.restore();


            requestAnimationFrame(
                drawCynosureVideo
            );

        }


        function startCynosureVideo() {

            resizeCynosureCanvas();

            cynosureVideo.play()
                .catch(() => {});


            if (!animationStarted) {

                animationStarted = true;

                requestAnimationFrame(
                    drawCynosureVideo
                );

            }

        }


        cynosureVideo.addEventListener(
            "loadeddata",
            startCynosureVideo
        );


        window.addEventListener(
            "resize",
            resizeCynosureCanvas
        );


        if (
            cynosureVideo.readyState >= 2
        ) {

            startCynosureVideo();

        }

    }


    /* =================================================
       NUMBER COUNTERS
    ================================================= */

    const counters =
        document.querySelectorAll(
            ".stat-number"
        );


    function startCounter(counter) {

        const target =
            Number(
                counter.dataset.target
            );


        if (!Number.isFinite(target)) {
            return;
        }


        const duration = 1600;

        const start =
            performance.now();


        function update(currentTime) {

            const progress =
                Math.min(
                    (currentTime - start) /
                    duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const value =
                Math.floor(
                    target * eased
                );


            counter.textContent =
                value;


            if (progress < 1) {

                requestAnimationFrame(
                    update
                );

            } else {

                counter.textContent =
                    target;

            }

        }


        requestAnimationFrame(update);

    }


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
                    threshold: 0.5
                }
            );


        counters.forEach(counter => {

            counterObserver.observe(
                counter
            );

        });

    }


    /* =================================================
       AUTOMATIC HORIZONTAL MOVEMENT
    ================================================= */

    function autoMoveCards(
        selector,
        speed = 0.3
    ) {

        const wrapper =
            document.querySelector(selector);


        if (!wrapper) {
            return;
        }


        let position = 0;

        let lastTime =
            performance.now();


        function animate(currentTime) {

            const delta =
                currentTime - lastTime;


            lastTime =
                currentTime;


            const maxScroll =
                wrapper.scrollWidth -
                wrapper.clientWidth;


            if (maxScroll <= 0) {

                requestAnimationFrame(
                    animate
                );

                return;

            }


            position +=
                speed *
                (delta / 16.67);


            /*
             * Reset to beginning.
             */

            if (
                position >= maxScroll
            ) {

                position = 0;

            }


            wrapper.scrollLeft =
                position;


            requestAnimationFrame(
                animate
            );

        }


        requestAnimationFrame(
            animate
        );

    }


    /* =================================================
       SERVICES
    ================================================= */

    autoMoveCards(
        ".services-section .horizontal-wrapper",
        0.32
    );


    /* =================================================
       PROCESS
    ================================================= */

    autoMoveCards(
        ".process-section .horizontal-wrapper",
        0.30
    );


    /* =================================================
       PROJECTS
    ================================================= */

    autoMoveCards(
        ".projects-section .horizontal-wrapper",
        0.25
    );


    /* =================================================
       TESTIMONIALS
    ================================================= */

    autoMoveCards(
        ".testimonials-section .horizontal-wrapper",
        0.25
    );


    /* =================================================
       SUBSIDIARIES — LOGO TRACK
    ================================================= */

    const subsidiaryTrack =
        document.querySelector(
            ".subsidiaries-track"
        );


    if (subsidiaryTrack) {

        let position = 0;

        let lastTime =
            performance.now();


        function moveSubsidiaryLogos(
            currentTime
        ) {

            const delta =
                currentTime - lastTime;


            lastTime =
                currentTime;


            position +=
                0.35 *
                (delta / 16.67);


            const halfWidth =
                subsidiaryTrack.scrollWidth / 2;


            if (
                position >= halfWidth
            ) {

                position = 0;

            }


            subsidiaryTrack.style.transform =
                `translate3d(-${position}px, 0, 0)`;


            requestAnimationFrame(
                moveSubsidiaryLogos
            );

        }


        requestAnimationFrame(
            moveSubsidiaryLogos
        );

    }


    /* =================================================
       GOLD CARD TAP / TOUCH EFFECT
    ================================================= */

    const interactiveCards =
        document.querySelectorAll(
            `
            .service-card,
            .process-card,
            .project-card,
            .why-card,
            .testimonial-card,
            .ownership-card,
            .help-option
            `
        );


    interactiveCards.forEach(card => {

        card.addEventListener(
            "pointerdown",
            () => {

                card.classList.add(
                    "card-active"
                );

            }
        );


        card.addEventListener(
            "pointerup",
            () => {

                setTimeout(() => {

                    card.classList.remove(
                        "card-active"
                    );

                }, 450);

            }
        );


        card.addEventListener(
            "pointercancel",
            () => {

                card.classList.remove(
                    "card-active"
                );

            }
        );

    });


    /* =================================================
       GALLERY
    ================================================= */

const galleryImages = [

    "assets/gallery-1.jpg",
    "assets/gallery-2.jpg",
    "assets/gallery-3.jpg",
    "assets/gallery-4.jpg",
    "assets/gallery-5.jpg",
    "assets/gallery-6.jpg",
    "assets/gallery-7.jpg",
    "assets/gallery-8.jpg",
    "assets/gallery-9.jpg",
    "assets/gallery-10.jpg",
    "assets/gallery-11.jpg",
    "assets/gallery-12.jpg",
    "assets/gallery-13.jpg",
    "assets/gallery-14.jpg",
    "assets/gallery-15.jpg",
    "assets/gallery-16.jpg",
    "assets/gallery-17.jpg",
    "assets/gallery-18.jpg",
    "assets/gallery-19.jpg",
    "assets/gallery-20.jpg",
    "assets/gallery-21.jpg",
    "assets/gallery-22.jpg",
    "assets/gallery-23.jpg",
    "assets/gallery-24.jpg",
    "assets/gallery-25.jpg",
    "assets/gallery-26.jpg",
    "assets/gallery-27.jpg",
    "assets/gallery-28.jpg",
    "assets/gallery-29.jpg",
    "assets/gallery-30.jpg"
];


    let currentGallery = 0;


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

        if (!galleryImage) {
            return;
        }


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


        /*
         * Small fade effect.
         */

        galleryImage.style.opacity = "0";


        setTimeout(() => {

            galleryImage.src =
                galleryImages[
                    currentGallery
                ];


            galleryImage.style.opacity = "1";

        }, 180);


        if (galleryCounter) {

            galleryCounter.textContent =
                `${currentGallery + 1} / ${galleryImages.length}`;

        }

    }


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


    showGalleryImage(0);


    /* =================================================
       ENQUIRY FORM
    ================================================= */

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


                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.textContent =
                        "SENDING...";

                }


                try {

                    /*
                     * Replace YOUR_FORM_ID
                     * with your real Formspree ID.
                     */

                    const response =
                        await fetch(
                            "https://formspree.io/f/mvkpwwwo",
                            {
                                method: "POST",

                                body: formData,

                                headers: {
                                    Accept:
                                        "application/json"
                                }
                            }
                        );


                    if (!response.ok) {

                        throw new Error(
                            "Form submission failed"
                        );

                    }


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


                } catch (error) {

                    console.error(
                        "Form error:",
                        error
                    );


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


                setTimeout(() => {

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                    }

                }, 3000);

            }
        );

    }


    /* =================================================
       HEADER SCROLL EFFECT
    ================================================= */

    const header =
        document.querySelector(
            ".site-header"
        );


    function updateHeader() {

        if (!header) {
            return;
        }


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


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();


    /* =================================================
       BACK TO TOP
    ================================================= */

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

            },
            {
                passive: true
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


    /* =================================================
       WHATSAPP FLOATING BUTTON
    ================================================= */

    const whatsappButton =
        document.querySelector(
            ".whatsapp-float"
        );


    if (whatsappButton) {

        whatsappButton.addEventListener(
            "click",
            event => {

                /*
                 * Replace the number in the
                 * HTML href with the real
                 * Cynosure WhatsApp number.
                 */

                if (
                    !whatsappButton.getAttribute(
                        "href"
                    )
                ) {

                    event.preventDefault();

                }

            }
        );

    }


    /* =================================================
       SMOOTH INTERNAL LINKS
    ================================================= */

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


    /* =================================================
       GALLERY IMAGE TRANSITION
    ================================================= */

    if (galleryImage) {

        galleryImage.style.transition =
            "opacity 0.18s ease";

    }


    /* =================================================
       VIDEO VISIBILITY
    ================================================= */

    const videos =
        document.querySelectorAll(
            "video"
        );


    videos.forEach(video => {

        video.addEventListener(
            "visibilitychange",
            () => {

                if (
                    document.hidden
                ) {

                    video.pause();

                } else {

                    video.play()
                        .catch(() => {});

                }

            }
        );

    });


    /* =================================================
       PAGE READY
    ================================================= */

    document.body.classList.add(
        "page-ready"
    );

});

document
    .querySelectorAll(".project-card")
    .forEach(card => {

        card.addEventListener("click", () => {

            const destination =
                card.getAttribute("href");

            if (destination) {
                window.location.href = destination;
            }

        });

    });
