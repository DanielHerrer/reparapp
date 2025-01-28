
document.addEventListener("DOMContentLoaded", () => {

    const inputServicios = document.getElementById("inputServicios");
    const resultadosDiv = document.getElementById("servicios-container");

    const params = new URLSearchParams(window.location.search); // Obtener parámetros de la URL
    const searchTerm = params.get("search"); // Capturar el valor del parámetro 'search'
    
    if (searchTerm) {
        // Rellenar el campo del buscador con el término de búsqueda
        inputServicios.value = searchTerm;

        // Filtrar servicios con el término de búsqueda
        filtrarServicios(searchTerm);
        
    } else {
        mostrarServiciosNormal();
    }

    function tarjetaNueva(servicio,index) {
        const calificacionEstrellas = Array(5)
                    .fill(0)
                    .map(
                        (_, i) =>
                            `<i class="bi ${
                                i < servicio.proveedor.calificacion
                                    ? "bi-star-fill text-warning"
                                    : "bi-star text-secondary"
                            }"></i>`
                    )
                    .join("");

        return `
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="card card_body shadow p-5 py-2 bg-body-tertiary rounded border-0">
                            <div class="card_header">
                                <div class="row">
                                    <div class="text-center text-primary fs-4 pt-4 pb-1">
                                        ${servicio.categoria}
                                    </div>
                                </div>
                                <div class="row align-self-center border-top border-primary py-3">
                                    <div class="col-4 align-self-end">
                                        <img src="${servicio.proveedor.img_perfil || './img/default.png'}" 
                                            class="img_perfil align-self-end" 
                                            alt="imagen de perfil" />
                                    </div>
                                    <div class="col-8 align-self-center fs-5">
                                        ${servicio.proveedor.nombre}
                                    </div>
                                </div>
                                <div class="row border-top border-primary">
                                    <div class="text-secondary descripcion-card py-2">
                                        ${servicio.descripcion}
                                    </div>
                                </div> ${servicio.img_matricula ? 
                                    `<div class="row border-top border-primary">
                                            <div class="col-7 py-2">Matricula:</div>
                                            <div class="col-5 py-2">
                                                <button class="btn btn-sm boton-card" data-bs-toggle="modal" data-bs-target="#modalMatricula_${index}">
                                                    Ver Matricula
                                                </button>
                                            </div>
                                        </div>
                                        <div class="modal fade" id="modalMatricula_${index}" tabindex="-1" aria-labelledby="modalMatriculaLabel_${index}" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h1 class="modal-title fs-5" id="modalMatriculaLabel_${index}">Matricula profesional</h1>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body text-center">
                                                            <img src="${servicio.img_matricula}" class="img-matricula w-100" alt="imagen de matricula" />
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>`                 : ""
                                }
                                <div class="row border-top border-primary">
                                    <div class="col-7 py-2">Honorarios p/ hora:</div>
                                    <div class="col-5 py-2">
                                        <b>$</b><b>${servicio.honorariosHora || "N/A"}</b>
                                    </div>
                                </div>
                                <div class="row border-top py-2">
                                    <div class="col-7 align-self-end">Calificación Proveedor:</div>
                                    <div class="col-5">
                                        <b>${calificacionEstrellas}</b>
                                    </div>
                                </div>
                                <div class="row border-top py-2">
                                    <div class="col-12 pb-2 text-end">
                                        <span class="badge text-secondary">Publicado el ${servicio.fecha_publicacion || "N/A"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
    }

    function mostrarServiciosNormal() {
        const serviciosContainer = document.getElementById("servicios-container");
        serviciosContainer.innerHTML = ``;
        
        // Verificar si hay servicios
        if (servicios.length === 0) {
            serviciosContainer.innerHTML = `
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <h2 class="text-center my-5">No hay Servicios para mostrar...</h2>
                </div>
            `;
        } else {
            servicios.forEach((servicio, index) => {
    
                const servicioHTML = tarjetaNueva(servicio,index);
                serviciosContainer.innerHTML += servicioHTML;
            });
        }
        
    }

    function filtrarServicios(termino) {

        if (termino === "") {
            mostrarServiciosNormal(); // SI NO ESCRIBIÓ NADA, mostrar lista normalmente
    
        } else {

            const resultados = servicios.filter(servicio =>
                servicio.categoria.toLowerCase().includes(termino) ||
                servicio.descripcion.toLowerCase().includes(termino) ||
                servicio.proveedor.nombre.toLowerCase().includes(termino)
            );
    
            resultadosDiv.innerHTML = ""; // Limpiar resultados previos
    
            if (resultados.length === 0) {
                resultadosDiv.innerHTML = `<div class="col-lg-12 col-md-12 col-sm-12">
                                                <h2 class="text-center my-5">No se encontraron Servicios...</h2>
                                            </div>`;
            } else {
                resultados.forEach((servicio, index) => {
                    resultadosDiv.innerHTML += tarjetaNueva(servicio,index);
                });
            }
        }
    }

    // Escuchar el evento de envío del formulario para buscar en tiempo real
    document.getElementById("searchServicios").addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar recargar la página

        const nuevoTermino = document.getElementById("inputServicios").value.trim().toLowerCase(); // Capturar el nuevo valor del input

        filtrarServicios(nuevoTermino);

    });

});

