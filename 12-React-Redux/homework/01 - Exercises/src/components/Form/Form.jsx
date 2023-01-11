import React, { useState } from 'react';
import { connect } from 'react-redux';
import Caja from '../../assets/caja.png';
import './form.css';
import {addProduct} from "../../redux/actions/actions.jsx"
import store from '../store/index.js'
function Form({addProduct}) {
   const [product, setProduct] = useState({ name: '', price: '', id: '' });

   function handleInputChange(e) {
      e.preventDefault(); //esta mal poner eso, solo va en el submit
      setProduct({ ...product, [e.target.name]: e.target.value });
   }
   const handleSubmit=()=>{
      addProduct({...product, id:Date.now()})      //la recibo por props por el mapDispatchToProps
   }

   return (
      <div className='formBg'>
         <div className='inputBox'>
            <label>Nombre: </label>
            <input
               name='name'
               onChange={handleInputChange}
               value={product.name}
            />
         </div>
         <div className='inputBox'>
            <label>Precio:</label>
            <input
               type='number'
               name='price'
               onChange={handleInputChange}
               value={product.price}
            />
         </div>
         <button onClick={handleSubmit} className='formBtn'>¡ADD!</button>
         <img src={Caja} alt='' className='logo' />
      </div>
   );
}

export function mapDispatchToProps(dispatch) {     //la funcion addProduct, va a props
   return{
      addProduct: (product)=>{
         store.dispatch(addProduct(product))}
      
   }
}

export default connect(null, mapDispatchToProps)(Form);
