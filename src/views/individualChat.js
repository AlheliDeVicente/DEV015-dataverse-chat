import { footer } from "../components/footer.js";
import { header } from "../components/header.js";
import { data } from "../data/dataset.js";
import { communicateWithOpenAi } from "../lib/openAIAPI.js";
//vista//
export function individualChat(props) {
  const viewEl = document.createElement("div")
  //traer componentes//
  const headerElement = header()
  const footerElement = footer()
  //para que sirva la vista individual y se pongan bien los props//
  const selectedPhilosopher = data.find(philosopher => philosopher.id === props.id)
  //para poder cambiar la imagen de fondo//
  const bodyIndividual = document.querySelector("body")
  bodyIndividual.setAttribute("class", "body-Individual")
  //para poder hacer el main//
  const mainContent = document.createElement("main")
  mainContent.setAttribute("class", "main-individual")
  mainContent.innerHTML = `
  <link id = "css" rel="stylesheet" href="individualChat.css"/>
  <div itemprop = "extraInfo" id ="funFact">&#x1F4A1</div>
  <div class = 'row-container'>
   <div class = "philosopher-info">
    <img itemprop = "image" alt = "${selectedPhilosopher.name}" src = "${selectedPhilosopher.imageUrl}"/>
    <h3> ${selectedPhilosopher.name} </h3>
    <p itemprop = "description"> ${selectedPhilosopher.description}</p>
    <p itemprop = "branchOfPhilsophy"><strong> Ramas de la filosofía: </strong> ${selectedPhilosopher.branchOfPhilosophy.join(", ")}</p>
    <p itemprop = "typeOfPhilosophy"><strong> Corrientes:</strong> ${selectedPhilosopher.typeOfPhilosophy.join(", ")}</p>
    <p itemprop="classification"><strong>Tradición:</strong> ${selectedPhilosopher.facts.classification}</p>
    <p itemprop="century"><strong>Siglo:</strong> ${selectedPhilosopher.facts.century}</p>
    <div itemprop="mainWorks">
      <h4>Obras Principales</h4> 
       ${selectedPhilosopher.mainWorks.map((work) => `<p> <i>  ${work.title} </i> —  ${work.year}</p>`).join(" ")} 
    </div> 
</div>
  <div class = "individual-chatContainer">
    <div class = "chat-header">
     <img src = "${selectedPhilosopher.imageUrl}" alt = "${selectedPhilosopher.name}"/>
      <h3> ${selectedPhilosopher.name} </h3> 
      <p class = "mobile-only"> ${selectedPhilosopher.shortDescription}</p>
      <p class = "status"> En Línea </p>
    </div>
    <div class = "chat-main">
    <div class = "chat-messages">
      </div>
      <div class = "chat-input">
      <input type = "text" id = "user-input" placeholder = "Escribe un mensaje"/>
      <button class = "send-message"> ➤ </button>
      </div>
      </div>
  </div> 
</div>
` 
//botones y elementos del DOM//
  const sendButton = mainContent.querySelector(".send-message")
  const userInput = mainContent.querySelector("#user-input")
  const messageContainers = mainContent.querySelector(".chat-messages")
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
    try {
      const response = await communicateWithOpenAi(userInput.value, selectedPhilosopher);
      const openAiText = response.choices[0].message.content;
      const newResponse = document.createElement("div");
      newResponse.setAttribute("class", "message-received");
      newResponse.innerHTML = `
        <img src="${selectedPhilosopher.imageUrl}" alt="${selectedPhilosopher.name}"/>
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

  // //tecla enter//
  // userInput.addEventListener("keydown", (event)=>{
  //   if(event.key === "Enter")
  //     addUserMessage();
  //   addResponse();

  // })

  //funfacts!//
  const funfact = mainContent.querySelector("#funFact")
  funfact.addEventListener("click", ()=>{
    const textFact = document.createElement("span")
    textFact.setAttribute("id", "textPartFun")
    textFact.innerHTML = `Fun Fact: ${selectedPhilosopher.facts.extraInfo}`
    funfact.append(textFact)
  })
  viewEl.appendChild(headerElement)
  viewEl.appendChild(mainContent)
  viewEl.appendChild(footerElement)

  return viewEl
}