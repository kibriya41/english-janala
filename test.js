const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  console.log(htmlElements.join(" "));
    
};


const sy = ["hello", "hi", "olla"];
createElements(sy);