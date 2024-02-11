<!-- GSP Letters start -->
<script src="https://unpkg.com/split-type"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/ScrollTrigger.min.js"></script>
<script>
window.addEventListener("DOMContentLoaded", (event) => {
  // Split text into spans
  let typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span"
  });

  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      }
    });
    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 60%",
      onEnter: () => timeline.play()
    });
  }

  $("[letters-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), { yPercent: 100, duration: 0.8, ease: "power1.out", stagger: { amount: 0.2 } });
    createScrollTrigger($(this), tl);
  });

  // Avoid flash of unstyled content
  gsap.set("[text-split]", { opacity: 1 });
});
</script>
<!-- GSP Letters finish -->

<script> 
// Click and Drag Testemonials Inertia Snippet
document.addEventListener('DOMContentLoaded', function() {
    const ele = document.getElementById('clickanddrag');
    let lastX, velocityX = 0, inertiaInterval = null;

    if (window.innerWidth > 768) {
        ele.style.overflowX = 'hidden';

        ele.addEventListener('mousedown', function(e) {
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
});
</script>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the section as hidden
    var div = document.getElementById('more-features');
    div.style.maxHeight = '0px'; // Ensure the section starts hidden

    var animationInProgress = false;
    var currentInterval;

    document.getElementById('show-more-features').addEventListener('click', function() {
      if (animationInProgress) {
        clearInterval(currentInterval); // Clear the ongoing animation if the button is clicked again
      }
      animationInProgress = true; // Set the flag to indicate an animation is in progress

      var targetHeight = div.scrollHeight; // The full height of the content
      var step = targetHeight / 50; // Determine the step size
      
      if (div.style.maxHeight === '0px' || div.style.maxHeight === '') {
        // Expand the div
        let currentHeight = 0;
        currentInterval = setInterval(function() {
          currentHeight += step;
          div.style.maxHeight = currentHeight + 'px';
          if (currentHeight >= targetHeight) {
            clearInterval(currentInterval);
            div.style.maxHeight = targetHeight + 'px'; // Use exact targetHeight for max-height
            animationInProgress = false; // Reset the flag
          }
        }, 10);
      } else {
        // Collapse the div
        let currentHeight = parseInt(div.style.maxHeight, 10);
        currentInterval = setInterval(function() {
          currentHeight -= step;
          div.style.maxHeight = currentHeight + 'px';
          if (currentHeight <= 0) {
            clearInterval(currentInterval);
            div.style.maxHeight = '0'; // Ensure div collapses fully
            animationInProgress = false; // Reset the flag
          }
        }, 10);
      }
    });
});
</script>

<!-- Lenis Smooth Scroll -->

<script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@0.2.28/bundled/lenis.js"></script>
<script>
const lenis = new Lenis({
  duration: 2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
  direction: 'vertical', // vertical, horizontal
  gestureDirection: 'vertical', // vertical, horizontal, both
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

//get scroll value
lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
  console.log({ scroll, limit, velocity, direction, progress })
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
</script>
<!-- end of lenis scrool -->

<!-- footer spacing calcs -->
<script>
function adjustFooterSpacing() {
    var footer = document.getElementById('footer');
    var footerSpacing = document.getElementById('footer-spacing');

    // Get the height of the footer
    var footerHeight = footer.offsetHeight;

    // Set the height of the footer-spacing div to match the footer
    footerSpacing.style.height = footerHeight + 'px';
}

// Adjust the footer spacing on initial load
adjustFooterSpacing();

// Adjust the footer spacing whenever the window is resized
window.addEventListener('resize', adjustFooterSpacing);
</script>

<!-- Button magnetic -->

<script>
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.button');

    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const x = e.clientX - centerX;
            const y = e.clientY - centerY;

            // Calculate distances from the center
            const distanceX = x / (rect.width / 2); // Normalized -1 to 1
            const distanceY = y / (rect.height / 2); // Normalized -1 to 1

            // Magnetic effect calculations
            const moveX = distanceX * 10; // Moves -10px to 10px on the X axis
            const moveY = distanceY * 10; // Moves -10px to 10px on the Y axis

            // Gradual tilt effect calculation
            // Calculate proportional rotation based on the cursor's distance to the center
            const distanceToCenter = Math.sqrt(x * x + y * y);
            const maxDistance = Math.sqrt((rect.width / 2) * (rect.width / 2) + (rect.height / 2) * (rect.height / 2));
            const normalizedDistance = distanceToCenter / maxDistance;

            // Determine the maximum tilt angle
            const maxTilt = 5; // Maximum tilt in degrees
            let rotation = normalizedDistance * maxTilt; // Adjust tilt based on normalized distance

            // Adjust rotation direction based on quadrant
            if (x > 0 && y < 0) { // Top right quadrant
                rotation = -rotation;
            } else if (x < 0 && y > 0) { // Bottom left quadrant
                rotation = -rotation;
            }

            // Apply combined effects with proportional rotation
            this.style.transform = `translate(${moveX}px, ${moveY}px) rotateZ(${rotation}deg)`;
        });

        button.addEventListener('mouseleave', function(e) {
            // Reset the button orientation and position
            this.style.transform = 'translate(0px, 0px) rotateZ(0deg)';
        });
    });
});
</script>