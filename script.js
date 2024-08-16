document.getElementById('themeToggle').addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
});

document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
});

document.getElementById('menuToggle').addEventListener('click', function () {
    const navbar = document.getElementById('navbar').querySelector('ul');
    navbar.classList.toggle('active');
});

document.getElementById('generateApiKey').addEventListener('click', function () {
    fetch('/generate-api-key', {
        method: 'POST',
    })
        .then(response => response.json())
        .then(data => {
            const apiKeyDisplay = document.getElementById('apiKeyDisplay');
            apiKeyDisplay.innerHTML = `Your API Key: <strong>${data.api_key}</strong>`;
            apiKeyDisplay.style.opacity = '0';
            setTimeout(() => {
                apiKeyDisplay.style.opacity = '1';
            }, 100);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('apiKeyDisplay').innerHTML = 'Error generating API key';
        });
});
