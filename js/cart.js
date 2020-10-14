var shippingPercentage = 0.15;
let PERCENTAGE_SYMBOL = '%';

function articlesWrapper(array) {
    htmlContentToAppend = "";

    for (let i = 0; i < array.articles.length; i++) {


        htmlContentToAppend += `
   
    <tr>
            <td>  <img  src="`+ array.articles[i].src + `  " height="50" ></img>    </td>
            <td>   ` + array.articles[i].name + `  </td>
            <td>  <input type="number" class="form-control" id="cant`+ [i + 1] + `" placeholder=" " required="" value="` + array.articles[i].count + `" min="0" onchange="update()" >    </td>
            <td> `+ array.articles[i].unitCost + ` ` + array.articles[i].currency + `</td>
            <td id="subtotal`+ [i + 1] + `">   </td>
    </tr>
      
    `
        document.getElementById("articlesWrapper").innerHTML = htmlContentToAppend;

    }
}
//Prueba si uso mas elementos, calcular subtotal solo pesos

function update() {
    var subtotal = 0;

    for (let i = 0; i < total.articles.length; i++) {

        let a = 1;

        var unitCost = total.articles[i].unitCost;
        var cantidad = document.getElementById("cant" + [i + 1]).value;

        var itemPrice = (cantidad * unitCost)
        subtotal += itemPrice;

        document.getElementById("subtotal" + [i + 1]).innerHTML = itemPrice;
    }

    //Ultimo Box Total

    let subtotalCostHTML = document.getElementById("subtotalCost");
    let shippingCostHTML = document.getElementById("shippingCost");
    let totalCostTextHTML = document.getElementById("totalCost");

    let shippingToShow = shippingPercentage * subtotal;
    let subtotalToShow = subtotal;
    let totalCostTextToShow = shippingPercentage * (subtotal) + (subtotal);

    shippingCostHTML.innerHTML = shippingToShow;
    subtotalCostHTML.innerHTML = subtotalToShow;
    totalCostTextHTML.innerHTML = totalCostTextToShow;

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_INFO_URL).then(function (resultCart) {
        if (resultCart.status === "ok") {

            total = resultCart.data;


            articlesWrapper(total);

            update();
        }
    });

    document.getElementById("premiumradio").addEventListener("change", function () {
        shippingPercentage = 0.15;
        update();
    });



    document.getElementById("expressradio").addEventListener("change", function () {
        shippingPercentage = 0.07;
        update();

    });

    document.getElementById("standardradio").addEventListener("change", function () {
        shippingPercentage = 0.05;
        update();
    });


});