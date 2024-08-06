export const footer = () => {
  const componentFooter = document.createElement("footer");
  componentFooter.innerHTML = `<link id = "css" rel="stylesheet" href="footer.css"/>
  <div> &copy; Philosophy </div>` ;
  return componentFooter;
};
