import { navigateTo } from "../router.js"
export function ERROR () {
  const viewEl = document.createElement("div")
  const title = document.querySelector("#pageTitle")
  const bodyError = document.querySelector("body")
  bodyError.setAttribute("class", "bodyError")
  const mainContent = document.createElement("main")
  mainContent.setAttribute("class", "main-error")
  mainContent.innerHTML = ` <p class = "error"> Parece que tal como Sísifo debes regresar al inicio </p> <button class = "home-button"> Home </button> `
  title.innerHTML = "Error 404"

  viewEl.appendChild(mainContent)
  const homeButton = mainContent.querySelector(".home-button")
  homeButton.addEventListener('click', ()=>{
    navigateTo("/")
  })
  return viewEl

}
