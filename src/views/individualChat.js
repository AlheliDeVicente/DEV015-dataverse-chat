import { footer } from "../components/footer.js";
import { header } from "../components/header.js";

export const individualChat = (props) => {
  const viewEl = document.createElement('div');
  const headerElement = header()
  const footerElement = footer()
  viewEl.appendChild(headerElement)
  viewEl.appendChild(footerElement)
};
