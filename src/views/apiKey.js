import { navigateTo } from "../router.js";
export const APIKEY = (props) => {
  const el = document.createElement("div");
  el.innerHTML = `
    <header>
      <div id = "logo">
      <img src="assets/logo.png" alt="logo" id="logo"/>
      </div>
      <h1 id="title">σοφία αιώνια</h1>
      <button id="groupChat"> Chat Grupal </button>
      <button id="APIKey"> API Key </button>
    </header>
  <main>
  <h2> Desde aquí puedes administrar la API Key a utilizar </h2>
  <input type = "text" id="API-Key"/>  
  <button id ="delete"> Borrar </button> 
  </main>
  `
  const title = document.querySelector("#pageTitle") 
  const clearBttn = el.querySelector("#delete")
  const textApi = el.querySelector("#API-Key")
  const groupChatBttn = el.querySelector("#groupChat");
  const apiKeyButton = el.querySelector("#APIKey");
  const logo = el.querySelector("#logo")
  clearBttn.addEventListener("click", ()=>{
    textApi.value = ""
  })
  groupChatBttn.addEventListener("click", () => {
    navigateTo("/chatGrupal");
  });
  apiKeyButton.addEventListener("click", () => {
    navigateTo("/apiKey");
  });
  logo.addEventListener("click", ()=>{
    navigateTo("/")
  })
  title.innerHTML = "API Key"
  return el
}