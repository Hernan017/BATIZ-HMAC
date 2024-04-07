document.getElementById('venFormulario').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var BaseSalario = parseFloat(document.getElementById('BaseSalario').value);
    var ven1 = parseFloat(document.getElementById('ven1').value);
    var ven2 = parseFloat(document.getElementById('ven2').value);
    var ven3 = parseFloat(document.getElementById('ven3').value);
    
    if (isNaN(BaseSalario) || isNaN(ven1) || isNaN(ven2) || isNaN(ven3) || BaseSalario <= 0 || ven1 < 0 || ven2 < 0 || ven3 < 0) {
        alert("Por favor, ingrese cantidades válidas.");
        return;
    }
    
    var tarifa = 0.10;
    var totalComi = (ven1 + ven2 + ven3) * tarifa;
    var totalSalario = BaseSalario + totalComi;
    
    document.getElementById('resultado').innerHTML = `
        <p>El total por comisiones es: ${totalComi.toFixed(2)}.</p>
        <p>El salario total es: ${totalSalario.toFixed(2)}.</p>
    `;
    
    document.getElementById('resultado').classList.remove('hidden');
});
