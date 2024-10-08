import {onURLChange, setRootEl, setRoutes } from "./router.js";
import { groupChat } from "./views/groupchat.js";
import { individualChat } from "./views/individualChat.js";
import { HOME } from './views/home.js';
import { APIKEY } from "./views/apiKey.js";
import { ERROR } from "./views/error.js";
//Ejemplo de definición de rutas:

export const routes = {
  "/": HOME,
  "/individualChat": individualChat,
  "/apiKey": APIKEY,
  "/error": ERROR,
  "/chatGrupal": groupChat
  
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
  onURLChange(window.location);
});
// TODO:
// 1.- Definir rutas en router.
// 2.- Pasar "root element" a router.
// 3.- Invocar el router para renderizar la vista correcta.
// */
// //