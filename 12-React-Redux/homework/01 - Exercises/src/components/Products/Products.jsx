import { connect } from 'react-redux';
import React from 'react';
import './products.css';
//El componente Card lo exportamos haciendo destructuring para poder testearlo
import Card from '../Card/Card'
import {getStoreName} from '../../redux/actions/actions.jsx'
export function Products({list, products,storeName}) {
   React.useEffect(()=>{
      getStoreName()
   },[])
   return (
      <>
         <div className='productsBg'>
            <h1 className='productsTl'>{storeName}</h1>

            <div className='productsList'>
               {list.length &&products.map(product=>{//si pongo solo products seria un array vacio, y eso como valor de verdad da true, encambio products.length si da 0 es false
                  return(
                     <Card name={product.name} price={product.price}  id={product.id}/>
                  )
               })}
            </div>
         </div>
      </>
   );
}

 function mapStateToProps(state) {
   return{
      list: "state.list",
      storeName:state.storeName
   }
}
 function mapDispatchToProps(dispatch){
   return{
      getStoreName:()=>{dispatch(getStoreName())}
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
