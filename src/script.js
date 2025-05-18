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
});

// Initialize all cards including any that might be added dynamically
function initializeCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        // Remove any existing click event listeners
        card.removeEventListener('click', handleCardClick);
        // Add the click event listener
        card.addEventListener('click', handleCardClick);
    });
}

// Card click handler
function handleCardClick(e) {
    if (!e.target.classList.contains('heart-icon') && !e.target.closest('.heart-icon')) {
        this.classList.toggle('is-flipped');
    }
}

// Initialize heart icons including any that might be added dynamically
function initializeHeartIcons() {
    const heartIcons = document.querySelectorAll('.heart-icon');
    heartIcons.forEach(icon => {
        // Remove any existing click event listeners
        icon.removeEventListener('click', handleHeartClick);
        // Add the click event listener
        icon.addEventListener('click', handleHeartClick);
    });
}

// Heart icon click handler
function handleHeartClick(e) {
    e.stopPropagation(); 
    this.classList.toggle('liked');
    
    const likeText = this.nextElementSibling;
    likeText.classList.toggle('visible');
    
    // Hide the "Liked!" text after 2 seconds
    if (likeText.classList.contains('visible')) {
        setTimeout(() => {
            likeText.classList.remove('visible');
        }, 2000);
    }
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
        <div class="random-movie-card" style="transform: translate(${entryPoint.x}px, ${entryPoint.y}px);">
            <div class="close-button">✕</div>
            <i class="heart-icon"></i>
            <span class="like-text">Liked!</span>
            <div class="cardFront">
                <img src="${randomMovie.image}" alt="${randomMovie.title}" class="movie_poster">
                <h3>${randomMovie.title}</h3>
            </div>
        </div>
    `;
    
    // Start the card animation
    setTimeout(() => {
        const card = randomMovieContainer.querySelector('.random-movie-card');
        card.style.transform = 'translate(0, 0)';
        
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
    const likeText = card.querySelector('.like-text');
    
    heartIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('liked');
        likeText.classList.toggle('visible');
        
        if (likeText.classList.contains('visible')) {
            setTimeout(() => {
                likeText.classList.remove('visible');
            }, 2000);
        }
    });
}
