function loadHeader() {
    return new Promise((resolve) => {
        const cssId = 'header-styles-' + Date.now();
        const fontsToLoad = [
            { 
                url: 'https://fonts.googleapis.com/icon?family=Material+Icons',
                id: 'material-icons'
            },
            { 
                url: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined',
                id: 'material-symbols'
            },
            { 
                url: '../Inicio/inicio.css',
                id: cssId 
            }
        ];

        let loadedFonts = 0;
        
        fontsToLoad.forEach(font => {
            const existing = document.getElementById(font.id);
            if (existing) existing.remove();

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = font.url;
            link.id = font.id;
            
            link.onload = () => {
                loadedFonts++;
                if (loadedFonts === fontsToLoad.length) {
                    loadHeaderHtml().then(resolve);
                }
            };
            
            link.onerror = () => {
                console.error(`Error al cargar: ${font.url}`);
                loadedFonts++;
                if (loadedFonts === fontsToLoad.length) {
                    loadHeaderHtml().then(resolve);
                }
                
                if (font.id === cssId) {
                    const fallbackStyles = document.createElement('style');
                    fallbackStyles.id = 'header-fallback-styles';
                    fallbackStyles.textContent = `
                        #header-container header {
                            background-color: #ffffff !important;
                            color: #333333 !important;
                        }
                        #header-container .logo h1 {
                            color: #1a73e8 !important;
                            font-size: 24px !important;
                        }
                    `;
                    document.head.appendChild(fallbackStyles);
                }
            };
            
            document.head.appendChild(link);
        });

        if (fontsToLoad.length === 0) {
            loadHeaderHtml().then(resolve);
        }
    });
}

function loadHeaderHtml() {
    return fetch('../Inicio/Inicio.html?' + new Date().getTime()) 
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.text();
        })
        .then(html => {
            const temp = document.createElement('div');
            temp.innerHTML = html;
            const header = temp.querySelector('header');
            
            if (!header) throw new Error('No se encontró el elemento header');
            
            const container = document.getElementById('header-container');
            container.innerHTML = '';
            container.appendChild(header.cloneNode(true));
            
            setTimeout(() => {
                container.style.display = 'none';
                container.offsetHeight; 
                container.style.display = '';
            }, 50);
            
            return loadHeaderScript();
        })
        .catch(error => {
            console.error('Error al cargar el header:', error);
            createFallbackHeader();
            return Promise.resolve();
        });
}

function loadHeaderScript() {
    return new Promise((resolve) => {
        const oldScript = document.querySelector('script[src="../Inicio/Inicio.js"]');
        if (oldScript) oldScript.remove();

        const headerJs = document.createElement('script');
        headerJs.src = '../Inicio/Inicio.js?' + new Date().getTime();
        headerJs.onload = () => {
            if (typeof initHeader === 'function') initHeader();
            resolve();
        };
        headerJs.onerror = () => {
            console.error('Error al cargar Inicio.js');
            resolve();
        };
        document.body.appendChild(headerJs);
    });
}

function createFallbackHeader() {
    const fallbackHTML = `
        <header style="
            background: #ffffff !important;
            color: #333333 !important;
            padding: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        ">
            <div class="container top-nav" style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                max-width: 1200px;
                margin: 0 auto;
            ">
                <a href="/Index.html" class="logo" style="
                    text-decoration: none;
                    color: #1a73e8 !important;
                ">
                    <h1 style="
                        margin: 0;
                        font-size: 24px !important;
                        font-weight: bold;
                    ">AVO</h1>
                </a>
            </div>
        </header>
    `;
    
    document.getElementById('header-container').innerHTML = fallbackHTML;
}

document.addEventListener('DOMContentLoaded', function () {
    loadHeader().then(() => {
        loadAnuncios();

        const container = document.querySelector('.mensajes_noti');

        container.addEventListener('click', function (e) {
            const item = e.target.closest('.imagen_precio');
            if (item && window.innerWidth <= 767) {
                console.log('Anuncio clickeado:', item); 

                document.querySelector('.main_container').classList.add('show-chat');

                if (!document.getElementById('back-button')) {
                    const backButton = document.createElement('button');
                    backButton.id = 'back-button';
                    backButton.innerHTML = '← Volver';
                    backButton.style.position = 'fixed';
                    backButton.style.top = '70px';
                    backButton.style.left = '10px';
                    backButton.style.zIndex = '100';
                    backButton.style.padding = '5px 10px';
                    backButton.style.border = 'none';
                    backButton.style.background = '#f5f5f5';
                    backButton.style.borderRadius = '5px';

                    backButton.addEventListener('click', function () {
                        document.querySelector('.main_container').classList.remove('show-chat');
                        this.remove();
                    });

                    document.body.appendChild(backButton);
                }
            }
        });

        document.querySelector('.inicio')?.addEventListener('click', function (e) {
            if (document.querySelector('.main_container').classList.contains('show-chat')) {
                e.preventDefault();
                document.querySelector('.main_container').classList.remove('show-chat');
                const backBtn = document.getElementById('back-button');
                if (backBtn) backBtn.remove();
            }
        });
    });
});

document.querySelectorAll('.imagen_precio').forEach(item => {
    item.style.cursor = 'pointer'; 
    item.addEventListener('click', function () {
        console.log('¡Click funcionando en:', this);
        document.querySelector('.main_container').classList.add('show-chat');

        if (!document.getElementById('back-button')) {
            const backButton = document.createElement('button');
            backButton.id = 'back-button';
            backButton.innerHTML = '← Volver';
            backButton.style.position = 'fixed';
            backButton.style.top = '25%';
            backButton.style.left = '10px';
            backButton.style.zIndex = '100';
            backButton.style.padding = '5px 10px';
            backButton.style.border = 'none';
            backButton.style.background = '#f5f5f5';
            backButton.style.borderRadius = '5px';

            backButton.addEventListener('click', function () {
                document.querySelector('.main_container').classList.remove('show-chat');
                this.remove();
            });

            document.body.appendChild(backButton);
        }
    });
});



