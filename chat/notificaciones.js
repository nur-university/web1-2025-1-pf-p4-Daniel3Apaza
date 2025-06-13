
function loadHeader() {
    return fetch('../Inicio/Inicio.html')
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
            headerCss.href = '/Inicio/inicio.css';
            document.head.appendChild(headerCss);

            return new Promise((resolve) => {
                const headerJs = document.createElement('script');
                headerJs.src = '/Inicio/Inicio.js';
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



document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".main_container");

  const productos = document.querySelectorAll(".mensajes_noti:nth-of-type(1) .imagen_precio");
  productos.forEach(item => {
    item.addEventListener("click", () => {
      container.classList.remove("show-chat");
      container.classList.add("show-pedidos");
      insertBackButton(() => {
        container.classList.remove("show-pedidos");
      });
    });
  });

  const usuarios = document.querySelectorAll(".mensajes_noti:nth-of-type(2) .imagen_precio");
  usuarios.forEach(item => {
    item.addEventListener("click", () => {
      container.classList.remove("show-pedidos");
      container.classList.add("show-chat");
      insertBackButton(() => {
        container.classList.remove("show-chat");
        container.classList.add("show-pedidos");
      });
    });
  });

  function insertBackButton() {
    let btn = document.getElementById("back-button");
    if (btn) return;

    const container = document.querySelector(".main_container");

    btn = document.createElement("button");
    btn.id = "back-button";
    btn.textContent = "← Volver";
    btn.style.position = "fixed";
    btn.style.top = "25vh";
    btn.style.left = "10px";
    btn.style.zIndex = "1000";
    btn.style.padding = "6px 12px";
    btn.style.border = "none";
    btn.style.background = "#ddd";
    btn.style.borderRadius = "6px";
    btn.style.cursor = "pointer";

    btn.onclick = () => {
        if (container.classList.contains("show-chat")) {
        container.classList.remove("show-chat");
        container.classList.add("show-pedidos");
        } else if (container.classList.contains("show-pedidos")) {
        container.classList.remove("show-pedidos");
        btn.remove();a
        }
    };

    document.body.appendChild(btn);
    }


});




