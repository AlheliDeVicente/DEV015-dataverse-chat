let ROUTES = {};
let rootEl;
//Establece el elemento raíz donde se representarán las vistas//
export const setRootEl = (el) => {
  //assign rootEL
  rootEl = el;
  return rootEl 
};
//Asigna el valor del argumento routes al objeto ROUTES//
export const setRoutes = (routes) => {
  //optional Throw errors if routes isn't an object
  //optional Throw errors if routes doesn't define an /error route
  //assign ROUTES
  ROUTES = routes;
  return ROUTES
};
// Convierte el valor de queryString y devuelve un objeto de pares key/value creados a partir de queryString//
export const queryStringToObject = (queryString) => {
  //convert query string to URLSearchParams
  const params = new URLSearchParams(queryString);
  //conver URL params to an object
  const objectParams = Object.fromEntries(params);
  //return the object
  return objectParams;
};
// Representa una vista en el elemento raíz especificado. Borra el contenido existente, busca la función de vista para el nombre de ruta y luego busca la vista.//
export const renderView = (pathname, props = {}) => {
  //clear the root element
  rootEl.innerHTML = "";
  //find the correct view in ROUTES for the pathname and in case not found render the error view
  const view = ROUTES[pathname] || ROUTES["/error"];
  //render the correct view passing the value of props
  const component = view(props);
  //add the view element to the DOM root element
  return rootEl.appendChild(component);
};
//Se utiliza para navegar mediante programación a una nueva ruta dentro del SPA//
export const navigateTo = (pathname, props = {}) => {
  const params = new URLSearchParams(props) //pasa los props, que pueden ser querystrings, a una searchParam//
  const URL = `${pathname}?${params.toString()}` //se crea la url con pathname + params// acá necesario hacerlo query y no como objetos porque debemos crear una URL para que se guarde en el historial de navegación y se muestre//
  //update window history with pushState
  window.history.pushState({}, "", URL); 
  //render the view with the pathname and props
  return renderView(pathname, props); //se usa como objeto otra vez porque así está renderview y porque para renderizar vistas es más fácil con objetos//
};
//Maneja cambios de URL con popstate y también cuando el app carga la primera vez. Cuando la URL cambia, analiza el pathname y la search desde la location (window.location) y luego llama a renderView//
export const onURLChange = (location) => { 
  // parse the location for the path name
  const pathname = location.pathname;
  //parse the location for the search params
  const params = location.search;
  //convert the search params to an object with queryToObject
  const objectParams = queryStringToObject(params);
  //render the view with the pathname and object
  return renderView(pathname, objectParams);
};

