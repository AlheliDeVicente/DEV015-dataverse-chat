import { footer } from "../components/footer.js";
import { header } from "../components/header.js";
import { data } from "../data/dataset.js";
export function individualChat(props) {
  const viewEl = document.createElement("div");
  const headerElement = header()
  const footerElement = footer()
  const selectedPhilosoper = data.find(philosopher => philosopher.id === props.id)
  const mainContent = document.createElement("main")
  mainContent.setAttribute("class", "mainIndividual")
  mainContent.innerHTML = `
    <div class = "chat-container">
  <h3> ¡Chatea con ${selectedPhilosoper.name} ! </h3>
  <div class = "icon-image"> <img src = "${selectedPhilosoper.imageUrl}" alt = "${selectedPhilosoper.name}"/> </div>
  <div class = "name"> ${selectedPhilosoper.name} </div>
  <p class = "mobile-only" itemprop = "description"> ${selectedPhilosoper.description} </p>
  <div class = "status"> <strong> En Línea </strong>
   <div class="message">
                <span class="username">Usuario 1:</span>
                <span class="message-content">Hola, ¿cómo estás?</span>
            </div>
  <div class="message">
                <span class="username">Usuario 2:</span>
                <span class="message-content">¡Hola! Bien, gracias, ¿y tú?</span>            
            </div>
        </div>
        <div class="input-box">
            <input type="text" placeholder="Escribe tu mensaje...">
            <button>Enviar</button>
        </div>
  <div class= "philosopher-info"> 
  <h3>${selectedPhilosoper.name} </h3>
  <img itemprop = "image" alt="${selectedPhilosoper.name}" src="${selectedPhilosoper.imageUrl}"/>
  <p itemprop = "description"> ${selectedPhilosoper.description} </p>
  <p itemprop="branchOfPhilosophy"><strong>Ramas de la filosofía:</strong> ${selectedPhilosoper.branchOfPhilosophy.join(", ")}</p>
  <p itemprop="typeOfPhilosophy"><strong>Corrientes:</strong> ${selectedPhilosoper.typeOfPhilosophy.join(", ")}</p>
  <p itemprop="classification"><strong>Tradición:</strong> ${selectedPhilosoper.facts.classification}</p>
  <p itemprop="century"><strong>Siglo:</strong> ${selectedPhilosoper.facts.century}</p>
  <div itemprop="mainWorks">
  <h4>Obras Principales</h4> 
  ${selectedPhilosoper.mainWorks.map((work) => `<p> <i>  ${work.title} </i> —  ${work.year}</p>`).join(" ")} 
  </div>
  </div>`
  viewEl.appendChild(headerElement)
  viewEl.appendChild(mainContent)
  viewEl.appendChild(footerElement)
  return viewEl
}
