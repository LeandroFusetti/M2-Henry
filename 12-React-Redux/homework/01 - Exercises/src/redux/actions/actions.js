import axios from 'axios'
const { ADD_PRODUCT,GET_STORE_NAME, DELETE_PRODUCT } =require ("./types");


const addProduct= (product)=>{
    return {
        type: ADD_PRODUCT,
        payload:product
    }
}

const deleteProduct = (id)=>{
    return{
        type: DELETE_PRODUCT,
        payload:id
    }
}

const getStoreName = ()=>{
    return function(){
        return async function (dispatch) {
            try {
              let response = await axios.get("http://localhost:3001/store");
              return dispatch(
                 {type: GET_STORE_NAME, payload:response.data.name}
              );
            } catch (error) {
              console.log(error);
            }
          };
    }
}

/* fetch(‘www.local…etc’)
.then(res=>res.json())
.then((data)=>dispatch{type:LOQUESEA, payload:data}
 
el fetch tiene un paso mas q es pasar la respuesta a un json
 
axios.get(‘www.local…etc’)
.then(data=>dispatch{type:LOQUESEA, payload:data.data}
se guarda automaticamente en data., por eso ponemos data.data
 
Recuerda que axios devuelve la repuesta en forma de objeto en una propiedad llamada data, tenlo en cuenta al momento de terminar el dispatch. Puedes echar un vistazo al archivo db.json, ahí están los datos que enviará la api.
 */

module.exports={
    getStoreName,
    deleteProduct,
    addProduct
}