class Carousel {
    constructor() {
        this.carouselTrack = document.querySelector('.carousel-track');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.prevBtn = document.querySelector('.carousel-btn-prev');
        this.nextBtn = document.querySelector('.carousel-btn-next');
        this.indicators = document.querySelectorAll('.indicator');
        this.currentIndex = 1; // Start with second slide as center
        this.slideCount = this.slides.length;
        this.autoSlideInterval = null;
        
        this.init();
    }
    
    init() {
        // Event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        this.startAutoSlide();
        
        this.carouselTrack.parentElement.addEventListener('mouseenter', () => {
            this.stopAutoSlide();
        });
        
        this.carouselTrack.parentElement.addEventListener('mouseleave', () => {
            this.startAutoSlide();
        });
        
        this.enableSwipe();
        this.updateCarousel();
    }
    
    updateCarousel() {
        // CORRECT CENTERING CALCULATION
        const slideWidth = 33.33; // Each slide takes 33.33% of container
        const visibleSlides = 3;
        
        // Calculate the offset to center the active slide
        // For 3 slides visible, we want the active slide in the middle (position 1 of 0,1,2)
        const offset = (visibleSlides - 1) / 2; // This equals 1 (middle position)
        const transformValue = (this.currentIndex - offset) * -slideWidth;
        
        this.carouselTrack.style.transform = `translateX(${transformValue}%)`;
        
        // Update active states
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
        
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    nextSlide() {
        // Allow sliding until the last slide can be centered
        if (this.currentIndex < this.slideCount - 1) {
            this.currentIndex++;
        } else {
            // If at the end, you can choose to loop or stop
            this.currentIndex = 0; // Loop back to beginning (optional)
        }
        this.updateCarousel();
    }
    
    prevSlide() {
        // Allow sliding until the first slide can be centered
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            // If at the beginning, you can choose to loop or stop
            this.currentIndex = this.slideCount - 1; // Loop to end (optional)
        }
        this.updateCarousel();
    }
    
    goToSlide(index) {
        // Ensure the index can be properly centered
        // The index should allow for one slide on left and one on right when possible
        if (index >= 1 && index <= this.slideCount - 2) {
            this.currentIndex = index;
        } else if (index === 0) {
            this.currentIndex = 1; // Adjust first slide to second position
        } else if (index === this.slideCount - 1) {
            this.currentIndex = this.slideCount - 2; // Adjust last slide to second last position
        }
        this.updateCarousel();
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
    
    enableSwipe() {
        let startX = 0;
        let endX = 0;
        const minSwipeDistance = 50;
        
        this.carouselTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.carouselTrack.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX, minSwipeDistance);
        });
        
        this.carouselTrack.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            document.addEventListener('mouseup', handleMouseUp);
        });
        
        const handleMouseUp = (e) => {
            endX = e.clientX;
            this.handleSwipe(startX, endX, minSwipeDistance);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }
    
    handleSwipe(startX, endX, minSwipeDistance) {
        const swipeDistance = Math.abs(endX - startX);
        
        if (swipeDistance > minSwipeDistance) {
            if (endX < startX) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
});