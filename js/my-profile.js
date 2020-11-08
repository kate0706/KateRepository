//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function savePerfil() {

    var nomb = document.getElementById("nombres").value;
    var apell = document.getElementById("apellidos").value;
    var age = document.getElementById("edad").value;
    var tel = document.getElementById("telefono").value;
    
    sessionStorage.setItem("perfilUsuario",
        JSON.stringify(
        {
        nombre: nomb,
        apellido: apell,
        edad: age,
        usuario: localStorage.getItem("email"),
        telefono: tel,
        }
        ));
    
    imprimirResultados();
    }
    
    
    document.addEventListener("DOMContentLoaded", function(e){
        
        var usuario = localStorage.getItem("email");
        document.getElementById("usuario").value = usuario;
    
    
    imprimirResultados();
    
    });
    
    function imprimirResultados() {
    
        let htmlContentToAppend = "";
    
        var data = JSON.parse(sessionStorage.getItem("perfilUsuario"));
    
            htmlContentToAppend += `

                <div class="col">
                <label for="nombres">
                <input style="width: 400px" type="text" id="nombres" class="form-control" placeholder="Nombres" value="` + data.nombre + `" />
                </label>
              </div>
                <div class="col">
                <label for="apellidos">
                <input style="width: 400px" type="text" id="apellidos" class="form-control" placeholder="Apellidos" value="` + data.apellido + `" />
                </label>
                </div>
                <div class="col">
                <label for="usuario">
                <input style="width: 400px;" class="form-control" type="text" id="modEmail" value="` + localStorage.getItem("email") + `"/>
                </label>
            </div> 
              <div class="col">
                <label for="telefono">
                <input style="width: 400px" type="number" id="telefono" class="form-control" placeholder="Teléfono" value="` + data.telefono + `" />
                </label>
              </div>
              <div class="col">
                <label for="edad">
                <input style="width: 300px" type="number" id="edad" class="form-control" placeholder="Edad" value="` + data.edad + `" />
                </label>
                <br>
                <div class="col">
                <label for="guardarCambios" >
                <input class="btn btn-primary btn-lg" type="submit" onclick="savePerfil()" id="updatePerfil" value="Guardar Cambios">
                </label>
                </div>
        `
    
        document.getElementById("editarPerfil").innerHTML = htmlContentToAppend;
    
    }
    