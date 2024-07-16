import { navigateTo } from "../router.js";
import {data} from "../data/dataset.js";
import { filterData, sortData, philosophersBeforeXIXStats, womenPhilosophersStats, analyticPhilosopherStats} from "../lib/dataFunctions.js";
import { header } from "../components/header.js";
import { main } from "../components/selects.js";
import { footer } from "../components/footer.js";
export const HOME = (props) => {
  const el = document.createElement("div");
  el.innerHTML =  `<header> ${header} </header>
  <main> ${main} </main>
  <footer> ${footer} </footer>` 

  const renderItems = (data) => {
    //crear ul en donde se pondrán las li//
    const ul = document.createElement("ul");
    ul.setAttribute("class", "philosophersList")
    ul.setAttribute("style", "padding-right:40px")
    //método forEach para crear un li para cada objeto del array//
    data.forEach(function (philosophers) {
      const card = document.createElement("li");
      //atriburos de microdatos//
      card.setAttribute("itemscope", "");
      card.setAttribute("itemtype", "https://schema.org/Person");
      card.setAttribute("class", "philosophersCard");
      card.setAttribute("data-id", philosophers.id)
      //insertar contenido html al li//
      card.innerHTML = `
      <div class = "image-container">
        <img src="${philosophers.imageUrl}" alt="${philosophers.name}" itemprop="image"/>
        <h3 itemprop="givenName"><strong>${philosophers.name}</strong></h3>
      </div>
      <div class ="info">
      <p itemprop="description"> ${philosophers.shortDescription}</p>
      <p itemprop="branchOfPhilosophy"><strong>Ramas de la filosofía:</strong> ${philosophers.branchOfPhilosophy.join(", ")}</p>
      <p itemprop="typeOfPhilosophy"><strong>Corrientes:</strong> ${philosophers.typeOfPhilosophy.join(", ")}</p>
      <p itemprop="classification"><strong>Tradición:</strong> ${philosophers.facts.classification}</p>
      <p itemprop="century"><strong>Siglo:</strong> ${philosophers.facts.century}</p>
      <div itemprop="mainWorks">
      <h4>Obras Principales</h4> 
       ${philosophers.mainWorks
      .map((work) =>
        `<p> <i>  ${work.title} </i> —  ${work.year}</p>`).join(" ")} 
      </div>
      </div>
      `;
      //agregar tarjeta al ul//
      ul.appendChild(card);
    });
    return ul;
  };
  renderItems;

  //obtener TODOS los botones, barras, selectores, etc//
const title = document.querySelector("#pageTitle") 
const searchName = el.querySelector("#philosopherName")
const searchButton =el.querySelector("#search")
const branchSelector = el.querySelector('[data-testid="select-filter"]');
const orderSelector = el.querySelector('[data-testid="select-sort"]');
const typeSelector = el.querySelector('[data-testid="select-filter1"]');
const cleanButton = el.querySelector('[data-testid="button-clear"]');
const statsButton = el.querySelector('[data-testid="show-stats"]');
const statsSection = el.querySelector("#stats");
const classSelector = el.querySelector('[data-testid="select-filter2"]');
const cardsContainer = el.querySelector("#cards-container");
const groupChatBttn = el.querySelector("#groupChat");
const apiKeyButton = el.querySelector("#APIKey");
const logo = el.querySelector("#logo")
//cambiar el titulo de la pestaña//
title.innerHTML = "Home"
//funcion apra cada tarjeta//
const addCardListeners = () => {
  const cards = el.querySelectorAll(".philosophersCard");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const cardID = card.getAttribute('data-id')
      console.log(`Card with id ${cardID} clicked`);
      navigateTo("/individualChat", `{id: ${cardID}}`);
    });
  });
};

// se obtiene renderItems//
const ulElement = renderItems(data);
// se obtiene un elemento del DOM en donde se ponen los ul de renderItems//
cardsContainer.appendChild(ulElement);
addCardListeners()
//se declara la función filtered data que nos servirá para todas las demás funciones, esto fue una recomendación de las coaches//
let filteredData = data;
//función para cada una de las cards//

//boton para ir a la vista de chatGrupal
groupChatBttn.addEventListener("click", () => {
  navigateTo("/chatGrupal");
});
//boton para ir a la vista de API Key
apiKeyButton.addEventListener("click", () => {
  navigateTo("/apiKey");
});
//Logo para regresar a página principal
logo.addEventListener("click", ()=>{
  navigateTo("/")
})
//función de filtrado por nombre//
searchButton.addEventListener("click",()=>{
  const nameSelected = searchName.value
  filteredData = filterData(data, "name", nameSelected)
  cardsContainer.innerHTML=""
  const ulElement=renderItems(filteredData)
  cardsContainer.appendChild(ulElement)
})

