document.getElementById('FormularioInte').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var principal = parseFloat(document.getElementById('principal').value);
    
    if (isNaN(principal) || principal <= 0) {
        alert("Por favor, ingrese solo numeros. :D");
        return;
    }
    
    var tasaInte = 0.02;
    var interes = principal * tasaInte;
    var total = principal + interes;
    
    document.getElementById('resultado').innerHTML = `
        El interés ganado después de un mes es: ${interes.toFixed(2)}.
        El total después de un mes es: ${total.toFixed(2)}.
    `;
    
    document.getElementById('resultado').classList.remove('hidden');
});