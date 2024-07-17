import { footer} from "../components/footer.js";
import { header } from "../components/header.js";
import {main} from "../components/main.js"
import { renderItems } from "../components/renderItems.js";
import { data } from "../data/dataset.js";
export const HOME = (props) => {
  const viewEl = document.createElement("div");
  const headerElement = header()
  viewEl.appendChild(headerElement)
  const mainElement = main()
  viewEl.appendChild(mainElement)
  const footerElement = footer()
  viewEl.appendChild(footerElement)
  return viewEl;
}
