document.getElementById('DescFormulario').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var totalAmount = document.getElementById('cantidadTotal').value;

    if (!isNumeric(totalAmount)) {
        alert("Por favor, ingrese solo números.");
        return;
    }

    totalAmount = parseFloat(totalAmount);
    var discount = totalAmount * 0.15;
    var finalPrice = totalAmount - discount;

    document.getElementById('PrecioFinal').textContent = "Precio final a pagar: $" + finalPrice.toFixed(2);

    document.getElementById('resultado').classList.remove('hidden');
});

function isNumeric(value) {
    return /^\d+$/.test(value);
}
