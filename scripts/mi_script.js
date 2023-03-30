let model;
let class_indices;
let fileUpload = document.getElementById('uploadImage')
let img = document.getElementById('image')
let boxResult = document.querySelector('.box-result')
let confidence = document.querySelector('.confidence')
let pconf = document.querySelector('.box-result p')

let img_busqueda;

fileUpload.addEventListener('change', function(e){
            
    let uploadedImage = e.target.value
    if (uploadedImage){
        document.getElementById("blankFile-1").innerHTML = uploadedImage.replace("C:\\fakepath\\","")
        document.getElementById("choose-text-1").innerText = "Cambiar de fotografía"
        document.querySelector(".success-1").style.display = "inline-block"

        let extension = uploadedImage.split(".")[1]
        if (!(["doc","docx","pdf"].includes(extension))){
            document.querySelector(".success-1 i").style.border = "1px solid limegreen"
            document.querySelector(".success-1 i").style.color = "limegreen"
        }else{
            document.querySelector(".success-1 i").style.border = "1px solid rgb(25,110,180)"
            document.querySelector(".success-1 i").style.color = "rgb(25,110,180)"
        }
    }

    let file = this.files[0]
    if (file){
        // boxResult.style.display = 'block'
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", function(){
            
            img.style.display = "block"
            img.setAttribute('src', this.result);
            console.log("Img busqueda dentro: " + file.name);
            // ------------------------------------------------------------------------------------------PENDIENTE GUARDAR EN VARIABLE
        });
        img_busqueda = file.name;

        console.log("Img busqueda afuera: " + img_busqueda);

        async function nearestNeighbors() {
            
            console.log("RUTA: ./nearest_neighbors/" + img_busqueda + ".json");
            const response = await fetch("./nearest_neighbors/529.jpg.json") 
            //const response = await fetch("./nearest_neighbors/" + img_busqueda + ".json"); // ----------------------------------------USAR VARIABLE
            const json_busqueda = await response.json();
            
            console.log(json_busqueda);
    
                console.log("json_busqueda: " + img_busqueda + ".json");
                console.log("Resultado 0: " + json_busqueda[0].filename + ".jpg");
                console.log("Resultado 1: " + json_busqueda[1].filename + ".jpg");
                console.log("Resultado 2: " + json_busqueda[2].filename + ".jpg");
                console.log("Resultado 3: " + json_busqueda[3].filename + ".jpg");
                console.log("Resultado 4: " + json_busqueda[4].filename + ".jpg");
    
                document.getElementById("result_1").setAttribute("src",  ("./images/" + json_busqueda[1].filename + ".jpg"));
                document.getElementById("result_2").setAttribute("src",  ("./images/" + json_busqueda[2].filename + ".jpg"));
                document.getElementById("result_3").setAttribute("src",  ("./images/" + json_busqueda[3].filename + ".jpg"));
                document.getElementById("result_4").setAttribute("src",  ("./images/" + json_busqueda[4].filename + ".jpg"));
                document.getElementById("result_5").setAttribute("src",  ("./images/" + json_busqueda[5].filename + ".jpg"));
             }
        nearestNeighbors();
    }
    

           
    //nearestNeighbors();
})
