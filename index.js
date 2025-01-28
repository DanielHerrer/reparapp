// ---> FUNCIONES

// USAR LA LUPA EN EL INDEX
document.getElementById("searchIndex").addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario

    const input = document.getElementById("inputIndex").value.trim().toLowerCase(); // Capturar el valor del input

    // Redirige a listar-servicios.html con el término de búsqueda como parámetro
    window.location.href = `listar-servicios.html?search=${encodeURIComponent(input)}`;
});

