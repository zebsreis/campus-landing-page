document.addEventListener("DOMContentLoaded", () => {
    initGspLettersAnimation();
    initClickAndDragTestimonialsInertia();
    initMoreFeaturesSectionAnimation();
    initLenisSmoothScroll();
    initFooterSpacingCalcs();
    initButtonMagneticEffect();
});

function initGspLettersAnimation() {
    let typeSplit = new SplitType("[text-split]", {
        types: "words, chars",
        tagName: "span"
    });

    function createScrollTrigger(triggerElement, timeline) {
        ScrollTrigger.create({
            trigger: triggerElement,
            start: "top bottom",
            onLeaveBack: () => {
                timeline.progress(0);
                timeline.pause();
            }
        });
        ScrollTrigger.create({
            trigger: triggerElement,
            start: "top 60%",
            onEnter: () => timeline.play()
        });
    }

    document.querySelectorAll("[letters-slide-up]").forEach((element) => {
        let tl = gsap.timeline({ paused: true });
        tl.from(element.querySelectorAll(".char"), {
            yPercent: 100,
            duration: 0.8,
            ease: "power1.out",
            stagger: { amount: 0.2 }
        });
        createScrollTrigger(element, tl);
    });

    gsap.set("[text-split]", { opacity: 1 });
}

function initClickAndDragTestimonialsInertia() {
    const ele = document.getElementById('clickanddrag');
    let lastX, velocityX = 0, inertiaInterval = null;

    if (window.innerWidth > 768) {
        ele.style.overflowX = 'hidden';

        ele.addEventListener('mousedown', function (e) {
            clearInterval(inertiaInterval);
            lastX = e.clientX;
            ele.style.userSelect = 'none';

            document.onmousemove = e => {
                const dx = e.clientX - lastX;
                lastX = e.clientX;
                ele.scrollLeft -= dx;
                velocityX = dx;
            };

            document.onmouseup = () => {
                document.onmousemove = document.onmouseup = null;
                ele.style.removeProperty('user-select');

                inertiaInterval = setInterval(() => {
                    ele.scrollLeft -= velocityX;
                    velocityX *= 0.95;
                    if (Math.abs(velocityX) < 0.1) clearInterval(inertiaInterval);
                }, 10);
            };
        });
    }
}

function initMoreFeaturesSectionAnimation() {
    const div = document.getElementById('more-features');
    let animationInProgress = false;
    let currentInterval;

    document.getElementById('show-more-features').addEventListener('click', () => {
        if (animationInProgress) {
            clearInterval(currentInterval);
        }
        animationInProgress = true;

        let targetHeight = div.scrollHeight;
        let step = targetHeight / 50;

        if (div.style.maxHeight === '0px' || div.style.maxHeight === '') {
            let currentHeight = 0;
            currentInterval = setInterval(() => {
                currentHeight += step;
                div.style.maxHeight = currentHeight + 'px';
                if (currentHeight >= targetHeight) {
                    clearInterval(currentInterval);
                    div.style.maxHeight = targetHeight + 'px';
                    animationInProgress = false;
                }
            }, 10);
        } else {
            let currentHeight = parseInt(div.style.maxHeight, 10);
            currentInterval = setInterval(() => {
                currentHeight -= step;
                div.style.maxHeight = currentHeight + 'px';
                if (currentHeight <= 0) {
                    clearInterval(currentInterval);
                    div.style.maxHeight = '0';
                    animationInProgress = false;
                }
            }, 10);
        }
    });
}

function initLenisSmoothScroll() {
    const lenis = new Lenis({
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
        console.log({ scroll, limit, velocity, direction, progress });
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}

function initFooterSpacingCalcs() {
    const footer = document.getElementById('footer');
    const footerSpacing = document.getElementById('footer-spacing');

    function adjustFooterSpacing() {
        const footerHeight = footer.offsetHeight;
        footerSpacing.style.height = footerHeight + 'px';
    }

    adjustFooterSpacing();
    window.addEventListener('resize', adjustFooterSpacing);
}

function initButtonMagneticEffect() {
    const buttons = document.querySelectorAll('.button');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const x = e.clientX - centerX;
            const y = e.clientY - centerY;

            const distanceX = x / (rect.width / 2);
            const distanceY = y / (rect.height / 2);

            const moveX = distanceX * 10;
            const moveY = distanceY * 10;

            const distanceToCenter = Math.sqrt(x * x + y * y);
            const maxDistance = Math.sqrt((rect.width / 2) * (rect.width / 2) + (rect.height / 2) * (rect.height / 2));
            const normalizedDistance = distanceToCenter / maxDistance;

            const maxTilt = 5;
            let rotation = normalizedDistance * maxTilt;
            if (x > 0 && y < 0) {
                rotation = -rotation;
            } else if (x < 0 && y > 0) {
                rotation = -rotation;
            }

            button.style.transform = `translate(${moveX}px, ${moveY}px) rotateZ(${rotation}deg)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0px, 0px) rotateZ(0deg)';
        });
    });
}
