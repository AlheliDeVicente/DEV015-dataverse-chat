import { navigateTo } from "../router.js";
export const header = () => {
  const componentHeader = document.createElement("header");
  componentHeader.innerHTML = `
  <link id = "css" rel="stylesheet" href="header.css"/>
<div id = "logo">
<img src="assets/logo.png" alt="logo" id="logo"/>
</div>
      <h1 id="title">σοφία αιώνια</h1>
      <button class= "header-buttons" id="groupChat"> Chat Grupal </button>
      <button class = "header-buttons" id="APIKey"> API Key </button>
`;
  const groupChatBttn = componentHeader.querySelector("#groupChat");
  const apiKeyButton = componentHeader.querySelector("#APIKey");
  const logo = componentHeader.querySelector("#logo");
  //boton para ir a la vista de chatGrupal
  groupChatBttn.addEventListener("click", () => {
    navigateTo("/chatGrupal");
  });
  //boton para ir a la vista de API Key
  apiKeyButton.addEventListener("click", () => {
    navigateTo("/apiKey");
  });
  //Logo para regresar a página principal
  logo.addEventListener("click", () => {
    navigateTo("/");
  });

  return componentHeader;
};
