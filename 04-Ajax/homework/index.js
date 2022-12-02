const cb= (info)=>{
    const ull= $("#lista")
    ull.empty() //metodo de qquary para sacar los hijos , para que no se repita cuando hago click

    info.forEach(({name,age,email}) => { //destructury  a las propiedades directamente del objeto (sabiendo q es un obj)
        
        let lista= document.createElement("li")
        lista.innerHTML= `nombre: ${name} edad: ${age} mail: ${email}`
        ull.append(lista)
        
    });}


const clickHandler= ()=>{
    $.get("http://localhost:5000/amigos", cb)
    };

$("#boton").click(clickHandler)



const clickHandler2 =()=>{
    const id = $("#input")[0].value
    console.log(id);
    $.get(`http://localhost:5000/amigos/${id}`,(info)=>{
        const {name, age, email} =info
        // $("#amigo")[0].innerHTML=`nombre: ${name} edad: ${age} mail: ${email}` esta es una forma
        // con Qquary seria asi abajo
        $("#amigo").text(`nombre: ${name} edad: ${age} mail: ${email}` )
        
    })
}


$("#search").click(clickHandler2)





const clickHandler3= ()=>{
    const id = $("#inputDelete").val() //asi es en Qquary
    console.log(id);
    $.ajax({
        url: `http://localhost:5000/amigos/${id}`,
        type: "DELETE",
        success: ()=>{
            
            alert("amigo eliminado")
            clickHandler()
        }
    })
    
    
    
}


$("#delete").click(clickHandler3)
// for (i) arr[i] => recorrer un iterable y hacer algo en cada paso {cuerpo} ocupa un indice para hacer ese recorrido

// for of (const elem) => recorrer asignando una variable {cuerpo}  se crea una variable elem

// map recibe una cb => esa cb  recibe como parametro  a cada elem
// cada paso del map, retoma  un elemento nuevo que va a un array nuevo 
// RETORNA UN ARRAY NUEVO!! arr.map((elem)=>{elem *2})

// for each... que recorre un array y ejecuta una funcion en cada paso 

// Filter.. recibe una cb.. que retoma una condicion (true o false) y en base a esa condicion,
// el elemento que estamos recorriendo pasara o no el filtro 
// RETOMA UN ARRAY NUEVO 

