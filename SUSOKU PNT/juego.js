document.addEventListener('DOMContentLoaded', function () {
    const BotResolver = document.getElementById("BotResolver");
    BotResolver.addEventListener('click', resolverJuego);


    const BotReiniciar = document.getElementById("BotReiniciar");
    BotReiniciar.addEventListener('click', reiniciarSodoku);

    const tablaSudoku = document.getElementById('tabla-sudoku');
    const medidaCuadricula = 9;

    const BotValidar = document.getElementById("BotValidar");
    BotValidar.addEventListener('click', validarSolucion);

    for (let fila = 0; fila < medidaCuadricula; fila++) {
        const nuevaFila = document.createElement("tr");
        for (let col = 0; col < medidaCuadricula; col++) {
            const celda = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.className = "celda";
            input.id = `celda-${fila}-${col}`;

            input.addEventListener('input', function (event) {
                validarEntrada(event, fila, col);

            });

            celda.appendChild(input);
            nuevaFila.appendChild(celda);
        }
        tablaSudoku.appendChild(nuevaFila);
    }


    function validarSolucion() {
        if (verificarGanador()) {
            Swal.fire({
                title: "FELICIDADES LO LOGRASTE ERE' UN CAPO",
                width: 600,
                padding: "3em",
                color: "#716add",
                backdrop: `
              rgba(0,0,123,0.4)
            `
            });
        } else {
            alert("La solución no es válida. Por favor, revisa tus respuestas.");
        }
    }

    function reiniciarSodoku() {
        for (let fila = 0; fila < medidaCuadricula; fila++) {
            for (let col = 0; col < medidaCuadricula; col++) {
                const celdaId = `celda-${fila}-${col}`;
                const celda = document.getElementById(celdaId);
                celda.value = "";
                celda.classList.remove("resolverEfecto", "entradaUsuario");
            }
        }
        generarNumerosAleatorios();
    }


});

async function resolverJuego() {
    const medidaCuadricula = 9;
    const listaSodoku = [];

    for (let fila = 0; fila < medidaCuadricula; fila++) {
        listaSodoku[fila] = [];
        for (let col = 0; col < medidaCuadricula; col++) {
            const celdaId = `celda-${fila}-${col}`;
            const celdaValor = document.getElementById(celdaId).value;
            listaSodoku[fila][col] = celdaValor !== "" ? parseInt(celdaValor) : 0;
        }

    }

    for (let fila = 0; fila < medidaCuadricula; fila++) {

        for (let col = 0; col < medidaCuadricula; col++) {
            const celdaId = `celda-${fila}-${col}`;
            const celda = document.getElementById(celdaId);

            if (listaSodoku[fila][col] !== 0) {
                celda.classList.add("entradaUsuario");
            }
        }

    }

    if (maestroSodoku(listaSodoku)) {
        for (let fila = 0; fila < medidaCuadricula; fila++) {
            for (let col = 0; col < medidaCuadricula; col++) {
                const celdaId = `celda-${fila}-${col}`;
                const celda = document.getElementById(celdaId);

                if (!celda.classList.contains("entradaUsuario")) {
                    celda.value = listaSodoku[fila][col];
                    celda.classList.add("resolverEfecto");
                    await efectoRetraso(20);
                }
            }
        }
    } else {
        alert("No tiene solucion el juego");
    }
}

