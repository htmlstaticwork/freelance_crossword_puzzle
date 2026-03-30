// Authentication Pages Logic

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        let currentTheme = localStorage.getItem('theme') || 
            (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);

        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            updateThemeIcon(theme);
        });
    }

    function updateThemeIcon(theme) {
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'light' ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
            lucide.createIcons();
        }
    }

    // RTL Toggle
    const rtlToggle = document.getElementById('rtl-toggle');
    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
            document.documentElement.setAttribute('dir', isRtl ? 'ltr' : 'rtl');
            rtlToggle.innerHTML = isRtl ? '<i data-lucide="languages"></i>' : '<i data-lucide="align-right"></i>';
            lucide.createIcons();
        });
    }

    // Password Visibility Toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            this.innerHTML = type === 'password' ? '<i data-lucide="eye"></i>' : '<i data-lucide="eye-off"></i>';
            lucide.createIcons();
        });
    });

    // Initialize Lucide Icons
    lucide.createIcons();
    const authForm = document.querySelector('.auth-form');
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Form submitted');
            // Add your logic here
        });
    }
});
