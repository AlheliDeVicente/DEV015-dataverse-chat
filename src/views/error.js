export const ERROR = (props) => {
  const viewEl = document.createElement("div")
  viewEl.innerHTML = `<main>
     <p> <strong> 404 </strong> That's an error </p>
   The requested URL was not found on this server.
   </main> `
   const title = document.querySelector("#pageTitle") 
   title.innerHTML = "Error 404"
   return viewEl
 };
