window.addEventListener('load', () => {
    const canvas = document.getElementById('scrollCanvas');
    const context = canvas.getContext('2d');

    //set canvas size to match the window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const imageUrls = [];
    for (let i = 1; i <= 300; i++) {
        // Format the index to ensure it has leading zeros (e.g., '001', '002', etc.)
        const formattedIndex = String(i).padStart(4, '0');
        console.log(formattedIndex);
        imageUrls.push(`./male${formattedIndex}.png`);
    }

    const images = [];
    let imagesLoaded = 0;

    imageUrls.forEach((url, index) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            images[index] = img;
            imagesLoaded++;

            if (imagesLoaded === imageUrls.length) {
                drawOnScroll();
            }
        };
    });
    const drawOnScroll = () => {
        //get scroll position
        const scrollTop = document.documentElement.scrollTop;
        const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;
        const scrollFraction = scrollTop / maxScroll;

        const imageIndex = Math.min(
            Math.floor(scrollFraction * images.length),
            images.length - 1
        );

        context.clearRect(0, 0, canvas.width, canvas.height);
        if (images[imageIndex]) {
            context.drawImage(
                images[imageIndex],
                0,
                0,
                canvas.width,
                canvas.height
            );
        }
    };
    window.addEventListener('scroll', drawOnScroll);

    drawOnScroll();
});
