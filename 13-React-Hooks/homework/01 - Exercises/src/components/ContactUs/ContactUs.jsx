import React from "react";
import {useDispatch} from 'react-redux'
import {enviarForm} from '../../redux/actions/actions.js'
const ContactUs = () => {

  const[form,setForm]= React.useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  })
  const dispatch = useDispatch();
  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(enviarForm(form))
    setForm({
      nombre: '',
      email: '',
      asunto: '',
      mensaje: '',
    })

  }
  const handleInput=(e)=>{
     
     setForm({
      ...form,
      [ e.target.name] : e.target.value
     })
  }
  console.log(form);
  return (
    <div className="contactBg">
      <input value={form.nombre} onChange={handleInput} name="nombre"></input>
      <input value={form.email} onChange={handleInput}name="email"></input>
      <input value={form.asunto} onChange={handleInput}name="asunto"></input>
      <input value={form.mensaje} onChange={handleInput}name="mensaje"></input>
      <button type='submit' onClick={handleSubmit}>ENVIAR</button>
    </div>
  );
};

export default ContactUs;