function maestroSodoku(tablero) {
    const medidaCuadricula = 9;
    for (let fila = 0; fila < medidaCuadricula; fila++) {
        for (let col = 0; col < medidaCuadricula; col++) {
            if (tablero[fila][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (verificarConflictos(tablero, fila, col, num)) {
                        tablero[fila][col] = num;

                        if (maestroSodoku(tablero)) {
                            return true;
                        }
                        tablero[fila][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function verificarConflictos(tablero, fila, col, num) {
    const medidaCuadricula = 9;

    for (let i = 0; i < medidaCuadricula; i++) {
        if (tablero[fila][i] === num || tablero[i][col] === num) {
            return false;
        }
    }

    const filaInicio = Math.floor(fila / 3) * 3;
    const colInicio = Math.floor(col / 3) * 3;

    for (let i = filaInicio; i < filaInicio + 3; i++) {
        for (let j = colInicio; j < colInicio + 3; j++) {
            if (tablero[i][j] === num) {
                return false;
            }
        }
    }
    return true;
}

function efectoRetraso(ms) {
    return new Promise(maestroSodoku => setTimeout(maestroSodoku, ms))
}

function validarEntrada(event, fila, col) {
    const celdaId = `celda-${fila}-${col}`;
    const celda = document.getElementById(celdaId);
    const valor = celda.value;

    if (!/^[1-9]$/.test(valor)) {
        Swal.fire({
            icon: "error",
            title: 'El número [' + valor + '] no es válido, ingrese un valor del (1-9)',
            timer: 2500
        });
        celda.value = "";
        return;
    }

    const numeroIngresado = parseInt(valor);

    for (let i = 0; i < 9; i++) {
        if (i !== col && +document.getElementById(`celda-${fila}-${i}`).value == numeroIngresado) {
            Swal.fire({
                icon: "error",
                title: 'El número [' + numeroIngresado + '] ya se encuentra en la fila',
                showConfirmButton: false,
                timer: 2500
            });
            celda.value = "";
            return;
        }

        if (i !== fila && +document.getElementById(`celda-${i}-${col}`).value == numeroIngresado) {
            Swal.fire({
                icon: "error",
                title: 'El número [' + numeroIngresado + '] ya se encuentra en la columna',
                showConfirmButton: false,
                timer: 2500
            });
            celda.value = "";
            return;
        }
    }

    const cua3x3FilaInicio = Math.floor(fila / 3) * 3;
    const cua3x3ColInicio = Math.floor(col / 3) * 3;

    for (let i = cua3x3FilaInicio; i < cua3x3FilaInicio + 3; i++) {
        for (let j = cua3x3ColInicio; j < cua3x3ColInicio + 3; j++) {
            if (i !== fila && j !== col && +document.getElementById(`celda-${i}-${j}`).value == numeroIngresado) {
                Swal.fire({
                    icon: "error",
                    title: 'El número [' + numeroIngresado + '] ya se encuentra en la cuadricula 3x3',
                    showConfirmButton: false,
                    timer: 2500
                });
                celda.value = "";
                return;
            }
        }
    }
}

function generarNumerosAleatorios() {
    const medidaCuadricula = 9;
    const numerosUtilizados = Array.from({ length: medidaCuadricula }, () => Array.from({ length: medidaCuadricula }, () => 0));

    // Generamos una solución completa para todo el tablero de Sudoku
    const solucionCompleta = generarSolucionCompleta();

    // Aleatoriamente eliminamos algunos números para crear el Sudoku inicial
    for (let fila = 0; fila < medidaCuadricula; fila++) {
        for (let col = 0; col < medidaCuadricula; col++) {
            const celdaId = `celda-${fila}-${col}`;
            const celda = document.getElementById(celdaId);
            if (Math.random() < 0.55) { // Probabilidad de eliminar el número
                celda.value = "";
                numerosUtilizados[fila][col] = 0; // Limpiamos el número utilizado en esta celda
            } else {
                celda.value = solucionCompleta[fila][col];
                numerosUtilizados[fila][col] = solucionCompleta[fila][col];
            }
        }
    }
}

function generarSolucionCompleta() {
    const medidaCuadricula = 9;
    const solucion = Array.from({ length: medidaCuadricula }, () => Array.from({ length: medidaCuadricula }, () => 0));

    if (maestroSodoku(solucion)) {
        return solucion;
    } else {
        // Si no se puede encontrar una solucion, intentamos nuevamente
        return generarSolucionCompleta();
    }
}

function verificarGanador() {
    const medidaCuadricula = 9;

    // Verificamos si hay celdas vacias
    for (let fila = 0; fila < medidaCuadricula; fila++) {
        for (let col = 0; col < medidaCuadricula; col++) {
            const celdaId = `celda-${fila}-${col}`;
            const celda = document.getElementById(celdaId);
            if (celda.value === "") {
                // Si hay al menos una celda vacía, el juego no esta ganado
                return false;
            }
        }
    }

    // Creamos una matriz para almacenar los valores del tablero
    const tablero = [];
    for (let fila = 0; fila < medidaCuadricula; fila++) {
        tablero[fila] = [];
        for (let col = 0; col < medidaCuadricula; col++) {
            const celdaId = `celda-${fila}-${col}`;
            const celdaValor = document.getElementById(celdaId).value;
            tablero[fila][col] = celdaValor !== "" ? parseInt(celdaValor) : 0;
        }
    }

    // Verificamos si la solucion proporcionada por el jugador es valida
    return maestroSodoku(tablero);
}