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

  // Crear el contenedor lateral en donde estarán las imágenes y el nombre//
  const philosophersList = document.createElement("div");
  philosophersList.setAttribute("class", "side-container");
  philosophersList.innerHTML = "<h4>En este chat:</h4>";
  // por cada filosofo crear una minicard//
  data.forEach((philosopher) => {
    const littleCard = document.createElement("li");
    littleCard.setAttribute("class", "info-individual");
    littleCard.innerHTML = `<div class="info-individual">
        <img src="${philosopher.imageUrl}" alt="${philosopher.name}" class="each-image"/>
        <p class="philosopherName">${philosopher.name}</p>
      </div>`;
    philosophersList.appendChild(littleCard); //meter cada card al contenedor lateral//
  });
  mainContent.appendChild(philosophersList); //meter contenedor lateral al main//

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
  
  function addGroupResponses() {
    // A cada filósofo de la lista se le llama la función communicateopenai y se obtiene un array de todas esas promesas//
    const promises = data.map(philosopher => 
      communicateWithOpenAi(userInput.value, philosopher)
    );
    Promise.all(promises) //promesa que se resuelve cuando todas las promesas del array se cumplen//
      .then(responses => { //qué hacer//
        responses.forEach((response, philosopher) => { //a cada uno de las respuestas del array, se le saca el contenido y se crea el contenedor en donde se van a insertar//
          const openAiText = response.choices[0].message.content;
          const newResponse = document.createElement("div");
          newResponse.setAttribute("class", "message-received");
          newResponse.innerHTML = `
            <img src="${philosopher.imageUrl}" alt="${philosopher.name}"/>
            <p class="text-received">${openAiText}</p>`;
          messageContainers.appendChild(newResponse);
        });
      })
      .catch(error => {
        console.error("Error:", error);
        const errorMessage = document.createElement("div");
        errorMessage.setAttribute("class", "message-received");
        errorMessage.textContent = "Hubo un error";
        messageContainers.appendChild(errorMessage);
      });
  }

  
  // Event listener para enviar mensaje
  sendButton.addEventListener("click", () => {
    addUserMessage();
    addGroupResponses()
    userInput.value = "";
  });  

  userInput.addEventListener("keydown", (event)=>{
    if(event.key === "Enter"){
      addUserMessage();
      addGroupResponses()
      userInput.value = ""}
  })

  viewEl.appendChild(mainContent);
  const footerElement = footer();
  viewEl.appendChild(footerElement);
  return viewEl;
}
