/* ==================================================
   MOBILE NAVIGATION
================================================== */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        const icon = menuBtn.querySelector("i");

        if (icon) {

            if (navMenu.classList.contains("open")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });

}


/* ==================================================
   NAVIGATION LINKS
================================================== */

const navLinks =
    document.querySelectorAll(".nav-link");


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (navMenu) {

            navMenu.classList.remove("open");

        }

        if (menuBtn) {

            const icon =
                menuBtn.querySelector("i");

            if (icon) {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }

    });

});


/* ==================================================
   TYPING ANIMATION
================================================== */

const typingElement =
    document.querySelector(".typing-text");


const typingWords = [
    "Developer",
    "AI Enthusiast",
    "Full-Stack Learner",
    "Creative Technologist",
    "Problem Solver"
];


let typingWordIndex = 0;

let typingCharacterIndex = 0;

let typingDeleting = false;


function typingAnimation() {

    if (!typingElement) {
        return;
    }


    const currentWord =
        typingWords[typingWordIndex];


    if (!typingDeleting) {

        typingElement.textContent =
            currentWord.substring(
                0,
                typingCharacterIndex + 1
            );

        typingCharacterIndex++;


        if (
            typingCharacterIndex ===
            currentWord.length
        ) {

            typingDeleting = true;

            setTimeout(
                typingAnimation,
                1500
            );

            return;

        }

    } else {

        typingElement.textContent =
            currentWord.substring(
                0,
                typingCharacterIndex - 1
            );

        typingCharacterIndex--;


        if (typingCharacterIndex === 0) {

            typingDeleting = false;

            typingWordIndex++;


            if (
                typingWordIndex >=
                typingWords.length
            ) {

                typingWordIndex = 0;

            }

        }

    }


    const typingSpeed =
        typingDeleting
            ? 55
            : 90;


    setTimeout(
        typingAnimation,
        typingSpeed
    );

}


typingAnimation();


/* ==================================================
   ACTIVE NAVIGATION ON SCROLL
================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 180;


    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;


        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        const target =
            link.getAttribute("href");


        if (
            target ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* ==================================================
   SMOOTH SCROLLING
================================================== */

navLinks.forEach(link => {

    link.addEventListener(
        "click",
        function(event) {

            const targetId =
                this.getAttribute("href");


            if (
                !targetId ||
                !targetId.startsWith("#")
            ) {

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


            const navbar =
                document.querySelector(
                    ".navbar"
                );


            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;


            const targetPosition =
                target.offsetTop -
                navbarHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        }
    );

});


/* ==================================================
   SCROLL REVEAL
================================================== */

const revealElements =
    document.querySelectorAll(
        `
        .section-heading,
        .about-text,
        .info-card,
        .semester-card,
        .skill-category,
        .education-card,
        .project-card,
        .achievement-card,
        .certificate-item,
        .volunteer-box,
        .contact-box
        `
    );


if (revealElements.length > 0) {

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "revealed"
                        );


                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -40px 0px"
            }

        );


    revealElements.forEach(element => {

        element.classList.add(
            "reveal"
        );

        revealObserver.observe(
            element
        );

    });

}


/* ==================================================
   PROJECT CARD 3D HOVER
================================================== */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const rotateX =
                ((y - rect.height / 2) /
                    rect.height) * -3;


            const rotateY =
                ((x - rect.width / 2) /
                    rect.width) * 3;


            card.style.transform =
                `
                perspective(800px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-8px)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* ==================================================
   CERTIFICATE GALLERY
================================================== */

const certificateButtons =
    document.querySelectorAll(
        ".view-certificate"
    );


const certificateModal =
    document.getElementById(
        "certificateModal"
    );


const certificateModalImage =
    document.getElementById(
        "certificateModalImage"
    );


const certificateModalTitle =
    document.getElementById(
        "certificateModalTitle"
    );


const certificateClose =
    document.getElementById(
        "certificateClose"
    );


/* ==================================================
   OPEN CERTIFICATE
================================================== */

certificateButtons.forEach(button => {

    button.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            const image =
                button.getAttribute(
                    "data-image"
                );


            const title =
                button.getAttribute(
                    "data-title"
                );


            if (
                !certificateModal ||
                !certificateModalImage
            ) {

                return;

            }


            certificateModalImage.src =
                image || "";


            certificateModalImage.alt =
                title ||
                "Certificate Preview";


            if (certificateModalTitle) {

                certificateModalTitle.textContent =
                    title ||
                    "Certificate";

            }


            certificateModal.classList.add(
                "active"
            );


            document.body.style.overflow =
                "hidden";

        }
    );

});


/* ==================================================
   CLOSE CERTIFICATE
================================================== */

function closeCertificateModal() {

    if (!certificateModal) {

        return;

    }


    certificateModal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";


    setTimeout(() => {

        if (certificateModalImage) {

            certificateModalImage.src = "";

        }

    }, 350);

}


/* ==================================================
   CLOSE BUTTON
================================================== */

if (certificateClose) {

    certificateClose.addEventListener(
        "click",
        event => {

            event.preventDefault();

            closeCertificateModal();

        }
    );

}


/* ==================================================
   CLOSE WHEN CLICKING OUTSIDE IMAGE
================================================== */

if (certificateModal) {

    certificateModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                certificateModal
            ) {

                closeCertificateModal();

            }

        }
    );

}


/* ==================================================
   ESCAPE KEY
================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            certificateModal &&
            certificateModal.classList.contains(
                "active"
            )
        ) {

            closeCertificateModal();

        }

    }
);


/* ==================================================
   CERTIFICATE IMAGE ERROR HANDLING
================================================== */

if (certificateModalImage) {

    certificateModalImage.addEventListener(
        "error",
        () => {

            certificateModalImage.alt =
                "Certificate image could not be loaded";

        }
    );

}


/* ==================================================
   PROFILE IMAGE FALLBACK
================================================== */

const profileImage =
    document.querySelector(
        ".profile-image"
    );


if (profileImage) {

    profileImage.addEventListener(
        "error",
        () => {

            profileImage.style.display =
                "none";


            const wrapper =
                document.querySelector(
                    ".profile-image-wrapper"
                );


            if (wrapper) {

                wrapper.classList.add(
                    "image-error"
                );

            }

        }
    );

}


/* ==================================================
   SCROLL TO TOP BUTTON
================================================== */

const scrollTopButton =
    document.createElement(
        "button"
    );


scrollTopButton.innerHTML =
    '<i class="fa-solid fa-arrow-up"></i>';


scrollTopButton.className =
    "scroll-top-btn";


scrollTopButton.setAttribute(
    "aria-label",
    "Scroll to top"
);


document.body.appendChild(
    scrollTopButton
);


/* ==================================================
   SHOW / HIDE SCROLL TOP
================================================== */

window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 500
        ) {

            scrollTopButton.classList.add(
                "show"
            );

        } else {

            scrollTopButton.classList.remove(
                "show"
            );

        }

    }
);


/* ==================================================
   SCROLL TO TOP
================================================== */

scrollTopButton.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* ==================================================
   AUTOMATIC COPYRIGHT YEAR
================================================== */

const copyright =
    document.querySelector(
        ".copyright"
    );


if (copyright) {

    const currentYear =
        new Date().getFullYear();


    copyright.innerHTML =
        `© ${currentYear} Sivasankar L.
        Built with HTML, CSS & JavaScript.`;

}


/* ==================================================
   PAGE LOADED
================================================== */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );


        updateActiveNavigation();

    }
);