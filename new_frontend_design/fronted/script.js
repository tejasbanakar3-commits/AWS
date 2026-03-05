document.addEventListener('DOMContentLoaded', () => {
    // 1. Elegant spotlight glow effect on the main card following the mouse
    const card = document.querySelector('.main-container');
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Update custom variables for CSS radial-gradient
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });

    // 2. Language Toggle
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            langBtns.forEach(b => {
                b.classList.remove('active');
                b.classList.add('inactive');
            });
            btn.classList.add('active');
            btn.classList.remove('inactive');
            
            // Subtle animation feedback
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // 3. Button Click Ripple/Glow Effect
    const generateBtn = document.querySelector('.generate-btn');
    generateBtn.addEventListener('click', function(e) {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});
