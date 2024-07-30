import { header } from "../components/header.js";
import { footer } from "../components/footer.js";
export function groupChat(){  
  const viewEl = document.createElement("div");
  const headerElement = header()
  viewEl.appendChild(headerElement)
  const footerElement = footer()
  viewEl.appendChild(footerElement)
  const bodyIndividual = document.querySelector("body")
  bodyIndividual.setAttribute("class", "body-Individual")
  return viewEl;
}
  