// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // --- Navigation ---
    const navSlide = () => {
        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('.nav-links');

        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            nav.classList.toggle('nav-active');
            hamburger.classList.toggle('active'); 
        });

        nav.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            hamburger.classList.remove('active');
        })
    }
    navSlide();

    
    // --- Pricing Card Toggle ---
    const priceCards = document.querySelectorAll('.price-card');
    priceCards.forEach(card => {
        const ul = card.querySelector('ul');
        if (!ul) return; 
        
        const items = ul.querySelectorAll('li');
        
        if (items.length > 5) {
            const button = document.createElement('button');
            button.className = 'toggle-features';
            button.textContent = 'View all features';
            
            ul.after(button);
            
            button.addEventListener('click', function() {
                card.classList.toggle('expanded');
                
                if (card.classList.contains('expanded')) {
                    this.textContent = 'View less';
                } else {
                    this.textContent = 'View all features';
                }
            });
        }
    });

    
    // --- Dropdown Menu Logic ---
    const dropdownLink = document.getElementById('pricing-dropdown-link');
    if (dropdownLink) {
        const dropdownLi = dropdownLink.parentElement; 

        dropdownLink.addEventListener('click', function(event) {
            if (window.innerWidth < 768) {
                event.preventDefault(); 
                dropdownLi.classList.toggle('open');
            }
        });
    }
    
    // --- Video Theme Swapper ---
    const heroVideo = document.getElementById('hero-video');
    const heroVideoSource = document.getElementById('hero-video-source');
    
    const darkVideoFile = 'images/hero.dark.webm';
    const lightVideoFile = 'images/hero.light.webm';
    
    function setVideoTheme(theme) {
        if (heroVideo && heroVideoSource) {
            if (theme === 'light') {
                heroVideoSource.setAttribute('src', lightVideoFile);
            } else {
                heroVideoSource.setAttribute('src', darkVideoFile);
            }
            heroVideo.load();
        }
    }

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        if (themeToggle) {
            themeToggle.checked = true;
        }
        setVideoTheme('light'); 
    } else {
        body.classList.remove('light-theme');
        if (themeToggle) {
            themeToggle.checked = false;
        }
        setVideoTheme('dark'); 
    }

    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                body.classList.add('light-theme');
                localStorage.setItem('theme', 'light'); 
                setVideoTheme('light'); 
            } else {
                body.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark'); 
                setVideoTheme('dark'); 
            }
        });
    }

    // --- Testimonial Slider (with Touch Support) ---
    try {
        let currentSlide = 0;
        const sliderContainer = document.querySelector(".testimonial-slider-container");
        const slides = document.querySelectorAll(".testimonial-slide");
        const dotsContainer = document.querySelector(".testimonial-dots");
        let slideInterval; 

        if (slides.length > 0) {
            
            for (let i = 0; i < slides.length; i++) {
                const dot = document.createElement("span");
                dot.classList.add("dot");
                dot.setAttribute("data-slide", i);
                
                dot.addEventListener("click", () => {
                    showSlide(i);
                    currentSlide = i;
                    resetInterval(); 
                });
                dotsContainer.appendChild(dot);
            }

            const dots = document.querySelectorAll(".dot");

            function showSlide(n) {
                if (n >= slides.length) { n = 0; }
                if (n < 0) { n = slides.length - 1; }
                
                slides.forEach(slide => slide.classList.remove("active"));
                dots.forEach(dot => dot.classList.remove("active"));
                
                slides[n].classList.add("active");
                dots[n].classList.add("active");
                currentSlide = n; 
            }

            function nextSlide() {
                showSlide(currentSlide + 1);
            }

            function prevSlide() { 
                showSlide(currentSlide - 1);
            }

            function startInterval() { 
                clearInterval(slideInterval); 
                slideInterval = setInterval(nextSlide, 5000); 
            }
            
            function resetInterval() { 
                clearInterval(slideInterval);
                startInterval();
            }

            let touchStartX = 0;
            let touchEndX = 0;

            sliderContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true }); 

            sliderContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });

            function handleSwipe() {
                const swipeThreshold = 50; 
                if (touchEndX < touchStartX - swipeThreshold) {
                    nextSlide();
                    resetInterval(); 
                }
                if (touchEndX > touchStartX + swipeThreshold) {
                    prevSlide();
                    resetInterval(); 
                }
            }
            
            showSlide(0); 
            startInterval(); 
        }

    } catch (e) {
        console.error("Testimonial slider error: ", e);
    }
    
});