//para que la barra de busqueda funcione con enter
searchName.addEventListener("keypress", (event)=>{
  if(event.key === "Enter"){
    const nameSelected = searchName.value
    filteredData = filterData(data, "name", nameSelected)
    cardsContainer.innerHTML=""
    const ulElement=renderItems(filteredData)
    cardsContainer.appendChild(ulElement)
  }})

//función de filtrado por rama//
branchSelector.addEventListener("change", () => {
  //evento change registra cambios en la selección//
  const branchSelected = branchSelector.value; //el branch selected es el value que tenga en ese momento la option del selector//
  filteredData = filterData(data, "branchOfPhilosophy", branchSelected); //variable de filter data obtiene el valor de la data pasada por la función//
  cardsContainer.innerHTML=""
  const ulElement=renderItems(filteredData) //UlElement ahora tiene la data filtrada//
  cardsContainer.appendChild(ulElement) //se pone en la sección root//
});

//función de filtrado por tipo//
typeSelector.addEventListener("change", () => {
  //evento change registra cambios en la selección//
  const typeSelected = typeSelector.value;
  filteredData = filterData(filteredData, "typeOfPhilosophy", typeSelected);
  cardsContainer.innerHTML=""
  const ulElement=renderItems(filteredData)
  cardsContainer.appendChild(ulElement);
});

//función de filtrado por tradición//
classSelector.addEventListener("change", () => {
  //evento change registra cambios en la selección//
  const classSelected = classSelector.value;
  filteredData = filterData(filteredData, "classification", classSelected);
  cardsContainer.innerHTML = ""
  const ulElement=renderItems(filteredData);
  cardsContainer.append(ulElement)
});

//fución para ordenar, se le añade un event listener a cada uno de los radiobuttons//
orderSelector.addEventListener("change", () => {
  //evento change registra cambios en la selección//
  const orderSelected = orderSelector.value;
  const sortedData = sortData(filteredData, "century", orderSelected);
  cardsContainer.innerHTML = ""
  const ulElement=renderItems(sortedData);
  cardsContainer.append(ulElement)
});
//boton de limpiar//
cleanButton.addEventListener("click", () => {
  typeSelector.value = ""; //se le da el valor "" a los filtros//
  branchSelector.value = ""; //se le da el valor "" a los filtros//
  classSelector.value = ""; //se le da el valor "" a los filtros//
  searchName.value = ""
  filteredData = data; //la variable data es toda la data//
  statsSection.innerHTML = "";
  cardsContainer.innerHTML = ""
  cardsContainer.appendChild(renderItems(filteredData)); //se muestra toda la data//
})

//boton de mostrar data//
statsButton.addEventListener("click", () => {
  const statsParagraphs = document.createElement("p");
  const womenPhilosophers = womenPhilosophersStats(data)
  const philosophersBeforeXIX = philosophersBeforeXIXStats(data);
  const analyticPhilosopher = analyticPhilosopherStats(data)
  statsParagraphs.innerHTML = `<p> Hay un promedio de ${womenPhilosophers} mujeres filosofas</p>  
  <p> Alrededor de ${philosophersBeforeXIX}% de los filósofos son anteriores al siglo XIX</p>
  <p> Hay un promedio de ${analyticPhilosopher} filósofos analítcos `;
  statsSection.appendChild(statsParagraphs); // Añadir el p al cuerpo del documento//
  
  google.charts.load('current', {'packages':['corechart']});//crear gráficos//
  google.charts.setOnLoadCallback(drawGenderChart);
  google.charts.setOnLoadCallback(drawClassificationChart);
  function drawGenderChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Gender');
    data.addColumn('number', 'Philosophers');
    data.addRows([
      ['Women', 2],
      ['Men', 22],
    ]);
    var options = {
      title: 'Filósofos por género',
      is3D: true,
      width: 300,
      height: 240,
      backgroundColor: 'transparent',
      colors: ["#8C342B", "#59352D", "#854738", "#D98E73", "#D9BBA9", "#B56449"]
    };
    var chart = new google.visualization.PieChart(document.getElementById('gender_chart_div'));
    chart.draw(data, options);
  }
  function drawClassificationChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Classification');
    data.addColumn('number', 'Philosophers');
    data.addRows([
      ['Analítica', 4],
      ['Continental', 20],
    ]);
    var options = {
      title: 'Filósofos por tradición',
      is3D: true,
      width: 300,
      height: 240,
      backgroundColor: 'transparent',
      colors: ["#8C342B", "#59352D", "#854738", "#D98E73", "#D9BBA9", "#B56449"]
    };
    var chart = new google.visualization.PieChart(document.getElementById('class_chart_div'));
    chart.draw(data, options);
  }
});

  return el;
};
