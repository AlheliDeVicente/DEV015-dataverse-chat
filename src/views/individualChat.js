import { footer } from "../components/footer.js";
import { header } from "../components/header.js";
import { data } from "../data/dataset.js";
export const individualChat = (props) => {
  const viewEl = document.createElement('div');
  const headerElement = header()
  const footerElement = footer()
  const currentPhilosopher = data.find((philosopher)=>philosopher.id === props.id)
  const philosopherContent = document.createElement("div");
  philosopherContent.innerHTML = `<div class = "image-container">
        <img src="${currentPhilosopher.imageUrl}" alt="${
      currentPhilosopher.name
    }" itemprop="image"/>
        <h3 itemprop="givenName"><strong>${currentPhilosopher.name}</strong></h3>
      </div>
      <div class ="info">
      <p itemprop="description"> ${currentPhilosopher.description}</p>
      <p itemprop="branchOfPhilosophy"><strong>Ramas de la filosofía:</strong> ${currentPhilosopher.branchOfPhilosophy.join(
        ", "
      )}</p>
      <p itemprop="typeOfPhilosophy"><strong>Corrientes:</strong> ${currentPhilosopher.typeOfPhilosophy.join(
        ", "
      )}</p>
      <p itemprop="classification"><strong>Tradición:</strong> ${
        currentPhilosopher.facts.classification
      }</p>
      <p itemprop="century"><strong>Siglo:</strong> ${
        currentPhilosopher.facts.century
      }</p>
      <div itemprop="mainWorks">
      <h4>Obras Principales</h4> 
       ${currentPhilosopher.mainWorks
         .map((work) => `<p> <i>  ${work.title} </i> —  ${work.year}</p>`)
         .join(" ")} 
      </div>
      </div>`
  viewEl.appendChild(headerElement)
  viewEl.appendChild(philosopherContent)
  viewEl.appendChild(footerElement)
  return viewEl
};
