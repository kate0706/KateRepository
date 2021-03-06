const ORDER_ASC_BY_COST = "+-"; //variable productos en orden ascendente
const ORDER_DESC2_BY_COST = "$-+"; //variable productos en orden descendente
const ORDER_BY_PROD_COUNT = "Relevancia"; //variable productos en orden desendente de acuerdo a soldCount
var currentProductsArray = []; 
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var text = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC2_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

//mostrar productos

function showProductsList(){

    let htmlContentToAppend = "";

    for(let i = 0; i < currentProductsArray.length; i++){
        let category = currentProductsArray[i];
        let nombreProd = category.name.toLowerCase();        
        let desProd = category.description.toLowerCase();    

        if (
            ((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount)) &&
            ( (desProd.indexOf(text)) !== -1 || (nombreProd.indexOf(text)) !== -1) //El método indexOf()devuelve el índice, dentro del objeto String que realiza la llamada, de la primera ocurrencia del valor especificado, comenzando la búsqueda desde indiceDesde; o -1 si no se encuentra dicho valor.
            ){

                htmlContentToAppend += `

                <div class="col-md-4">
                    <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                    <img class="bd-placeholder-img card-img-top" src="` + category.imgSrc + `">
                    <hr>
                      <h4 class="m-3">`+ category.name +`</h4>
                      <div class="card-body">
                        <p class="card-text">` + category.currency + ": " + category.cost + ` </p>
                        <small class="card-text">` + category.soldCount + ` artículos vendidos</small>
                        <p class="card-text">` + category.description + `</p>
                        </div>
                    </a>
                </div>
                </div>
                `
        }
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, ProductsArray){
    currentSortCriteria = sortCriteria;

    if(ProductsArray != undefined){
        currentProductsArray = ProductsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProductsList();
}

    // ordenar alfabeticamente al iniciar la pagina o presionar "limpiar"

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){

        sortAndShowProducts(ORDER_ASC_BY_COST);

        document.getElementById("barraBusqueda").value = "";
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        text = undefined;
        minCount = undefined;
        maxCount = undefined;

        filtrar();
        showProductsList();
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC2_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        

        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;


        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });
});


//funcion toLowerCase() devuelve el valor en minúsculas de la cadena que realiza la llamada.

const filtros= ()=>{
    text = searchBar.value.toLowerCase();
    showProductsList();
}
searchBar.addEventListener('keyup', filtros)
filtros();