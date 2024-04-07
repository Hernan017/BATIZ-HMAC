document.getElementById('edadFormulario').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var Añonaci = document.getElementById('AñoNaci').value;
    var Añoactual = document.getElementById('AñoActu').value;

    if (!isNumeric(Añonaci) || !isNumeric(Añoactual)) {
        alert("Por favor, ingrese solo números en todos los campos.");
        return;
    }

    Añonaci = parseInt(Añonaci);
    Añoactual = parseInt(Añoactual);

    var EDAD = Añoactual - Añonaci;

    document.getElementById('edad').textContent = "Edad: " + EDAD + " años";

    document.getElementById('resultado').classList.remove('hidden');
});

function isNumeric(value) {
    return /^\d+$/.test(value);
}
