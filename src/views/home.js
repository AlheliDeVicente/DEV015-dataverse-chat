import { footer} from "../components/footer.js";
import { header } from "../components/header.js";
import {main} from "../components/main.js"
export function HOME (){
  const viewEl = document.createElement("div");
  const headerElement = header()
  viewEl.appendChild(headerElement)
  const mainElement = main()
  viewEl.appendChild(mainElement)
  const footerElement = footer()
  viewEl.appendChild(footerElement)
  return viewEl;
}
