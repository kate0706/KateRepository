//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function iniciar(){

    var cont = localStorage.getItem('contador');
    if (cont != 1) {
    window.location.href= 'login.html';
    }
}