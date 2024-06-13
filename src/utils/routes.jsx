import HomePage from "../pages/homePage/homePage";
import { createBrowserRouter } from "react-router-dom";
import RecipeInfo from "../pages/recipeInfo/recipeInfo";

const routes = [
  {
    path: '/home',
    element: <HomePage/>
  },
  {
    path: '/recipe',
    element: <RecipeInfo/>
  }
]

export const router = createBrowserRouter(routes)