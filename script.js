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
    if (dropdownLink) { // This "if" check is good
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
    
    const darkVideoFile = 'images/herogif.webm';
    const lightVideoFile = 'images/herogif-light.webm';
    
    function setVideoTheme(theme) {
        if (heroVideo && heroVideoSource) { // This "if" check is good
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
        // <-- FIX: Check if themeToggle exists before changing it -->
        if (themeToggle) {
            themeToggle.checked = true;
        }
        setVideoTheme('light'); 
    } else {
        body.classList.remove('light-theme');
        // <-- FIX: Check if themeToggle exists before changing it -->
        if (themeToggle) {
            themeToggle.checked = false;
        }
        setVideoTheme('dark'); 
    }

    // <-- FIX: Check if themeToggle exists before adding a listener -->
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

        if (slides.length > 0) { // This "if" check is good
            
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
    
    // --- Portrait Lightbox ---
    const lightbox = document.getElementById('portrait-lightbox');
    
    // <-- FIX: Check if lightbox exists before running its code -->
    if (lightbox) {
        const lightboxImgMain = document.getElementById('lightbox-img-main');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const lightboxThumb1 = document.getElementById('lightbox-thumb-1');
        const lightboxThumb2 = document.getElementById('lightbox-thumb-2');
        const lightboxClose = lightbox.querySelector('.lightbox-close');
        const lightboxCTA = document.getElementById('lightbox-cta');
        
        // Helper to open lightbox for originals
        function openOriginalLightbox(card) {
            const imgFull = card.getAttribute('data-img-full');
            const imgRoom = card.getAttribute('data-img-room');
            const title = card.getAttribute('data-title') || '';
            lightboxImgMain.src = imgFull;
            lightboxCaption.textContent = title;
            lightboxThumb1.src = imgFull;
            lightboxThumb2.src = imgRoom;
            lightboxThumb1.classList.add('active');
            lightboxThumb2.classList.remove('active');
            lightbox.style.display = 'block';
        
            const isSoldOut = !!card.querySelector('.sold-out');
            if (lightboxCTA) {
                lightboxCTA.style.display = isSoldOut ? 'none' : 'inline-block';
            }
        
            lightboxThumb1.onclick = () => {
                lightboxImgMain.src = imgFull;
                lightboxThumb1.classList.add('active');
                lightboxThumb2.classList.remove('active');
            };
            lightboxThumb2.onclick = () => {
                lightboxImgMain.src = imgRoom;
                lightboxThumb2.classList.add('active');
                lightboxThumb1.classList.remove('active');
            };
        }
        
        // Helper to open lightbox for commissions
        function openCommissionLightbox(img) {
            lightboxImgMain.src = img.src;
            lightboxCaption.textContent = img.getAttribute('data-caption') || img.alt || '';
            lightboxThumb1.style.display = 'none';
            lightboxThumb2.style.display = 'none';
            lightbox.style.display = 'block';
        
            if (lightboxCTA) {
                lightboxCTA.style.display = 'none';
            }
        }
        
        // Click listeners for originals
        document.querySelectorAll('.art-card').forEach(card => {
            card.addEventListener('click', function () {
                openOriginalLightbox(card);
                lightboxThumb1.style.display = '';
                lightboxThumb2.style.display = '';
            });
        });
        
        // Click listeners for commissions
        document.querySelectorAll('.commission-grid img').forEach(img => {
            img.addEventListener('click', function () {
                openCommissionLightbox(img);
            });
        });
        
        // Close lightbox
        if (lightboxClose) {
            lightboxClose.addEventListener('click', function () {
                lightbox.style.display = 'none';
            });
        }
        // Optional: close on background click
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    } // <-- FIX: This closes the 'if (lightbox)' check

});