import { header } from "../components/header.js";
import { footer } from "../components/footer.js";
export const groupChat = (props) => {  
  const viewEl = document.createElement("div");
  const headerElement = header()
  viewEl.appendChild(headerElement)
  const footerElement = footer()
  viewEl.appendChild(footerElement)
  return viewEl;
};
  