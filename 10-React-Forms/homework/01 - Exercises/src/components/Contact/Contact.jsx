import React from 'react'
import './Contact.modules.css'


// eslint-disable-next-line
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export function validate(inputs){
    
  const errors={}   //cuando el formulario tiene los campos llenos retorno un obj vacio, y cuando lo paso a array me da q esta vacio y asi la funcion handleSubmit me valida que estan todos los campos llenos, ya q depende del array vacio
  if (!inputs.name) {
      errors.name = 'Se requiere un nombre';
   }
   if (!regexEmail.test(inputs.email)) {
      errors.email = 'Debe ser un correo electrónico';
   }
   if(inputs.phone<=0){
    errors.phone= 'Sólo números positivos'
   }
   if(!inputs.subject){
    errors.subject='Se requiere un asunto'
   }
   if(!inputs.message){
    errors.message='Se requiere un mensaje'
   }
  return(
      errors
  )
}

export default function Contact () {

  const[inputs, setInputs]=React.useState({
    name:'',
    email:'',
    phone:0,
    subject:'',
    message:''
  })

  const[errors,setErrors]=React.useState({
    name:'',
    email:'',
    phone:'',
    subject:'',
    message:''
  })

  const handleChange= (evento)=>{
    
    setInputs({
      ...inputs,
      //const property =event.target.name
      //const value = event.target.value
      // [property]= value
      [evento.target.name]: evento.target.value
    })
    setErrors(
      
      validate({
        ...inputs,      //por el delay de react vuelvo a poner los inputs viejos y despues agrego el nuevo manualmente 
        [evento.target.name]: evento.target.value
      })
    )
  }
  console.log(inputs);
  console.log(errors)
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(Object.keys(errors).length);
    if(!Object.keys(errors).length){
      alert('Datos completos')
      setErrors({
        name:'',
        email:'',
        phone:'',
        subject:'',
        message:''
      });
      setInputs({
      name:'',
      email:'',
      phone:0,
      subject:'',
      message:''
    
        })
      }else{
        alert('Debe llenar todos los campos')
      }
  } 


  return (
    <div>
        <form action="" onSubmit={handleSubmit} style={{display:"flex", flexDirection:'column', width:'25%', margin:'auto'}}>
          <label htmlFor="name">Nombre:</label>
          <input name="name" placeholder='Escribe tu nombre...' type='text'value={inputs.name} onChange={handleChange} className={errors.name &&'warning'}/>
          {errors.name && <p className='danger'>{errors.name}</p>}

          <label htmlFor="email">Correo Electrónico:</label>
          <input type="text" name='email' placeholder='Escribe tu email...' value={inputs.email}onChange={handleChange} className={errors.email &&'warning'}/>
          {errors.email && <p className='danger'>{errors.email}</p>}

          <label htmlFor="phone">Teléfono:</label>
          <input type="number" name='phone' placeholder='Escribe un teléfono...' value={inputs.phone} onChange={handleChange} className={errors.phone &&'warning'}/>
          {errors.phone && <p className='danger'>{errors.phone}</p>}

          <label htmlFor="subject">Asunto:</label>
          <input type="text" name="subject" placeholder='Escribe el asunto...' value={inputs.subject}onChange={handleChange}className={errors.subject &&'warning'}/>
          {errors.subject && <p className='danger'>{errors.subject}</p>}
          
          <label htmlFor="message">Mensaje:</label>
          <textarea name="message" cols="30" rows="10" type='text' placeholder='Escribe tu mensaje...'value={inputs.message}
          onChange={handleChange} className={errors.message &&'warning'}/>
          {errors.message && <p className='danger'>{errors.message}</p>}

          <button type='submit'>Enviar</button>
        </form>
    </div>
  )
}
