import { header } from "../components/header.js";
import { footer } from "../components/footer.js";
import { data } from "../data/dataset.js";
import { communicateWithOpenAi } from "../lib/openAIAPI.js";

export function groupChat() {
  const viewEl = document.createElement("div");
  const headerElement = header();
  viewEl.appendChild(headerElement);
  const bodyIndividual = document.querySelector("body")
  bodyIndividual.setAttribute("class", "body-Individual")
  const mainContent = document.createElement("main");
  mainContent.setAttribute("class", "main-groupChat");
  mainContent.innerHTML = `
      <div class="groupChat-container">
        <div class="groupChat-header">
          <h3>Timeless Wisdom</h3>
          <p class="status">En Línea</p>
        </div>
        <div class="groupChat-main">
          <div class="groupChat-messages"></div>
          <div class="groupChat-input">
            <input type="text" id="user-input" placeholder="Escribe un mensaje"/>
            <button class="send-Groupmessage"> ➤ </button>
          </div>
        </div>
      </div>`;

  // Crear la lista de filósofos
  const philosophersList = document.createElement("div");
  philosophersList.setAttribute("class", "side-container");
  philosophersList.innerHTML = "<h4>En este chat:</h4>";

  data.forEach((philosopher) => {
    const littleCard = document.createElement("li");
    littleCard.setAttribute("class", "info-individual");
    littleCard.innerHTML = `<div class="info-individual">
        <img src="${philosopher.imageUrl}" alt="${philosopher.name}" class="each-image"/>
        <p class="philosopherName">${philosopher.name}</p>
      </div>`;
    philosophersList.appendChild(littleCard);
  });
  mainContent.appendChild(philosophersList);

  const messageContainers = mainContent.querySelector(".groupChat-messages");
  const sendButton = mainContent.querySelector(".send-Groupmessage");
  const userInput = mainContent.querySelector("#user-input");

  // Función para añadir mensaje de usuario
  function addUserMessage() {
    const userInputText = userInput.value;
    const newUserMessage = document.createElement("div");
    newUserMessage.setAttribute("class", "message-sent");
    newUserMessage.innerHTML = `<img src="./assets/user-icon.png" alt="user-icon"/> <p class="text-sent">${userInputText}</p>`;
    messageContainers.appendChild(newUserMessage);
  }
  
  async function addGroupResponses() {
    try {
      // Obtener las respuestas de todos los filósofos
      const promises = data.map(async (philosopher) => {
        return communicateWithOpenAi(userInput.value, philosopher);
      });
  
      // Esperar todas las respuestas
      const responses = await Promise.all(promises);
  
      // Mostrar las respuestas en el chat
      responses.forEach((response, philosopher) => {
        const openAiText = response.choices[0].message.content;
        const newResponse = document.createElement("div");
        newResponse.setAttribute("class", "message-received");
        newResponse.innerHTML = `
          <img src="${philosopher.imageUrl}" alt="${philosopher.name}"/>
          <p class="text-received">${openAiText}</p>`;
        messageContainers.appendChild(newResponse);
      });
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = document.createElement("div");
      errorMessage.setAttribute("class", "message-received");
      errorMessage.textContent = "Hubo un error, por favor intenta de nuevo.";
      messageContainers.appendChild(errorMessage);
    }
  }

  
  // Event listener para enviar mensaje
  sendButton.addEventListener("click", () => {
    const userMessage = userInput.value;
    if (userMessage.trim() === "") return; // No enviar mensajes vacíos
    addUserMessage();
    addGroupResponses()
    userInput.value = "";
  });  

  userInput.addEventListener("keydown", (event)=>{
    if(event.key === "Enter"){
      addUserMessage();
      userInput.value = ""}
  })

  viewEl.appendChild(mainContent);
  const footerElement = footer();
  viewEl.appendChild(footerElement);
  return viewEl;
}
