import { header } from "../components/header.js";
import { footer } from "../components/footer.js";
import { navigateTo } from "../router.js";
export const groupChat = (props) => {
    const el = document.createElement("div");
    el.innerHTML = `<header> ${header} </header>
    <footer> ${footer} </footer>`
  const title = document.querySelector("#pageTitle") 
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
  title.innerHTML = "Group Chat"
  return el
  };
  