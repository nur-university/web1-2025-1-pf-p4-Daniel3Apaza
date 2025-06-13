const departamentos = {
    'LP': 'La Paz', 'SC': 'Santa Cruz', 'CB': 'Cochabamba',
    'OR': 'Oruro', 'PT': 'Potosí', 'TJ': 'Tarija',
    'CH': 'Chuquisaca', 'BN': 'Beni', 'PD': 'Pando'
};
function loadHeader() {
    return fetch('../Inicio/Inicio.html')
        .then(res => res.text())
        .then(html => {
            const temp = document.createElement('div');
            temp.innerHTML = html;
            const header = temp.querySelector('header');
            document.getElementById('header-container').appendChild(header);

            const headerCss = document.createElement('link');
            headerCss.rel = 'stylesheet';
            headerCss.href = '../Inicio/inicio.css';
            document.head.appendChild(headerCss);

            return new Promise((resolve) => {
                const headerJs = document.createElement('script');
                headerJs.src = '../Inicio/Inicio.js';
                headerJs.onload = () => {
                    if (typeof initHeader === 'function') {
                        initHeader();
                    }
                    resolve();
                };
                document.body.appendChild(headerJs);
            });
        });
}

// Detalles del Anuncio 
function displayAnuncioDetails(anuncio) {
    const detalleContainer = document.getElementById('anuncio-detalle');

    let direccionCompleta = "Ubicación no especificada";
    if (anuncio.ubicacion) {
        const deptoNombre = departamentos[anuncio.ubicacion.departamento] || anuncio.ubicacion.departamento;
        direccionCompleta = `${anuncio.ubicacion.direccion}, ${deptoNombre}`;
    } else if (anuncio.departamento && anuncio.direccion) {
        const deptoNombre = departamentos[anuncio.departamento] || anuncio.departamento;
        direccionCompleta = `${anuncio.direccion}, ${deptoNombre}`;
    }

    detalleContainer.innerHTML = `
        <div class="botones">
            <a href="#"><i class='bx bxs-user'></i></a>
            <p class="Usuario">${anuncio.usuario || "Usuario Ejemplo"}</p>
            <div class="heart-container" onclick="event.stopPropagation()">
                <input type="checkbox" id="heart1" class="heart-checkbox">
                <i class='bx bxs-heart heart-icon'></i>
            </div>
                <a href="../chat/chat.html"><button class="chart">Chat</button></a>
        </div>
        <div class="producto">
            <div class="imagen-contenedor">
                <img src="/img/${anuncio.fotoPrincipal.split('/').pop()}" alt="${anuncio.titulo}">
            </div>
            <span class="precio">Bs ${anuncio.precio || "0.00"}</span>
            <h1 class="titulo">${anuncio.titulo || "Sin título"}</h1>
            <p class="categoria">${anuncio.categoria || "Categoría no especificada"}</p>
            <p class="descripcion">${anuncio.descripcion || "No hay descripción disponible."}</p>
            <p class="ubicacion">${direccionCompleta}</p>
        </div>
    `;

    const heartCheckbox = document.querySelector('.heart-checkbox');
    if (heartCheckbox) {
        heartCheckbox.addEventListener('change', () => {
            console.log('Favorito:', heartCheckbox.checked);
        });
    }

    const chatButton = document.querySelector('.chart');
    if (chatButton) {
        chatButton.addEventListener('click', () => {
            console.log('Iniciar chat con:', anuncio.usuario);
        });
    }
}

//  Inicialización 
document.addEventListener('DOMContentLoaded', function () {
    loadHeader().then(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const anuncioId = urlParams.get('id');

        if (!anuncioId) {
            window.location.href = '/Index.html';
            return;
        }

        const anuncios = JSON.parse(localStorage.getItem('anuncios')) || [];
        const anuncio = anuncios.find(a => a.id == anuncioId);

        if (!anuncio) {
            document.querySelector('.main_container').innerHTML = `
                <div class="error-message">
                    <p>No se encontró el anuncio solicitado.</p>
                    <a href="Index.html">Volver a publicaciones</a>
                </div>
            `;
            return;
        }

        displayAnuncioDetails(anuncio);
    });
});

