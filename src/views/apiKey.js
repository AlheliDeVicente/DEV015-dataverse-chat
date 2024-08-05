import { footer } from "../components/footer.js";
import { header } from "../components/header.js";
import { setApiKey, deleteApiKey } from "../lib/apikey.js";
export function APIKEY () {
  const viewEl = document.createElement("div");
  const headerElement = header();
  const footerElement = footer();
  const mainContent = document.createElement("main");
  mainContent.setAttribute("class", "main-API")
  const bodyIndividual = document.querySelector("body")
  bodyIndividual.setAttribute("class", "body-Individual")
  mainContent.innerHTML = `
  <link id = "css" rel="stylesheet" href="apiKey.css"/>
  <h2 class = "apih2"> Desde aquí puedes administrar la API Key a utilizar </h2>
  <div class = "apiDiv"> 
    <input type = "text" id="API-Key"/>  
    <button id = "saveAPI"> Guardar </button>
    <button id ="deleteAPI"> Borrar </button> 
  </div>
  `;
  const title = document.querySelector("#pageTitle");
  const clearBttn = mainContent.querySelector("#deleteAPI");
  const textApi = mainContent.querySelector("#API-Key");
  const saveButton = mainContent.querySelector('#saveAPI')
  clearBttn.addEventListener("click", () => {
    textApi.value = "";
    deleteApiKey()
  });
  saveButton.addEventListener('click', ()=>{
    const apiKeyValue = textApi.value
    setApiKey(apiKeyValue)
  })
  title.innerHTML = "API Key";
  viewEl.appendChild(headerElement);
  viewEl.appendChild(mainContent);
  viewEl.appendChild(footerElement);
  return viewEl;
}
