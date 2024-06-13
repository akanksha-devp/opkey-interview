import {useEffect, useState} from "react";
import {getRecipesInfo} from "../../services/api.service";
import './recipeInfo.scss';

const RecipeInfo = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [recipeInfo, setRecipeInfo] = useState({})
  const searchParams = new URLSearchParams(window.location.search)

  const fetchRecipeInfo = async(signal) => {
    try{
      setIsLoading(true)
      const res = await getRecipesInfo({recipeId: searchParams.get('recipeId'), signal})
      const {status, data: {recipe}} = res
      if (status===200){
        setRecipeInfo(recipe)
      }
      setIsLoading(false)
    }
    catch (err){
      if(err.message!=='canceled'){
        alert(err)
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {

    console.log("useffect called")

    const controller = new AbortController()
    const signal = controller.signal;

    fetchRecipeInfo(signal);

    return () => {
      controller.abort("Component Unmount")
    }

  }, [searchParams.get('recipeId')]);

  return (
    <div className='recipe-info'>
      {
        isLoading ? (<div>Loading ....</div>) : (
          recipeInfo && (
            <>
              <div className="recipe-info__block">
                <div className="recipe-info__block__top">
                  <div className="recipe-info__block__top__image">
                    <img src={recipeInfo.image} alt='recipe'/>
                  </div>
                  <div className="recipe-info__block__top__content">
                    {recipeInfo.label}
                  </div>
                </div>
                <div className="recipe-info__block__bottom">
                  <div className="recipe-info__block__bottom__left">
                    <h1> {recipeInfo.ingredientLines && recipeInfo.ingredientLines.length} Ingredients </h1>
                    <ul>
                      {
                        recipeInfo.ingredientLines && recipeInfo.ingredientLines.map((ingredient, index)=>{
                          return (
                            <li key={index}>
                              {ingredient}
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                  {/*<div className="recipe-info__block__bottom__right">*/}
                  {/*  <h1> Nutrition </h1>*/}
                  {/*  <div>*/}
                  {/*    /!*{*!/*/}
                  {/*    /!*  Object(recipeInfo.totalDaily).keys.map((nutrition, index)=>{*!/*/}
                  {/*    /!*    return(*!/*/}
                  {/*    /!*      <span>{nutrition.label}</span>*!/*/}
                  {/*    /!*    )*!/*/}
                  {/*    /!*  })*!/*/}
                  {/*    /!*}*!/*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
              </div>
            </>
          )
        )
      }
    </div>
  )
}

export default RecipeInfo