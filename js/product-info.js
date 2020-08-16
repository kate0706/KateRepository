//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var product = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let DescriptionHTML = document.getElementById("categoryDescription");
            let CostHTML = document.getElementById("cost");
            let CurrencyHTML = document.getElementById("currency");
            let SoldCountHTML = document.getElementById("soldCount");
            let CategoryHTML = document.getElementById("category");
            let RelatedProductHTML = document.getElementById("relatedProducts");
        
            productNameHTML.innerHTML = product.name;
            DescriptionHTML.innerHTML = product.description;
            CostHTML.innerHTML = product.cost;
            CurrencyHTML.innerHTML = product.currency;
            SoldCountHTML.innerHTML = product.soldCount;
            CategoryHTML.innerHTML = product.category;
            RelatedProductHTML.innerHTML = product.relatedProducts;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
});
});