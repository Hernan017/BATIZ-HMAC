document.getElementById('PorcentajeGeneros').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var hombresInput = document.getElementById('hombres').value;
    var mujeresInput = document.getElementById('mujeres').value;

    if (!isNumeric(hombresInput) || !isNumeric(mujeresInput)) {
        alert("Por favor, ingrese solo números en todos los campos.");
        return;
    }

    var hombres = parseInt(hombresInput);
    var mujeres = parseInt(mujeresInput);

    var totalEstudiantes = hombres + mujeres;
    var hombresPorcentaje = (hombres / totalEstudiantes) * 100;
    var mujeresPorcentaje = (mujeres / totalEstudiantes) * 100;

    document.getElementById('hombres-porcentaje').textContent = "Porcentaje de hombres: " + hombresPorcentaje.toFixed(2) + "%";
    document.getElementById('mujeres-porcentaje').textContent = "Porcentaje de mujeres: " + mujeresPorcentaje.toFixed(2) + "%";
    document.getElementById('total-estudiantes').textContent = "Total de estudiantes: " + totalEstudiantes;

    document.getElementById('resultado').classList.remove('hidden');
});

function isNumeric(value) {
    return /^\d+$/.test(value);
}
