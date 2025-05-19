document.addEventListener('DOMContentLoaded', function() {
    //Random Movie function
    const randomMovieBtn = document.querySelector('a[href="#Random"]');
    if (randomMovieBtn) {
        randomMovieBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showRandomMovie();
        });
    }
    
    // Card flipping function
    initializeCards();
    
    // Heart icon function
    initializeHeartIcons();
    initializeFAQ();
});

// Initialize all cards including any that might be added dynamically
function initializeCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.removeEventListener('click', handleCardClick);
        card.addEventListener('click', handleCardClick);
    });
}

// Card click handler
function handleCardClick(e) {
    // Don't flip if clicking on the heart icon
    if (!e.target.classList.contains('heart-icon') && !e.target.closest('.heart-icon')) {
        this.classList.toggle('is-flipped');
    }
}

// Initialize heart icons including any that might be added dynamically
function initializeHeartIcons() {
    const heartIcons = document.querySelectorAll('.heart-icon');
    heartIcons.forEach(icon => {
        icon.removeEventListener('click', handleHeartClick);
        icon.addEventListener('click', handleHeartClick);
    });
}

// Heart icon click handler
function handleHeartClick(e) {
    e.stopPropagation(); 
    this.classList.toggle('liked');
}

// Initialize FAQ section
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle active state
            item.classList.toggle('active');
        });
    });
}

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Show random movie function
function showRandomMovie() {
    const movies = [
        { 
            title: "URI", 
            image: "./images/URI.webp"
        },
        { 
            title: "La La Land", 
            image: "./images/La  la Land.jpg"
        },
        { 
            title: "Yeh jawani hai deewani", 
            image: "./images/YJHD.webp"
        },
        { 
            title: "DDLJ", 
            image: "./images/DDLJ.jpg"
        }
    ];
    
    // Select a random movie
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    
    // Create random movie container if it doesn't exist
    let randomMovieContainer = document.getElementById('random-movie-container');
    if (!randomMovieContainer) {
        randomMovieContainer = document.createElement('div');
        randomMovieContainer.id = 'random-movie-container';
        document.body.appendChild(randomMovieContainer);
    }
    
    // Create the card with a random entry position
    const entryPoint = getRandomEntryPoint();
    
    // Build the card HTML
    randomMovieContainer.innerHTML = `
        <div class="card" id="RomanticCard">
            <div class="close-button">✕</div>
            <i class="heart-icon"></i>
            <div class="cardFront">
                <img src="${randomMovie.image}" alt="${randomMovie.title}" class="movie_poster">
                <h3>${randomMovie.title}</h3>
            </div>
        </div>
    `;
    
    // Start the card animation
    setTimeout(() => {
        const card = randomMovieContainer.querySelector('.card');
        card.style.transform = 'scale(1)';
        
        // Setup event listeners for the random movie card
        setupRandomMovieCard(card);
        
        // Setup close button
        const closeButton = card.querySelector('.close-button');
        closeButton.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card from flipping
            closeRandomMovie();
        });
    }, 100);
}

// Close the random movie card
function closeRandomMovie() {
    const container = document.getElementById('random-movie-container');
    if (container) {
        // Add a fade-out animation
        container.style.opacity = '0';
        setTimeout(() => {
            container.remove();
        }, 300);
    }
}

// Generate random entry point from outside the viewport
function getRandomEntryPoint() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Choose a random side (0: top, 1: right, 2: bottom, 3: left)
    const side = Math.floor(Math.random() * 4);
    
    let x, y;
    
    switch(side) {
        case 0: // top
            x = Math.random() * viewportWidth - 160;
            y = -500;
            break;
        case 1: // right
            x = viewportWidth + 500;
            y = Math.random() * viewportHeight - 240;
            break;
        case 2: // bottom
            x = Math.random() * viewportWidth - 160;
            y = viewportHeight + 500;
            break;
        case 3: // left
            x = -500;
            y = Math.random() * viewportHeight - 240;
            break;
    }
    
    return { x, y };
}

// Setup event listeners for the random movie card
function setupRandomMovieCard(card) {
    // Card flipping
    card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('heart-icon') && 
            !e.target.closest('.heart-icon') && 
            !e.target.classList.contains('close-button') && 
            !e.target.closest('.close-button')) {
            this.classList.toggle('is-flipped');
        }
    });
    
    // Heart icon
    const heartIcon = card.querySelector('.heart-icon');
    heartIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('liked');
    });
}
