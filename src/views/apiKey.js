import { footer } from "../components/footer.js";
import { header } from "../components/header.js";
export const APIKEY = (props) => {
  const viewEl = document.createElement("div");
  const headerElement = header()
  const footerElement = footer()
  const mainContent = document.createElement("main")
  mainContent.innerHTML = `
  <h2> Desde aquí puedes administrar la API Key a utilizar </h2>
  <input type = "text" id="API-Key"/>  
  <button id ="delete"> Borrar </button> 
  `
  const title = document.querySelector("#pageTitle") 
  const clearBttn = mainContent.querySelector("#delete")
  const textApi = mainContent.querySelector("#API-Key")
   clearBttn.addEventListener("click", ()=>{
    textApi.value = ""
  })
  title.innerHTML = "API Key"
  viewEl.appendChild(headerElement) 
  viewEl.appendChild(mainContent)
  viewEl.appendChild(footerElement)
  return viewEl;
}