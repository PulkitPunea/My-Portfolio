// Theme Toggle Logic
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    themeBtn.innerText = '☀️';
} else {
    themeBtn.innerText = '🌙';
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        themeBtn.innerText = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        themeBtn.innerText = '🌙';
    }
});

// Carousel Scroll Logic
const carousel = document.getElementById('carousel');
const scrollLeftBtn = document.getElementById('scroll-left');
const scrollRightBtn = document.getElementById('scroll-right');
const scrollAmount = 300; 

scrollLeftBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

scrollRightBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

// Interactive "GET" Button Logic
function installApp(button) {
    if (button.classList.contains('loading') || button.classList.contains('installed')) {
        if(button.classList.contains('installed')) {
            alert("This is where you would link to the project's GitHub repository or live demo.");
        }
        return; 
    }

    button.classList.add('loading');
    
    setTimeout(() => {
        button.classList.remove('loading');
        button.classList.add('installed');
        button.innerText = 'OPEN';
    }, 1500); 
}