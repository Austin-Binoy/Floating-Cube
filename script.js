const cube = document.querySelector('.cube');
const scene = document.querySelector('.scene');
let isDragging = false;
let startX, startY;
let currentX = 0;
let currentY = 0;
let scale = 1;
let startDistance = 0;
let initialScale = 1;

function onMouseDown(e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    document.body.style.cursor = 'grabbing';
}

function onMouseMove(e) {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    currentX -= deltaY * 0.1;
    currentY += deltaX * 0.1;
    cube.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
    startX = e.clientX;
    startY = e.clientY;
}

function onMouseUp() {
    isDragging = false;
    document.body.style.cursor = 'grab';
}

function onTouchStart(e) {
    if (e.touches.length === 1) {
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
        isDragging = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        startDistance = Math.sqrt(dx * dx + dy * dy);
        initialScale = scale;
    }
}

function onTouchMove(e) {
    e.preventDefault(); // Prevent scrolling on touch
    if (e.touches.length === 1 && isDragging) {
        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;
        currentX -= deltaY * 0.1;
        currentY += deltaX * 0.1;
        cube.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const newDistance = Math.sqrt(dx * dx + dy * dy);
        const scaleChange = newDistance / startDistance;
        scale = initialScale * scaleChange;
        scale = Math.min(Math.max(.5, scale), 2);
        scene.style.transform = `scale(${scale})`;
        startDistance = newDistance;
    }
}

function onTouchEnd() {
    isDragging = false;
}

function onWheel(e) {
    e.preventDefault();
    scale += e.deltaY * -0.005;
    scale = Math.min(Math.max(.5, scale), 2);
    scene.style.transform = `scale(${scale})`;
}

document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseup', onMouseUp);
document.addEventListener('wheel', onWheel);
document.addEventListener('touchstart', onTouchStart);
document.addEventListener('touchmove', onTouchMove);
document.addEventListener('touchend', onTouchEnd);

// Prevent touchmove from causing the page to scroll
document.body.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, { passive: false });
