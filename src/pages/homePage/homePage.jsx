import SearchBar from "../../components/searchBar/searchBar";
import {useEffect, useState} from "react";
import './homePage.scss'
import {getRecipes} from "../../services/api.service";
import {useNavigate} from "react-router-dom";
import RecipeCard from "./recipeCard/recipeCard";

const HomePage = () => {

  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }

  const fetchRecipes = async(signal) => {
    try{
      setIsLoading(true)
      const res = await getRecipes ({query, signal})

      if (res.status===200){
        setRecipes(res.data.hits)
      }
      setIsLoading(false)
    }catch(err){
      if(err.message!=='canceled'){
        alert(err)
        setIsLoading(false)
      }
    }
  }

  const handleRecipeClick = (uri) => {
    const recipeId = uri.split("#")[1].replace("recipe_", '')
    navigate(`/recipe?recipeId=${recipeId}`)
  }

  useEffect(() => {

    const controller = new AbortController()
    const signal = controller.signal;


    fetchRecipes(signal);

    return () => {
      controller.abort("Component Unmount")
    }

  }, [query]);

  return(
    <div className="recipe-page">
      <div className="recipe-page__header">
        <SearchBar
          placeholder={"Find the best recipes from across the web..."}
          value={query}
          handleChange={handleQueryChange}
        />
      </div>
      <div className="recipe-page__content">
        {
          isLoading ? (<div>Loading....</div>) :

            recipes.length ? (
              recipes.map((recipe, index)=>{
                return(
                  <div
                    key={index}
                    onClick={(e)=>handleRecipeClick(recipe.recipe.uri)}
                    className='recipe'
                  >
                    <RecipeCard
                      image={recipe.recipe.image}
                      label={recipe.recipe.label}
                    />
                  </div>
                )
              })
            ) : <div> No Recipes To Show</div>

        }
      </div>
    </div>
  )
}

export default HomePage