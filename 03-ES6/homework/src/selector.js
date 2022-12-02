let traverseDomAndCollectElements = function(matchFunc, startEl) {
  let resultSet = [];

  if (typeof startEl === "undefined") { //si no le digo por donde empezar el recorrido del Dom va a empezar por el body
    startEl = document.body;
  }

  /* let traverseDomAndCollectElements = function(matchFunc, startEl= document.body) {  //puedo poner asi x ES6, si no se declara startEl, se toma por defecto document.body
    let resultSet = []; */



  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
    if(matchFunc(startEl)) resultSet.push(startEl)

  for(const child of startEl.children ){
  let result =traverseDomAndCollectElements(matchFunc,child)
  resultSet =[...result , ...resultSet]
}
return resultSet
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


let selectorTypeMatcher = function(selector) {
  // tu código aquí
  if(selector[0] == "#") return "id";
  if(selector[0] == ".") return "class";
  if(selector.includes(".")) return "tag.class"
  else return "tag"
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

let matchFunctionMaker = function(selector) {
  let selectorType = selectorTypeMatcher(selector);
  let matchFunction;
  if (selectorType === "id") { 
    matchFunction= (element) => selector == `#${element.id}`
    //o sino puedo hacerlo asi 
    // matchFunction = function(element){ if (selector== `#{element.id}`) return true }

  } else if (selectorType === "class") {
    matchFunction =function(element){
      for(let i=0; i<element.classList.length;i++){ //classList devuelve un array de las clases q tiene ese element html
        if(selector == `.${element.classList[i]}`) return true  //className es un metodo, tagName tambien
      }
      return false
    }
  } else if (selectorType === "tag.class") {
    matchFunction= (element)=>{
      // me van a pasar $("div.contenedor"), tengo q separar para validar si las 2 coinciden,  en este caso el div y la clase
      const [miTag, miClass] = selector.split(".") // [div , contenedor] , el metodo split separa por la mitad segun el caracter indicado de separacion
      //hago un destructury y asigno por separado una variable a las 2 palabras del array q me separo el split par ano hacer separados[0] y separados[1]
      return (
        matchFunctionMaker(miTag)(element) && //recursion para buscar el tag y despues la clase
        matchFunctionMaker  (`.${miClass}`)(element)
        )  
      //me da como resultado una funcion y luego la ejecuto pasandole (element) de parametro 

    }
  } else if (selectorType === "tag") {
    matchFunction = (element)=>{
      return selector.toUpperCase()==element.tagName
    }

    
  }
  return matchFunction;
};

let $ = function(selector) {
  let elements;
  let selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);  //funcion q cuando hay una coincidencia lo manda al array elements, (todos los div, por ejemplo)
  return elements;
};
