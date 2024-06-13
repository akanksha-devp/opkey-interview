import axios from "axios";
import {APP_ID, APP_KEY} from "../static/string";

const axiosInstance = axios.create(
  {
    baseURL: "https://api.edamam.com",
    headers: {
      "content-type": "application/json"
    }
  }
)

export function getRecipes(data){
  const {query, signal} = data
  return axiosInstance.get(`/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&q=${query}`, {signal})
}

export function getRecipesInfo(data){
  const {recipeId, signal} = data
  return axiosInstance.get(`/api/recipes/v2/${recipeId}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`, {signal})
}