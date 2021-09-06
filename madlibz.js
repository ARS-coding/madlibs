
// Music code

window.addEventListener("load", function() {
    document.getElementById("audio").play();
    console.log("Tiempo de Bailar!")
  })
  
  let newArr = [];
  
  function parseStory(rawStory) {
    const regex = /(?:^|\W)[v|a|m|n|](?:$|\W)/g;
    const regex2 = /[.,\/]/;
  
    const array = rawStory.split(" ");
    array.forEach((element) => {
      if (regex.test(element)) {
        const matchRegex = element.match(regex);
        if (matchRegex[0] === "[n]") {
          element = element.replace(regex, "");
          newArr.push({ word: element, pos: "noun" });
        } 
        else if (matchRegex[0] === "[v]") {
          element = element.replace(regex, "");
          newArr.push({ word: element, pos: "verb" });
        } 
        else if (matchRegex[0] === "[a]") {
          element = element.replace(regex, "");
          newArr.push({ word: element, pos: "adjective" });
        } 
        else if (matchRegex[0] === "[m]") {
          element = element.replace(regex, "");
          newArr.push({ word: element, pos: "name" });
        }} 
        else {
        newArr.push({ word: element });
        }
  
      if (element.match(regex2)) {
        let matchReg = element.match(regex2)[0];
        element = element.replace(regex2, "");
        newArr.push({word:matchReg});
      }
    });
    return newArr;
  }
  
  getRawStory()
    .then(parseStory)
    .then((processedStory) => {
      let madLibsEdit = document.querySelector(".madLibsEdit");
      let madLibsPreview = document.querySelector(".madLibsPreview");
  
      newArr.forEach(function(element) {
        if (!element.pos) {
          let editSpan = document.createElement("span");
          editSpan.innerHTML = element.word + "&nbsp";
          madLibsEdit.appendChild(editSpan);
          let prevSpan = document.createElement("span");
          prevSpan.innerHTML = element.word + "&nbsp";
          madLibsPreview.appendChild(prevSpan);
        } else {
          let inputPlace = document.createElement("input");
          inputPlace.setAttribute("class", element.pos);
          inputPlace.setAttribute("type", "text");
          inputPlace.setAttribute("maxlength", "20");
          inputPlace.setAttribute("placeholder", `${element.pos} `);
  
          let inputValPreview = document.createElement("span");
          let x = document.createTextNode(`(${element.pos}) `);
          inputValPreview.appendChild(x);
          inputValPreview.setAttribute("class", "input-value");
          inputValPreview.style.color = "red";
  
          inputPlace.addEventListener("input", function () {
            if (inputPlace.value) {
              inputValPreview.style.color = "red";
              inputValPreview.setAttribute("class", "input-prev");
              inputValPreview.innerHTML = `${inputPlace.value} &nbsp`;
             
            } else {
              inputValPreview.innerText = `(${inputPlace.placeholder})`;
            }
          });
          madLibsEdit.appendChild(inputPlace);
          madLibsPreview.appendChild(inputValPreview);
        }
      });
    });