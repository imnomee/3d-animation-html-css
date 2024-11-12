// Wait for the window to load before executing the function
window.addEventListener('load', () => {
    // Get the canvas element and set up the 2D drawing context
    const canvas = document.getElementById('scrollCanvas');
    const context = canvas.getContext('2d');

    // Set canvas size to match the window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Array to hold the image URLs
    const imageUrls = [];
    for (let i = 1; i <= 300; i++) {
        // Format the index to ensure it has leading zeros (e.g., '0001', '0002', etc.)
        const formattedIndex = String(i).padStart(4, '0');
        console.log(formattedIndex); // Log the formatted index for debugging
        imageUrls.push(`./male${formattedIndex}.png`); // Push the formatted image path to the array
    }

    // Array to store loaded image objects
    const images = [];
    let imagesLoaded = 0; // Counter for loaded images

    // Load each image and store it in the images array
    imageUrls.forEach((url, index) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            images[index] = img; // Store the image at the correct index
            imagesLoaded++; // Increment the counter for loaded images

            // Check if all images have been loaded
            if (imagesLoaded === imageUrls.length) {
                drawOnScroll(); // Initial drawing on scroll when all images are ready
            }
        };
    });

    // Function to draw images based on scroll position
    const drawOnScroll = () => {
        // Get the current scroll position
        const scrollTop = document.documentElement.scrollTop;
        // Calculate the maximum scrollable height
        const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;
        // Calculate the fraction of the scroll position
        const scrollFraction = scrollTop / maxScroll;

        // Determine the image index based on the scroll fraction
        const imageIndex = Math.min(
            Math.floor(scrollFraction * images.length),
            images.length - 1 // Ensure the index stays within bounds
        );

        // Clear the canvas before drawing the new image
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the image if it's available at the calculated index
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

    // Add an event listener for scrolling to trigger the draw function
    window.addEventListener('scroll', drawOnScroll);

    // Initial call to draw the first image when the page loads
    drawOnScroll();
});
