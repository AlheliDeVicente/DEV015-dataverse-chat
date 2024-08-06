import { header } from "../components/header.js";
import { footer } from "../components/footer.js";
import { data } from "../data/dataset.js";
import { communicateWithOpenAi } from "../lib/openAIAPI.js";
export function groupChat() {  
  const viewEl = document.createElement("div");
  const headerElement = header();
  viewEl.appendChild(headerElement);
  const footerElement = footer();
 
  // Cambiar la clase del body
  const bodyIndividual = document.querySelector("body");
  bodyIndividual.setAttribute("class", "body-Individual");

  // Crear el contenido principal
  const mainContent = document.createElement("main");
  mainContent.setAttribute("class", "main-groupChat");
  mainContent.innerHTML = `
    <link id="css" rel="stylesheet" href="groupChat.css"/>
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
    </div>`
  const philosophersList = document.createElement("div")
  philosophersList.setAttribute("class", "side-container")
  philosophersList.innerHTML = "En este chat:"
  data.forEach((philosophers) => {
    const littleCard = document.createElement("li")
    littleCard.setAttribute("class", "info-individual")
    littleCard.innerHTML = `<div class = "info-individual"><img src = "${philosophers.imageUrl}" alt = "${philosophers.name}" class = "each-image"/> <p class = "philosopherName">${philosophers.name}</p>`
    philosophersList.appendChild(littleCard)
  }
  );
  mainContent.appendChild(philosophersList)
  const sendButton = mainContent.querySelector(".send-Groupmessage")
  const userInput = mainContent.querySelector("#user-input")
  const messageContainers = mainContent.querySelector(".groupChat-messages")
  //añadir nuevo mensaje del usuario//
  function addUserMessage(){
    const userInputText = userInput.value
    const newUserMessage = document.createElement("div");
    newUserMessage.setAttribute("class", "message-sent");
    newUserMessage.innerHTML = ` <img src = "./assets/user-icon.png" alt = "user-icon"/> <p class = "text-sent"> ${userInputText}</p>`
    return messageContainers.appendChild(newUserMessage)
  }
  //respuesta de openAI//
  async function addResponse() {
    const message = {
      role: "system",
      content: `Debes generar una respuesta por cada uno de los filósofos en este arreglo ${data}. Tus respuestas deben ser muy concisas, entre 10 y 20 palabras.`,
    };

    try {
      const response = await communicateWithOpenAi([
        message,
        { role: "user", content: userInput.value },
      ]);
      const openAiText = response.choices[0].message.content;
      const newResponse = document.createElement("div");
      newResponse.setAttribute("class", "message-received");
      newResponse.innerHTML = `
        <p class="text-received">${openAiText}</p>`;
      messageContainers.appendChild(newResponse);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = document.createElement("div");
      errorMessage.setAttribute("class", "message-received");
      errorMessage.textContent = "Hubo un error, por favor intenta de nuevo.";
      messageContainers.appendChild(errorMessage);
    }
  }
  
  //boton enviar//
  sendButton.addEventListener("click", ()=>{
    addUserMessage()
    addResponse()
    userInput.value = ""
  })
  viewEl.appendChild(mainContent);
  viewEl.appendChild(footerElement);
  return viewEl;
}
