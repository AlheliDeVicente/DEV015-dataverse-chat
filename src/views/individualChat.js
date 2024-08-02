import { footer } from "../components/footer.js";
import { header } from "../components/header.js";
import { data } from "../data/dataset.js";
export function individualChat(props) {
  const viewEl = document.createElement("div")
  const headerElement = header()
  const footerElement = footer()
  const selectedPhilosopher = data.find(philosopher => philosopher.id === props.id)
  const bodyIndividual = document.querySelector("body")
  bodyIndividual.setAttribute("class", "body-Individual")
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
  <div class = chat-container>
    <div class = "chat-header">
     <img src = "${selectedPhilosopher.imageUrl}" alt = "${selectedPhilosopher.name}"/>
      <h3> ${selectedPhilosopher.name} </h3> 
      <p class = "mobile-only"> ${selectedPhilosopher.shortDescription}</p>
      <p class = "status"> En Línea </p>
    </div>
    <div class = "chat-main">
    <div class = "chat-messages">
      <div class = "message-received">
        <img src = "${selectedPhilosopher.imageUrl}" alt = "${selectedPhilosopher.name}"/> <p class = "text-received"> you know they say all men are created equal but you look at me and you look at samoa joe and you can clearly see that statement is not true. </p>
    </div>
      <div class = "message-sent">
        <img src = "./assets/user-icon.png" alt = "user-icon"/> <p class = "text-sent"> go to bed granpa </p>  
      </div>
      </div>
      <div class = "chat-input">
      <input type = "text" id = "user-input" placeholder = "Escribe un mensaje"/>
      <button class = "send-message"> ➤ </button>
      </div>
      </div>
  </div> 
 
</div>
` 
  const sendButton = mainContent.querySelector(".send-message")
  const userInput = mainContent.querySelector("#user-input")
  const messageContainers = mainContent.querySelector(".chat-messages")
  
  function addUserMessage(){
    const userInputText = userInput.value 
    const newUserMessage = document.createElement("div")
    newUserMessage.setAttribute("class", "message-sent" )
    newUserMessage.innerHTML = ` 
    <img src = "./assets/user-icon.png" alt = "user-icon"/> <p class = "text-sent"> ${userInputText} </p> `
    return messageContainers.appendChild(newUserMessage)
  }
  sendButton.addEventListener("click", ()=>{
    addUserMessage()
    userInput.value = ""
  })
  userInput.addEventListener("keypress", (event)=>{
    if(event.key === "Enter"){
      addUserMessage()
      userInput.value = ""
    }
  })
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