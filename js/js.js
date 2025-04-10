const codeToIngredient = {
    "493918211200": "lettuce",
    "481318211200": "tomatoes",
    "463918211200": "cheese",
    "431318211200": "patty",
    "456318211200": "crispychicken",
    "4831018211200": "onions",
    "41141018211200": "bacon",
    "4156918211200": "pickles",
    "41441018211200": "mayo",
    "4170918211200": "ketchup"
  };
  
  let deletedLayers = [];
  
  const connection = SimpleWebSerial.setupSerialConnection({
    requestAccessOnPageLoad: true,
    baudRate: 9600,
  });
  
  connection.on('codi', (code) => {
    const cleaned = code.trim();
  
    const ingredient = codeToIngredient[cleaned];
    if (ingredient) {
      addIngredientImage(ingredient);
    } else {
      console.warn("Unknown code:", cleaned);
    }
  });
  
  function addIngredientImage(name) {
    const img = document.createElement("img");
    img.src = `images/${name}.png`;
    img.alt = name;
  
    const wrapper = document.createElement("div");
    wrapper.classList.add("layer");
    wrapper.appendChild(img);
    document.getElementById("layers").appendChild(wrapper);
  }
  
  function eraseLayer() {
    const layers = document.getElementById("layers");
    if (layers.firstElementChild) {
      const removed = layers.firstElementChild;
      deletedLayers.push(removed); // Save for redo
      layers.removeChild(removed);
    }
  }
  
  
  // 🔁 REDO last erased layer
  function redoLayer() {
    const layers = document.getElementById("layers");
    if (deletedLayers.length > 0) {
      const restored = deletedLayers.pop();
      layers.appendChild(restored);
    }
  }
  
  // ❌ DELETE ALL layers
  function deleteAllLayers() {
    const layers = document.getElementById("layers");
    while (layers.firstChild) {
      layers.removeChild(layers.firstChild);
    }
    deletedLayers = []; // Also reset redo stack
  }
  
  function addIngredientImage(name) {
    const img = document.createElement("img");
    img.src = `images/${name}.png`;
    img.alt = name;
  
    const wrapper = document.createElement("div");
    wrapper.classList.add("layer");
    wrapper.appendChild(img);
  
    const layers = document.getElementById("layers");
    layers.insertBefore(wrapper, layers.firstChild);  // Insert at the top
  }
  