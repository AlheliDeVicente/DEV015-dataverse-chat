import { footer} from "../components/footer.js";
import { header } from "../components/header.js";
import {main} from "../components/main.js"
export function HOME (){
  const bodyHome = document.querySelector("body")
  bodyHome.className = "body-home"
  const viewEl = document.createElement("div");
  const headerElement = header()
  viewEl.appendChild(headerElement)
  const mainElement = main()
  mainElement.setAttribute("class", "main-home")
  viewEl.appendChild(mainElement)
  const footerElement = footer()
  viewEl.appendChild(footerElement)
  return viewEl;
}
