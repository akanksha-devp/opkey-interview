import './recipeCard.scss';

const RecipeCard = ({image, label, calories, ingredients}) => {
  return(
    <div className='recipe-card'>
      <div className='recipe-card__image'>
        <img src={image}/>
      </div>
      <div className='recipe-card__label'>
        {label}
      </div>
    </div>
  )
}

export default RecipeCard