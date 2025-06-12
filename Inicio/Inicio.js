function initHeader() {
    // El DOM
    const categoriaBtn = document.querySelector('.icon_categoria a');
    const categoriaVentana = document.querySelector('.categoria_ventana');
    const iconlogin = document.querySelector('.icon_login a');
    const usuarioventana = document.querySelector('.usuario_ventana');

    function toggleMenu() {
        categoriaVentana.classList.toggle('active');
    }

    function toggleLogin() {
        usuarioventana.classList.toggle('active');
    }

    function closeAllMenus() {
        categoriaVentana.classList.remove('active');
        usuarioventana.classList.remove('active');
    }

    if (categoriaBtn && categoriaVentana) {
        categoriaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMenu();
        });
    }

    if (iconlogin && usuarioventana) {
        iconlogin.addEventListener('click', function(e) {
            e.preventDefault();
            toggleLogin();
        });
    }

    document.addEventListener('click', function(e) {
        if (categoriaVentana && categoriaBtn) {
            if (!categoriaVentana.contains(e.target) && !categoriaBtn.contains(e.target)) {
                categoriaVentana.classList.remove('active');
            }
        }

        if (usuarioventana && iconlogin) {
            if (!usuarioventana.contains(e.target) && !iconlogin.contains(e.target)) {
                usuarioventana.classList.remove('active');
            }
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllMenus();
        }
    });

    if (typeof getUserInSession === 'function') {
        const userInSession = getUserInSession();
        if (!userInSession) {
            window.location.href = 'login.html';
            return;
        }
        
        document.body.style.display = 'block';
        
        const cerrarBtn = document.getElementById("cerrar");
        if (cerrarBtn) {
            cerrarBtn.addEventListener("click", function(e) {
                e.preventDefault();
                if (typeof salir === 'function') {
                    salir();
                }
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', initHeader);




