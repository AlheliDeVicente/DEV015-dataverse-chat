import { header } from "../components/header.js";
import { footer } from "../components/footer.js";
import { data } from "../data/dataset.js";

export function groupChat() {  
  const viewEl = document.createElement("div");
  const headerElement = header();
  viewEl.appendChild(headerElement);
  const footerElement = footer();
  viewEl.appendChild(footerElement);

  // Cambiar la clase del body
  const bodyIndividual = document.querySelector("body");
  bodyIndividual.setAttribute("class", "body-Individual");

  // Crear el contenido principal
  const mainContent = document.createElement("main");
  mainContent.setAttribute("class", "main-groupChat");
  mainContent.innerHTML = `
    <link id="css" rel="stylesheet" href="groupChat.css"/>
    <div class="chat-container">
      <div class="chat-header">
        <h3>Timeless Wisdom</h3>
        <p class="status">En Línea</p>
      </div>
      <div class="chat-main">
        <div class="chat-messages"></div>
        <div class="chat-input">
          <input type="text" id="user-input" placeholder="Escribe un mensaje"/>
          <button class="send-message"> ➤ </button>
        </div>
      </div>
    </div> 
     <div class="philosophers-info">
          ${data.map(philosopher => `<img src="${philosopher.imageUrl}" alt="${philosopher.name}" />`).join('')}

        </div>
  `;
  viewEl.appendChild(mainContent);

  return viewEl;
}
