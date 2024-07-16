import { navigateTo } from "../router.js";
import {data} from "../data/dataset.js";
import { filterData, sortData, philosophersBeforeXIXStats, womenPhilosophersStats, analyticPhilosopherStats} from "../lib/dataFunctions.js";
export const HOME = (props) => {
  const el = document.createElement("div");
  el.innerHTML = `
    <header>
      <div id = "logo">
      <img src="assets/logo.png" alt="logo" id="logo"/>
      </div>
      <h1 id="title">σοφία αιώνια</h1>
      <button id="groupChat"> Chat Grupal </button>
      <button id="APIKey"> API Key </button>
    </header>
    <main>
      <h2>Explora y encuentra a tu filósofo preferido</h2>
      <input type="checkbox" id="btn-menu">
      <div class="search-section">
        <input type="text" class="nombreFilosofo" id="philosopherName" placeholder="search"/> 
        <button id="search">&#128269;</button>
        <button data-testid="button-clear">Limpiar</button>
        <label for="btn-menu" id="btn-label">filtros</label>
      </div>
      <div class="side-menu">
        <label id="close-btn" for="btn-menu">&times;</label>
        <aside class="filters">
        <label for="select-filter">Rama</label>
        <select id= "select-filter" data-testid="select-filter" name="branch">
          <option value="">Selecciona una rama</option>
          <option value="Ética">Ética</option>
          <option value="Teoría de género">Teoría de Género</option>
          <option value="Epistemología">Epistemología</option>
          <option value="Metafísica">Metafísica</option>
          <option value="Lógica">Lógica</option>
          <option value="Filosofía política">F. Política</option>
          <option value="Teología">Teología</option>
        </select>
        <label for="selectfilter1">Corriente</label>
        <select id= "selectfilter1" data-testid="select-filter1" name="type">
          <option value="">Selecciona una corriente</option>
          <option value="Empirismo">Empirismo</option>
          <option value="Idealismo alemán">Idealismo alemán</option>
          <option value="Racionalismo">Racionalismo</option>
          <option value="Existencialismo">Existencialismo</option>
          <option value="Idealismo">Idealismo</option>
          <option value="Escolástica">Escolástica</option>
        </select>
        <label for="select-filter2">Tradición</label>
        <select id="select-filter2" data-testid="select-filter2" name="classification">
          <option value="">Selecciona una tradición</option>
          <option value="Filosofía analítica">Analítica</option>
          <option value="Filosofía continental">Continental</option>
        </select>
      <label for="sort-order">Ordenar</label>
        <select id = "sort-order" data-testid="select-sort" name = "century">
          <option value = "asc">Más antiguo</option>
          <option value ="desc">Más reciente</option>
        </select>
      </aside> 
    </div>
      <section id="cards-container"></section>
      <button data-testid="show-stats" id="statsButton">Datos de interés</button>
      <section id="stats">
      <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
      <table class="columns">
        <tr>
          <td><div id="gender_chart_div"></div></td>
          <td><div id="class_chart_div"></div></td>
        </tr>
      </table>
    </section>
    </main>
  `; 
  const title = document.querySelector("#pageTitle") 
title.innerHTML = "Home"
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
const cards = el.getElementsByClassName("philosophersCard")
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


// se obtiene renderItems//
const ulElement = renderItems(data);
// se obtiene un elemento del DOM en donde se ponen los ul de renderItems//
cardsContainer.appendChild(ulElement);
//se declara la función filtered data que nos servirá para todas las demás funciones, esto fue una recomendación de las coaches//
let filteredData = data;
//función para cada una de las cards//
// cards.addEventListener("click", ()=>{
//   navigateTo("/individualChat")
// })
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
