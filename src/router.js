let ROUTES = {};
let rootEl;

export const setRootEl = (el) => {
  //assign rootEL
  rootEl = el; 
};

export const setRoutes = (routes) => {
  //optional Throw errors if routes isn't an object
  //optional Throw errors if routes doesn't define an /error route
  //assign ROUTES
  ROUTES = routes;
};

const queryStringToObject = (queryString) => {
  //convert query string to URLSearchParams
  const params = new URLSearchParams(queryString);
  //conver URL params to an object
  const objectParams = Object.fromEntries(params);
  //return the object
  return objectParams;
};

const renderView = (pathname, props = {}) => {
  //clear the root element
  rootEl.innerHTML = "";
  //find the correct view in ROUTES for the pathname and in case not found render the error view
  const view = ROUTES[pathname] || ROUTES["/error"];
  //render the correct view passing the value of props
  const component = view(props);
  //add the view element to the DOM root element
  rootEl.appendChild(component);
};

export const navigateTo = (pathname, props = {}) => {
  const params = new URLSearchParams(props)
  const URL = `${pathname}?${params.toString()}`
  //update window history with pushState
  window.history.pushState({}, "", URL); 
  //render the view with the pathname and props
  renderView(pathname, props);

};

export const onURLChange = (location) => {
  // parse the location for the path name
  const pathname = location.pathname;
  //parse the location for the search params
  const params = location.search;
  //convert the search params to an object with queryToObject
  const objectParams = queryStringToObject(params);
  //render the view with the pathname and object
  renderView(pathname, objectParams);
};

