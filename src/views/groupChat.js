import { navigateTo } from "../router.js";
export const groupChat=(props)=>{
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
  <h2> Welcome to the Group Chat </h2>
   
  </main>`
      const groupChatBttn = el.querySelector("#groupChat");
      const apiKeyButton = el.querySelector("#APIKey");
      const logo = el.querySelector("#logo")
      groupChatBttn.addEventListener("click", () => {
        navigateTo("/chatGrupal");
      });
      apiKeyButton.addEventListener("click", () => {
        navigateTo("/apiKey");
      });
      logo.addEventListener("click", ()=>{
        navigateTo("/")
      })
    const title = document.querySelector("#pageTitle") 
    title.innerHTML = "Group Chat"
      return el
    }