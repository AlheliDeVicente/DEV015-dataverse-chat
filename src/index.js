import { navigateTo, onURLChange, setRootEl, setRoutes } from "./router.js";
import { groupChat } from "./views/groupChat.js";
import { individualChat } from "./views/individualChat.js";
import { HOME } from './views/Home.js';
import { APIKEY } from "./views/apiKey.js";
import { ERROR } from "./views/error.js";
//Ejemplo de definición de rutas:

const routes = {
  "/": HOME,
  "/chatGrupal": groupChat,
  "/individualChat": individualChat,
  "/apiKey": APIKEY,
  "/error": ERROR
}

setRoutes(routes);

// Handle initial URL load
window.addEventListener("DOMContentLoaded", () => {
// set root element
  setRootEl(document.querySelector("#root"));
  // invoke onURLChange 
  onURLChange(window.location);
});
//Handle URL Changes
window.addEventListener("popstate", () => {
  onURLChange.apply(window.location);
});
// TODO:
// 1.- Definir rutas en router.
// 2.- Pasar "root element" a router.
// 3.- Invocar el router para renderizar la vista correcta.
// */
// //