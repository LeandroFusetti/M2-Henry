import React from 'react';
// eslint-disable-next-line no-unused-vars
import Animals from '../Animals/Animals';
// eslint-disable-next-line no-unused-vars
import Species from '../Species/Species';
import './Zoo.module.css';


export default function Zoo() {
   /* Escribe acá tu código */
   const [zoo, setZoo] = React.useState({
   zooName: "",
   animals: [],
   species: [],
   allAnimals: [],
})
  
React.useEffect(()=>{
   fetch('http://localhost:3001/zoo')
   .then((res) => res.json())
   .then((data) =>
      setZoo({
         ...zoo,
         animals: data.animals,
         species: data.species,
         allAnimals: data.animals,
      })
   )
   .catch((error) => console.log(error))
},[])

const handleSpecies = (e)=>{
   const specie = e.target.value
   console.log(specie)
   const filtrado = zoo.allAnimals.filter(animal=> animal.specie === specie)
   console.log(filtrado);
   
   setZoo({
      ...zoo,
      animals: filtrado
   })
   
}

const handleAllSpecies = ()=>{
   
   setZoo({
      ...zoo,
      animals:zoo.allAnimals
   })
}
const handleInputChange = (e)=>{
   const valor = e.target.value
   
   setZoo({
      ...zoo,
      zooName: valor
   })
}


   return (
      <div>
         <label htmlFor="zoo">Zoo Name:</label>
         <input onChange={handleInputChange} type="text" value={ zoo.zooName} />
         <h1>{zoo.zooName}</h1>
         <Species species={zoo.species} handleSpecies={handleSpecies} handleAllSpecies={handleAllSpecies} />
         <Animals animals={zoo.animals}/>
      </div>
   );
}
