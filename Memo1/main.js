window.onload = function () {
    
    var arrayImgs = [["corazon",0],["estrella",0],["circulo",0],["triangulo",0]];
    var arrayTds = document.getElementsByTagName("td");
    cantidadGanados = 0;

    var obtenerNumeroRandom = function () {
        return Math.floor(Math.random() * (3 - 0 + 1) + 0);
    };

    var mostrarImagen = function (td) {
        var clase = td.classList.item(0);
        td.classList.add("activo");
        td.innerHTML = "<img src='imagenes/" + clase + ".jpg' />";
    };

    var ocultarImagen = function () {
        setTimeout(function () {
            var arrayAc = document.getElementsByClassName("activo");
            for (var i = 0; i <= arrayAc.length; i++) {
                var td = arrayAc[0];
                td.classList.remove("activo");
                td.innerHTML = "<img src='imagenes/0.jpg' />";
            }
        }, 500);
    };

    var validarGanador = function (ArrayActivos) {
        for (var i = 0; i <= ArrayActivos.length; i++) {
            var td = ArrayActivos[0];
            td.classList.remove("activo");
            td.classList.add("inactivo");
        }

        if (document.getElementsByClassName("inactivo").length == 8) {
            cantidadGanados++;
            document.getElementById("estadistica").innerHTML = "Usted ha ganado " + cantidadGanados + " veces.";
            alert("USTED HA GANADO!");
            reiniciar();
        }
    };

    var reiniciar = function () {
        for (var i = 0; i < arrayTds.length; i++) {
            var td = arrayTds[i];
            td.className = "";
            td.innerHTML = "";
        }

        for (var i = 0; i < arrayImgs.length; i++) {
            var img = arrayImgs[i];
            img[1] = 0;
        }
        inicializar(false);
    };

    var inicializar = function (esInicio) {
        for (var i = 0; i < arrayTds.length; i++) {
            var r = obtenerNumeroRandom();
            while (arrayImgs[r][1] > 1) {
                r = obtenerNumeroRandom();
            }
            var td = arrayTds[i];
            td.classList.add(arrayImgs[r][0]);
            arrayImgs[r][1]++;
            td.innerHTML = "<img src='imagenes/0.jpg' />";

            if (esInicio) {
                var td = arrayTds[i];

                td.addEventListener("click", function () {
                    var cantidad = document.getElementsByClassName("activo").length;
                    if (cantidad < 2) {
                        mostrarImagen(this);
                    }

                    if (cantidad == 1) {
                        var c = this.classList.item(0);
                        var arrayActivos = document.getElementsByClassName(c + " activo");
                        if (arrayActivos.length == 2) {
                            validarGanador(arrayActivos);
                        }
                        else {
                            ocultarImagen();
                        }
                    }
                });
            }
        }

        var btnReiniciar = document.getElementById("btnReiniciar");
        btnReiniciar.addEventListener("click", function () {
            cantidadGanados = 0;
            document.getElementById("estadistica").innerHTML = "Usted ha ganado " + cantidadGanados + " veces.";
            reiniciar();
        });
    };

    inicializar(true);
}