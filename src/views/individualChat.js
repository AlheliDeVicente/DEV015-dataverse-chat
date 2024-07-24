import { footer } from "../components/footer.js";
import { header } from "../components/header.js";
import { data } from "../data/dataset.js";
export function individualChat (props) {
  const viewEl = document.createElement('div');
  const headerElement = header()
  const footerElement = footer()
  const selectedPhilosoper = data.find(philosopher=>philosopher.id === props.id)
  const chatSection = document.createElement("main")
  chatSection.innerHTML = ` <div class = chat-container>
  <div class= "philosopher-info"> 
  <h3>${selectedPhilosoper.name} </h3>
  <img alt="${selectedPhilosoper.name}" src="${selectedPhilosoper.imageUrl}"/>
  <p> ${selectedPhilosoper.description} </p>
  </div>
  </div>`
  viewEl.appendChild(headerElement)
  viewEl.appendChild(chatSection)
  viewEl.appendChild(footerElement)
  return viewEl
}
