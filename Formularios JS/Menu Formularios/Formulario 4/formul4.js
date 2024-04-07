document.getElementById('califFormulario').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var par1 = document.getElementById('par1').value;
    var par2 = document.getElementById('par2').value;
    var par3 = document.getElementById('par3').value;
    var exaFinal = document.getElementById('exaFinal').value;
    var TraFinal = document.getElementById('TraFinal').value;

    if (!isNumeric(par1) || !isNumeric(par2) || !isNumeric(par3) || !isNumeric(exaFinal) || !isNumeric(TraFinal)) {
        alert("Por favor, ingrese solo números en todos los campos.");
        return;
    }

    par1 = parseFloat(par1);
    par2 = parseFloat(par2);
    par3 = parseFloat(par3);
    exaFinal = parseFloat(exaFinal);
    TraFinal = parseFloat(TraFinal);

    var Califpar = (par1 + par2 + par3) / 3;
    var califFinal = (Califpar * 0.55) + (exaFinal * 0.30) + (TraFinal * 0.15);

    document.getElementById('califFinal').textContent = "Calificación final: " + califFinal.toFixed(2);

    document.getElementById('resultado').classList.remove('hidden');
});

function isNumeric(value) {
    return /^\d+(\.\d+)?$/.test(value);
}
