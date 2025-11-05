// Available images in the database
const availableImages = [
  "529.jpg",
  "533.jpg",
  "535.jpg",
  "556.jpg",
  "562.jpg",
  "579.jpg",
  "585.jpg",
  "593.jpg",
  "598.jpg",
  "603.jpg",
  "611.jpg",
  "623.jpg",
  "628.jpg",
  "635.jpg",
  "648.jpg",
  "663.jpg",
  "667.jpg",
  "675.jpg",
  "691.jpg",
  "697.jpg",
  "702.jpg",
  "709.jpg",
  "715.jpg",
  "720.jpg",
  "731.jpg",
  "757.jpg",
  "772.jpg",
  "777.jpg",
  "794.jpg",
  "801.jpg",
  "809.jpg",
  "817.jpg",
  "822.jpg",
  "827.jpg",
  "889.jpg",
  "911.jpg",
  "929.jpg",
  "991.jpg",
  "1128.jpg",
  "1140.jpg",
  "1171.jpg",
  "1214.jpg",
  "1257.jpg",
  "1350.jpg",
  "1439.jpg",
  "1471.jpg",
  "1519.jpg",
  "1574.jpg",
  "1614.jpg",
  "1688.jpg",
  "1720.jpg",
  "1785.jpg",
  "1842.jpg",
  "1887.jpg",
  "1937.jpg",
  "2013.jpg",
  "2084.jpg",
  "2113.jpg",
  "2134.jpg",
  "2221.jpg",
  "2271.jpg",
  "2309.jpg",
  "2315.jpg",
  "2348.jpg",
  "2380.jpg",
  "2390.jpg",
  "2427.jpg",
  "2523.jpg",
  "2529.jpg",
  "2656.jpg",
  "2851.jpg",
  "2878.jpg",
  "2981.jpg",
  "3003.jpg",
  "3023.jpg",
  "3036.jpg",
  "3042.jpg",
  "3055.jpg",
  "FVCS000135.jpg",
  "FVCS000136.jpg",
  "FVCS000157.jpg",
  "FVCS000168.jpg",
  "FVCS000181.jpg",
  "FVCS000184.jpg",
  "FVCS000200.jpg",
  "FVCS000208.jpg",
  "FVCS000220.jpg",
  "FVCS000228.jpg",
  "FVCS000237.jpg",
  "FVCS000250.jpg",
  "FVCS000262.jpg",
  "FVCS000267.jpg",
  "FVCS000270.jpg",
  "VCS_014.jpg",
  "VCS_019.jpg",
];

// Get 16 random images from the available images
function getRandomImages(count = 16) {
  const shuffled = [...availableImages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Populate the image grid
function populateImageGrid() {
  const imageGrid = document.getElementById("imageGrid");
  imageGrid.innerHTML = ""; // Clear existing images
  const randomImages = getRandomImages();

  randomImages.forEach((imageName) => {
    const imgContainer = document.createElement("div");
    imgContainer.style.cursor = "pointer";
    imgContainer.style.position = "relative";
    imgContainer.style.overflow = "hidden";
    imgContainer.style.borderRadius = "8px";
    imgContainer.style.transition = "transform 0.2s, box-shadow 0.2s";
    imgContainer.style.paddingBottom = "100%"; // Makes container square (1:1 aspect ratio)
    imgContainer.style.backgroundColor = "#2a2a2a";
    imgContainer.style.border = "1px solid #404040";

    const img = document.createElement("img");
    img.src = `./images/${imageName}`;
    img.alt = imageName;
    img.style.position = "absolute";
    img.style.top = "0";
    img.style.left = "0";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "contain"; // Show complete image without cropping
    img.style.display = "block";
    img.style.borderRadius = "8px";

    // Add hover effect
    imgContainer.addEventListener("mouseenter", () => {
      imgContainer.style.transform = "scale(1.05)";
      imgContainer.style.boxShadow = "0 4px 12px rgba(76,175,80,0.5)";
      imgContainer.style.borderColor = "#4caf50";
    });

    imgContainer.addEventListener("mouseleave", () => {
      imgContainer.style.transform = "scale(1)";
      imgContainer.style.boxShadow = "none";
      imgContainer.style.borderColor = "#404040";
    });

    // Add click event to search for similar images
    imgContainer.addEventListener("click", () => {
      searchSimilarImages(imageName);
    });

    imgContainer.appendChild(img);
    imageGrid.appendChild(imgContainer);
  });
}

// Search for similar images
async function searchSimilarImages(imageName) {
  console.log("Buscando imágenes similares a:", imageName);

  // Hide the "no selection" message
  const noSelectionMessage = document.getElementById("noSelectionMessage");
  noSelectionMessage.style.display = "none";

  const ruta = `./nearest_neighbors/${imageName}.json`;

  try {
    let response = await fetch(ruta);
    if (!response.ok) {
      throw new Error("Imagen no encontrada en la base de datos");
    }

    let data = await response.json();
    console.log("Resultados encontrados:", data);

    // Show results
    document.querySelector(".row_resultados").style.display = "flex";

    document
      .getElementById("result_1")
      .setAttribute("src", `./images/${data[1].filename}.jpg`);
    document
      .getElementById("result_2")
      .setAttribute("src", `./images/${data[2].filename}.jpg`);
    document
      .getElementById("result_3")
      .setAttribute("src", `./images/${data[3].filename}.jpg`);
    document
      .getElementById("result_4")
      .setAttribute("src", `./images/${data[4].filename}.jpg`);
    document
      .getElementById("result_5")
      .setAttribute("src", `./images/${data[0].filename}.jpg`);
  } catch (error) {
    console.error("Error:", error);
    alert(
      `⚠️ No se pudo cargar la información de similitud para ${imageName}.\n\nError: ${error.message}`
    );
    // Clear results
    document.querySelector(".row_resultados").style.display = "none";
  }
}

// Initialize the grid when the page loads
document.addEventListener("DOMContentLoaded", () => {
  populateImageGrid();

  // Add refresh button functionality
  const refreshButton = document.getElementById("refreshButton");
  refreshButton.addEventListener("click", () => {
    populateImageGrid();

    // Hide results when refreshing
    document.querySelector(".row_resultados").style.display = "none";
    document.getElementById("noSelectionMessage").style.display = "block";

    // Add visual feedback
    refreshButton.textContent = "Actualizado";
    setTimeout(() => {
      refreshButton.textContent = "Actualizar";
    }, 1000);
  });

  // Add hover effect to refresh button
  refreshButton.addEventListener("mouseenter", () => {
    refreshButton.style.backgroundColor = "#4caf50";
    refreshButton.style.color = "#1a1a1a";
    refreshButton.style.transform = "scale(1.05)";
  });

  refreshButton.addEventListener("mouseleave", () => {
    refreshButton.style.backgroundColor = "transparent";
    refreshButton.style.color = "#4caf50";
    refreshButton.style.transform = "scale(1)";
  });
});
