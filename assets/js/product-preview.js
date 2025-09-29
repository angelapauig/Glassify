// Get all the necessary elements from the DOM
const mainImage = document.getElementById('main-product-image');
const prevBtn = document.querySelector('.slider-controls .prev');
const nextBtn = document.querySelector('.slider-controls .next');
const imageCountDisplay = document.querySelector('.image-count');

// Store the image paths in an array
const images = [
    '/Assets/img/glass-window.jpg',
    '/Assets/img/glass-window2.jpg', // Replace with your second image path
    '/Assets/img/glass-window3.jpg'  // Replace with your third image path
];

let currentImageIndex = 0;

// Function to update the image and count display
function updateSlider() {
    mainImage.src = images[currentImageIndex];
    imageCountDisplay.textContent = `${currentImageIndex + 1}/${images.length}`;
}

// Event listener for the "Next" button
nextBtn.addEventListener('click', () => {
    // Increment the index, but loop back to the start if we reach the end
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateSlider();
});

// Event listener for the "Previous" button
prevBtn.addEventListener('click', () => {
    // Decrement the index, but loop back to the end if we go below 0
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateSlider();
});

// Initial call to set the correct image and count
updateSlider();