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
            }, 1400);
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

            const isOpen =
                mainNav.classList.toggle("active");

            mobileToggle.classList.toggle(
                "active",
                isOpen
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

            mobileToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });


        mainNav
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    mainNav.classList.remove("active");

                    mobileToggle.classList.remove(
                        "active"
                    );

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

        const playHeroVideo = () => {

            const promise =
                heroVideo.play();

            if (promise !== undefined) {
                promise.catch(() => {
                    // Browser blocked autoplay.
                });
            }

        };

        playHeroVideo();

        heroVideo.addEventListener(
            "loadeddata",
            playHeroVideo
        );

    }


    /* =================================================
       STAT COUNTERS
    ================================================= */

    const counters =
        document.querySelectorAll(
            ".stat-number[data-target]"
        );

    function startCounter(counter) {

        const target =
            Number(counter.dataset.target);

        if (!Number.isFinite(target)) {
            return;
        }

        const duration = 1800;
        const startTime = performance.now();

        function updateCounter(currentTime) {

            const progress =
                Math.min(
                    (currentTime - startTime) /
                    duration,
                    1
                );

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


    /* =================================================
       AUTOMATIC HORIZONTAL SLIDERS
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
        let lastTime = performance.now();

        function animate(currentTime) {

            const delta =
                currentTime - lastTime;

            lastTime = currentTime;

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

            if (position >= maxScroll) {
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
       GALLERY
    ================================================= */

    const galleryImages = [
        "assets/gallery-1.jpg",
        "assets/gallery-2.jpg",
        "assets/gallery-3.jpg"
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


        galleryImage.style.opacity = "0";


        setTimeout(() => {

            galleryImage.src =
                galleryImages[currentGallery];

            galleryImage.onload = () => {

                galleryImage.style.opacity = "1";

            };

        }, 150);


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

                    submitButton.disabled = true;

                    submitButton.textContent =
                        "SENDING...";

                }


                /*
                 * IMPORTANT
                 *
                 * Replace YOUR_FORM_ID
                 * with your real Formspree ID.
                 */

                const formEndpoint =
                    "https://formspree.io/f/YOUR_FORM_ID";


                try {

                    const response =
                        await fetch(
                            formEndpoint,
                            {
                                method: "POST",

                                body: formData,

                                headers: {
                                    "Accept":
                                        "application/json"
                                }
                            }
                        );


                    if (!response.ok) {
                        throw new Error(
                            "Form submission failed."
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

                        submitButton.textContent =
                            "SEND ENQUIRY";

                    }

                }, 3000);

            }
        );

    }


    /* =================================================
       BACK TO TOP
    ================================================= */

    const backToTop =
        document.getElementById(
            "backToTop"
        );


    if (backToTop) {

        const updateBackToTop =
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

            };


        window.addEventListener(
            "scroll",
            updateBackToTop,
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


        updateBackToTop();

    }


    /* =================================================
       HEADER SCROLL EFFECT
    ================================================= */

    const header =
        document.querySelector(
            ".site-header"
        );


    if (header) {

        const updateHeader =
            () => {

                header.classList.toggle(
                    "scrolled",
                    window.scrollY > 40
                );

            };


        window.addEventListener(
            "scroll",
            updateHeader,
            {
                passive: true
            }
        );


        updateHeader();

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

                        event.preventDefault();

                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =================================================
       CYNOSURE VIDEO TEXT
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
            cynosureCanvas.getContext(
                "2d"
            );


        if (!ctx) {
            return;
        }


        let animationStarted = false;


        function resizeCynosureCanvas() {

            const rect =
                cynosureCanvas.getBoundingClientRect();

            const pixelRatio =
                Math.min(
                    window.devicePixelRatio || 1,
                    2
                );


            cynosureCanvas.width =
                Math.max(
                    1,
                    Math.floor(
                        rect.width *
                        pixelRatio
                    )
                );


            cynosureCanvas.height =
                Math.max(
                    1,
                    Math.floor(
                        rect.height *
                        pixelRatio
                    )
                );


            ctx.setTransform(
                pixelRatio,
                0,
                0,
                pixelRatio,
                0,
                0
            );

        }


        function drawCynosureVideo() {

            const width =
                cynosureCanvas.clientWidth;

            const height =
                cynosureCanvas.clientHeight;


            if (
                width <= 0 ||
                height <= 0
            ) {

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


            /*
             * Draw the text mask.
             */

            ctx.save();


            const fontSize =
                Math.min(
                    width * 0.17,
                    175
                );


            ctx.font =
                `700 ${fontSize}px "DM Sans", sans-serif`;


            ctx.textAlign =
                "center";


            ctx.textBaseline =
                "middle";


            ctx.fillStyle =
                "#000";


            ctx.fillText(
                "CYNOSURE",
                width / 2,
                height / 2
            );


            /*
             * Keep only the text area.
             */

            ctx.globalCompositeOperation =
                "source-in";


            /*
             * Draw video inside
             * the CYNOSURE text.
             */

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
                    videoWidth /
                    videoHeight;


                const canvasRatio =
                    width /
                    height;


                let drawWidth;
                let drawHeight;
                let offsetX;
                let offsetY;


                if (
                    videoRatio > canvasRatio
                ) {

                    drawHeight =
                        height;

                    drawWidth =
                        height *
                        videoRatio;

                    offsetX =
                        (width -
                            drawWidth) /
                        2;

                    offsetY = 0;

                } else {

                    drawWidth =
                        width;

                    drawHeight =
                        width /
                        videoRatio;

                    offsetX = 0;

                    offsetY =
                        (height -
                            drawHeight) /
                        2;

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

            cynosureVideo.muted =
                true;

            cynosureVideo.playsInline =
                true;


            const promise =
                cynosureVideo.play();


            if (promise !== undefined) {

                promise.catch(() => {
                    // Autoplay may be blocked.
                });

            }


            resizeCynosureCanvas();


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


        cynosureVideo.addEventListener(
            "canplay",
            startCynosureVideo
        );


        window.addEventListener(
            "resize",
            resizeCynosureCanvas
        );


        /*
         * If the video is already loaded.
         */

        if (
            cynosureVideo.readyState >= 2
        ) {

            startCynosureVideo();

        } else {

            resizeCynosureCanvas();

        }

    }

});