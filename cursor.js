const dot = document.getElementById('dot');
const outline = document.getElementById('outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    outline.animate(
        {
            left: `${posX}px`,
            top: `${posY}px`,
        },
        { duration: 1000, fill: 'forwards' }
    );
});
