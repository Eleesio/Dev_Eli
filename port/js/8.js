const movingImage = document.getElementById('poster_bg');
const movingTextTop = document.getElementById('bg-text-top');
const movingTextBottom = document.getElementById('bg-text-btm');

function handleMouseMove(e) {
    const windowWidth = window.innerWidth;
    const currentPositionX = e.clientX || e.touches[0].clientX;
    const cursorPositionPercentage = 5 * currentPositionX / windowWidth;
    movingImage.style.transform = `translate(${-cursorPositionPercentage}%, 0%)`;
    movingTextTop.style.transform = `translate(${-cursorPositionPercentage}%, 0%)`;
    movingTextBottom.style.transform = `translate(${cursorPositionPercentage}%, 0%)`;
}

function handleTouchMove(e) {
    const windowWidth = window.innerWidth;
    const currentPositionX = e.touches[0].clientX;
    const cursorPositionPercentage = 5 * currentPositionX / windowWidth;
    movingImage.style.transform = `translate(${-cursorPositionPercentage}%, 0%)`;
    movingTextTop.style.transform = `translate(${-cursorPositionPercentage}%, 0%)`;
    movingTextBottom.style.transform = `translate(${cursorPositionPercentage}%, 0%)`;
}

if (window.innerWidth <= 767) {
    document.addEventListener('touchmove', handleTouchMove);
} else {
    document.addEventListener('mousemove', handleMouseMove);
}

const eyes = document.querySelectorAll('.eye');

document.addEventListener('mousemove', (event) => {
    eyes.forEach((eye) => {
        const pupil = eye.querySelector('.pupil');
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const deltaX = event.clientX - eyeCenterX;
        const deltaY = event.clientY - eyeCenterY;
        const distance = Math.hypot(deltaX, deltaY);

        const maxDistance = (eyeRect.width - pupil.clientWidth) / 2;

        const ratio = Math.min(distance / maxDistance, 1);

        const angle = Math.atan2(deltaY, deltaX);
        const pupilX = ratio * maxDistance * Math.cos(angle);
        const pupilY = ratio * maxDistance * Math.sin(angle);

        pupil.style.transform = `translate(-50%, -50%) translate(${pupilX}px, ${pupilY}px)`;
    });
});