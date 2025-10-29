document.addEventListener('DOMContentLoaded', function () {

    const navSlide = () => {
        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('.nav-links');

        // START: Replacement for hamburger click listener in script.js
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent click from closing it immediately
            // Toggle Nav
            nav.classList.toggle('nav-active');
            // Animate Hamburger
            hamburger.classList.toggle('active'); 
        });
        // END: Replacement

        // Close nav when a link is clicked
        nav.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            hamburger.classList.remove('active'); // Also remove active from hamburger
        })
    }

    // Initialize AOS Animations
    AOS.init({
        duration: 1200, // Makes animations slightly longer and smoother
        once: true, // Animation happens only once
        offset: 50, // Animation triggers a little later
    });

    // Run the navigation function
    navSlide();

    let lastScrollTop = 0; // Stores the last scroll position
  const header = document.getElementById('main-header'); // Get the header
  const navbarHeight = header.offsetHeight; // Get the height of the header

  window.addEventListener('scroll', function() {
    let currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;

    // Check if scrolling down and past the header
    if (currentScrollPos > lastScrollTop && currentScrollPos > navbarHeight) {
      // Scrolling Down - Hide Header
      header.classList.add('header-hidden');
    } else {
      // Scrolling Up - Show Header
      header.classList.remove('header-hidden');
    }
    
    // Save the current scroll position for the next event
    lastScrollTop = currentScrollPos <= 0 ? 0 : currentScrollPos; // For Mobile or negative scrolling
  }, false);

});