var product = {};
var prod2 = {};

function showGallery(array){

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

        document.getElementById("productGallery").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let costHTML = document.getElementById("cost");
            let currencyHTML = document.getElementById("currency");
            let soldCountHTML = document.getElementById("soldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            costHTML.innerHTML = product.cost;
            currencyHTML.innerHTML = product.currency;
            soldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            prod2 = product.relatedProducts;
            
            //Muestro las imagenes en forma de galería
            showGallery(product.images);
        }
    });
});


function showRelatedProducts(prodAll){

let relatedProd ="";

    for (let i = 0; i < prod2.length; i++){

        let pos = prod2[i];
        var prodTemp = prodAll[pos]

        relatedProd +=`
            
            <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="`+ prodTemp.imgSrc +`" alt="">
                </div>
          </div>
          `
            
        document.getElementById("relatedProduct").innerHTML = relatedProd;
    }
}

//Mostrar productos relacionados
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultProd){
        if (resultProd.status === "ok") {
            product = resultProd.data;
            let prodRelacionados = document.getElementById("relatedProduct");
            prodRelacionados.innerHTML = product.imgSrc;

            showRelatedProducts(product);
        }
    });
});
var CommentsArray = {};

function showComments() {   //con las estrellas, pintadas en amarrillo de acuerdo al score

    let dataComments = "";
    for (let i = 0; i < CommentsArray.length; i++) {
        let com = CommentsArray[i];
        
        
        let score = com.score - 1;
        let star = "";
        for (let i = 0; i < 5; i++) {
    
            if(i <= score){
                star += `<i class="fas fa-star checked"></i> `;
            }else{
                star += `<i class="fas fa-star"></i> `;
            } 
        }  
         
        dataComments += `
        
        <div class="container" id="comment">
            <div class="row">
             <div class="col-8">
                <div class="float meta">
            <div class="title h5"> <p>` + com.user + `</p></div>
            </div>
            </div>
            <div class="rating-stars mb-2" id="rating` + i + `">` + star + `</div>
            </div>
            <div class=""> 
            <p>` + com.description + `</p>
            <h6 class="text-muted time">` + com.dateTime + `</h6>
            <hr>
            </div>
        </div>
        `


    document.getElementById("commentProduct").innerHTML = dataComments;
    } 
}
//Mostrar productos comentarios y score con estrellas
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            CommentsArray = resultObj.data;

            showComments();
        }
    });
});