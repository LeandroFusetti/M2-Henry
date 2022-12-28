const { createStore } = require("redux");
const contador = require("./reducer");
const { incremento, decremento, incrementoImpar } = require("./actions");

// En esta línea creamos nuestro store. Pasándole como parámetro nuestro Reducer
var store = createStore(contador) 

// Obtenemos el elemento con el id `valor`.
var valor= document.querySelector('#valor')

// Esta función nos va a servir para actualizar nuestro DOM con el valor que tengamos en nuestro Store.
// En el primer render y cada vez que nos subscribamos al Store.
// Utilizamos el elemento obtenido arriba para mostrar el State.
function renderContador() {
  // Obtenemos la propiedad 'contador' de nuestro store:
  // Seteamos el número obtenido como texto dentro del elemento con id 'valor':
  const contador= store.getState().contador //getState devuelve el estado q es un objeto, y ahi busco contador
  valor.innerText= contador 
}



// Ejecutamos la función 'renderContador':
renderContador()
// Nos subscribimos al store pasándole la misma función. Así cada vez que llegue una acción, ejecutamos la función:
store.subscribe(renderContador)
// Por último, utilizamos los botones de nuestro HTML para que cada vez que hagamos click,
const incrementoButton =document.querySelector('#incremento')
const decrementoButton =document.querySelector('#decremento')
const incrementoImparButton = document.querySelector('#incrementoImpar')
const incrementoAsyncButton = document.querySelector('#incrementoAsync')
// hagan un dispatch al store de la acción correspondiente:
incrementoButton.addEventListener('click', ()=>{
  store.dispatch(incremento())
})

decrementoButton.addEventListener('click', ()=>{
  {store.getState().contador >0 && store.dispatch(decremento())}
})

incrementoImparButton.addEventListener('click', ()=>{
   // o puedo hacer valor.innerHTML%2 ==0 && store.dispatch(incremento()) 
   store.getState().contador % 2 !=0 && store.dispatch(incremento()) 
})

incrementoAsyncButton.addEventListener('click', ()=>{
  setTimeout(()=>{
    store.dispatch(incremento())
  },1000);
})