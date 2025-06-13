function loadAnuncios() {
    const anuncios = [
        {
            id: "1",
            categoria: "Electrónica",
            titulo: "Smart TV Samsung 50 pulgadas",
            descripcion: "Televisor 4K UHD con HDR y apps integradas. Incluye control remoto y garantía de 1 año.",
            precio: "2500",
            usuario: "Juan Pérez",
            ubicacion: {
                departamento: "SC",
                direccion: "Av. Principal 456"
            },
            fotoPrincipal: "img/tele.jpg"
        },
        {
            id: "2",
            categoria: "Moda Hombre",
            titulo: "Campera de cuero genuino",
            descripcion: "Campera original de cuero talla M, color negro. Solo 6 meses de uso.",
            precio: "350",
            usuario: "Carlos Ruiz",
            ubicacion: {
                departamento: "CB",
                direccion: "Calle Junín #98"
            },
            fotoPrincipal: "img/hombre.jpg"
        },
        {
            id: "3",
            categoria: "Hogar",
            titulo: "Sofá cama moderno",
            descripcion: "Sofá convertible en cama, tela resistente, color gris. Medidas: 1.80m x 90cm.",
            precio: "800",
            usuario: "María Gómez",
            ubicacion: {
                departamento: "LP",
                direccion: "Zona Sopocachi, Calle 123"
            },
            fotoPrincipal: "img/sofa.jpg"
        },
        {
            id: "4",
            categoria: "Electrónica",
            titulo: "iPhone 13 Pro 128GB",
            descripcion: "Like new, con caja y accesorios originales. 95% batería.",
            precio: "3200",
            usuario: "Ana Torres",
            ubicacion: {
                departamento: "OR",
                direccion: "Av. 6 de Agosto #789"
            },
            fotoPrincipal: "img/cell.jpg"
        },
        {
            id: "5",
            categoria: "Deporte",
            titulo: "Bicicleta montañera Trek",
            descripcion: "Bicicleta talla M, 21 velocidades, suspensión delantera. Uso semi-profesional.",
            precio: "1200",
            usuario: "Luis Fernández",
            ubicacion: {
                departamento: "TJ",
                direccion: "Barrio San Roque, Calle Loa #45"
            },
            fotoPrincipal: "img/bici.jpg"
        }
    ];

    const container = document.querySelector('#anuncios-lista');
    container.innerHTML = '';
    localStorage.setItem('anuncios', JSON.stringify(anuncios));

    anuncios.forEach(anuncio => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'producto';
        productoDiv.setAttribute('data-id', anuncio.id);
        productoDiv.innerHTML = `
            <h1 class="titulo">${anuncio.titulo}</h1>
            <img src="${anuncio.fotoPrincipal}" alt="${anuncio.titulo}">
            <p class="descripcion">${anuncio.descripcion.substring(0, 50)}...</p>
            <div class="usuario-info">
                <a href="#" class="user-icon"><i class='bx bxs-user'></i></a>
                <p class="usuario-nombre">${anuncio.usuario}</p>
            </div>
            <div class="producto-footer">
                <span class="precio">Bs ${anuncio.precio}</span>
                <div class="heart-container" onclick="event.stopPropagation()">
                    <input type="checkbox" class="heart-checkbox">
                    <i class='bx bxs-heart heart-icon'></i>
                </div>
            </div>
        `;
        container.appendChild(productoDiv);
    });

    setupProductEvents();
}

function setupProductEvents() {
    document.querySelectorAll('.producto').forEach(producto => {
        producto.addEventListener('click', () => {
            const id = producto.getAttribute('data-id');
            if (id) {
                window.location.href = 'publicaciones/detalle_anuncio.html?id=' + id;
            }
        });
    });
}
function getUserInSession() {
    return true;
}

function loadHeader() {
    return fetch('Inicio/Inicio.html')
        .then(res => res.text())
        .then(html => {
            const temp = document.createElement('div');
            temp.innerHTML = html;

            const header = temp.querySelector('header');
            const headerContainer = document.getElementById('header-container');
            if (header && headerContainer) {
                headerContainer.appendChild(header);
            }

            const bienvenida = temp.querySelector('.bienvenida_contenedor');
            const bienvenidaContainer = document.getElementById('bienvenida-container');
            if (bienvenida && bienvenidaContainer) {
                bienvenidaContainer.appendChild(bienvenida);
            }

            if (!document.querySelector('link[href*="Material+Icons"]')) {
                const link1 = document.createElement('link');
                link1.rel = 'stylesheet';
                link1.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
                document.head.appendChild(link1);
            }

            if (!document.querySelector('link[href*="Material+Symbols+Outlined"]')) {
                const link2 = document.createElement('link');
                link2.rel = 'stylesheet';
                link2.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined';
                document.head.appendChild(link2);
            }

            const headerCss = document.createElement('link');
            headerCss.rel = 'stylesheet';
            headerCss.href = 'Inicio/inicio.css';
            document.head.appendChild(headerCss);

            return new Promise((resolve) => {
                const headerJs = document.createElement('script');
                headerJs.src = 'Inicio/Inicio.js';
                headerJs.onload = () => {
                    if (typeof initHeader === 'function') {
                        initHeader();
                    }
                    resolve();
                };
                headerJs.onerror = () => {
                    console.error('Error al cargar Inicio.js');
                    resolve();
                };
                document.body.appendChild(headerJs);
            });
        })
        .catch(error => {
            console.error('Error al cargar el header:', error);
            const fallback = document.getElementById('header-container');
            if (fallback) {
                fallback.innerHTML = `
                    <header style="background: #f5f5f5; padding: 10px;">
                        <h1>AVO</h1>
                    </header>
                `;
            }
        });
}


document.addEventListener('DOMContentLoaded', function () {
    loadHeader().then(() => {
        loadAnuncios();
    });
});



