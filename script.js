window.addEventListener('load', () => {
    const splash = document.getElementById('splash-screen');
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const aboutBtn = document.getElementById('about-btn');
    const aboutModal = document.getElementById('about-modal');
    const closeBtn = document.querySelector('.close-btn');
    const glitchText = document.querySelector('.glitch');
    let hasInteracted = false;

    const showMainContent = (skipAnimation) => {
        if (splash.style.opacity !== '0') {
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.style.display = 'none';
                header.style.opacity = '1';
                main.style.opacity = '1';
                document.body.style.overflow = 'auto';
            }, skipAnimation ? 0 : 1000);
        }
    };

    if (window.location.hash === '#main-content') {
        showMainContent(true);
    } else {
        // Auto-transition after 1.2s if no interaction
        const splashTimeout = setTimeout(() => {
            if (!hasInteracted) {
                showMainContent(false);
            }
        }, 1200);

        // Handle text hover and click
        glitchText.addEventListener('mouseover', () => {
            hasInteracted = true;
        });

        glitchText.addEventListener('click', () => {
            hasInteracted = true;
            clearTimeout(splashTimeout);
            showMainContent(false);
        });

        // Handle general splash screen click
        splash.addEventListener('click', (event) => {
            if (event.target !== glitchText) {
                hasInteracted = true;
                clearTimeout(splashTimeout);
                showMainContent(false);
            }
        });
    }

    aboutBtn.addEventListener('click', () => {
        aboutModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        aboutModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == aboutModal) {
            aboutModal.style.display = 'none';
        }
    });
});