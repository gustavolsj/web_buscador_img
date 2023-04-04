let model;
let class_indices;
let fileUpload = document.getElementById('uploadImage')
let img = document.getElementById('image')
let boxResult = document.querySelector('.box-result')
let confidence = document.querySelector('.confidence')
let pconf = document.querySelector('.box-result p')

let img_busqueda;
let json_busqueda;
let ruta;

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
        });
        img_busqueda = file.name;

        console.log("Img busqueda afuera: " + img_busqueda);
        console.log("RUTA: ./nearest_neighbors/" + img_busqueda + ".json");
        ruta = "./nearest_neighbors/" + img_busqueda + ".json";
        console.log(ruta);
    }     
    async function nearestNeighbors(){
        let response = await fetch(ruta);
        let data = await response.json();
        data = JSON.stringify(data);
        data = JSON.parse(data);
        console.log("Resultado 1: " + data[1].filename + ".jpg");
        console.log("Resultado 2: " + data[2].filename + ".jpg");
        console.log("Resultado 3: " + data[3].filename + ".jpg");
        console.log("Resultado 4: " + data[4].filename + ".jpg");

        document.getElementById("result_5").setAttribute("src",  ("./images/" + data[0].filename + ".jpg"));
        document.getElementById("result_1").setAttribute("src",  ("./images/" + data[1].filename + ".jpg"));
        document.getElementById("result_2").setAttribute("src",  ("./images/" + data[2].filename + ".jpg"));
        document.getElementById("result_3").setAttribute("src",  ("./images/" + data[3].filename + ".jpg"));
        document.getElementById("result_4").setAttribute("src",  ("./images/" + data[4].filename + ".jpg"));
            
        return data;
        //     console.log("Resultado 0: " + json_busqueda[0].filename + ".jpg");

    }
    nearestNeighbors()
})




// async function nearestNeighbors(ruta) {
            
//     //const response = await fetch("./nearest_neighbors/529.jpg.json") 
//     const response = await fetch(ruta) // ----------------------------------------USAR VARIABLE
//     json_busqueda = await response.json()

//     console.log({json_busqueda});
//     console.log("Resultado 0: " + json_busqueda[0].filename + ".jpg");
//     console.log("Resultado 1: " + json_busqueda[1].filename + ".jpg");
//     console.log("Resultado 2: " + json_busqueda[2].filename + ".jpg");
//     console.log("Resultado 3: " + json_busqueda[3].filename + ".jpg");
//     console.log("Resultado 4: " + json_busqueda[4].filename + ".jpg");

//     document.getElementById("result_1").setAttribute("src",  ("./images/" + json_busqueda[1].filename + ".jpg"));
//     document.getElementById("result_2").setAttribute("src",  ("./images/" + json_busqueda[2].filename + ".jpg"));
//     document.getElementById("result_3").setAttribute("src",  ("./images/" + json_busqueda[3].filename + ".jpg"));
//     document.getElementById("result_4").setAttribute("src",  ("./images/" + json_busqueda[4].filename + ".jpg"));
//     document.getElementById("result_5").setAttribute("src",  ("./images/" + json_busqueda[5].filename + ".jpg"));
// }

