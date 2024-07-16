export const main = `
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
</section>`