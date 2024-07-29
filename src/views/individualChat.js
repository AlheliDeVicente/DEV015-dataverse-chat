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
  <div class = chat-container>
    <div class = "chat-header">
     <img src = "${selectedPhilosopher.imageUrl}" alt = "${selectedPhilosopher.name}"/>
      <h3> ${selectedPhilosopher.name} </h3> 
      <p class = "mobile-only"> ${selectedPhilosopher.shortDescription}</p>
      <p class = "status"> En Línea </p>
    </div>
    <div class = "chat-messages">
      <div class = "message-received">
        <img src = "${selectedPhilosopher.imageUrl}" alt = "${selectedPhilosopher.name}"/> <p class = "text-received"> you know they say all men are created equal but you look at me and you look at samoa joe and you can clearly see that statement is not true. </p>
    </div>
      <div class = "message-sent">
        <img src = "./assets/user-icon.png" alt = "user-icon"/> <p class = "text-sent"> go to bed granpa </p>  
      </div>
      <div class = "chat-input">
      <input type = "text" placeholder = "Escribe un mensaje"/>
      <button class = "send-message"> ➤ </button>
      </div>
    </div>
  </div> 
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
`
  viewEl.appendChild(headerElement)
  viewEl.appendChild(mainContent)
  viewEl.appendChild(footerElement)

  return viewEl
}