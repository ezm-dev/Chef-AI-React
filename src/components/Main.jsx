import {useRef, useState,useEffect} from "react"
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"

export default function Main(){


    const [ingredients,setIngredients] = useState(["all the main spices", "pasta", "ground beef", "tomato paste"])
    const [recipeShown, setRecipeShown] = useState(false)
    const recipeSection = useRef(null)

  // Scroll to recipe section when receipe is ready and recipeSection refrenced node element
    useEffect(()=>{
        if(recipeShown && recipeSection.current)
        recipeSection.current.scrollIntoView({behavior: "smooth"})
    },[recipeShown])
    
    function toggleRecipeShown(){
        setRecipeShown(prevShown=>!prevShown)
    }


 ///OLD way <form onsubmit={handleSubmit} on client side
//     function handleSubmit(e){
//         e.preventDefault()
//         const formEl= e.currentTarget
//         const formData= new FormData(formEl)
//         const newItem= formData.get("ingredient")
//         setIngredients(prev=> [...prev,newItem])
//         formEl.reset()
//   }

// Not using controlling components
  //NEW way(React 19) to handle form submit on clinet side using action={handle.....}
  //Adv: Getting formData & automatically as input, and form reset done for you
    function addItems(formData){
        const newItem = formData.get("ingredient")
        setIngredients(prev => [...prev,newItem])

    }
    //  <form action={addItems}

    
return(
    <main>
        <p>Enter what you have of ingredients to get a recipe!</p>
        <form action={addItems} className="ingredients-form" >
            <input 
            type="text" 
            id="ingredient"
            name="ingredient"
            placeholder="e.g. Oregano"
            aria-label="Enter ingredients"
            defaultValue="Pasta" />
            <button>Add ingredients</button>
        </form>
           {ingredients.length >0 && <IngredientsList ingredients={ingredients} toggleRecipeShown={toggleRecipeShown} ref={recipeSection}/> }
            {recipeShown && <ClaudeRecipe /> }
    </main>
)
}