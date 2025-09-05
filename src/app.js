import { fetchContracts } from './api.js';
import { groupByYear, topSuppliers } from './data.js';
import { renderYearChart, renderSupplierChart } from './charts.js';

async function loadAllData(years) {
  const all = [];
  for (const year of years) {
    const contracts = await fetchContracts(year);
    all.push(...contracts);
  }
  return all;
}

function populateSelect(years) {
  const select = document.getElementById('yearSelect');
  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = 'Todos';
  select.appendChild(allOption);
  years.forEach(y => {
    const option = document.createElement('option');
    option.value = y;
    option.textContent = y;
    select.appendChild(option);
  });
}

function filterByYear(data, year) {
  if (year === 'all') return data;
  return data.filter(item => new Date(item.date).getFullYear().toString() === year);
}

async function init() {
  const current = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => current - i);
  populateSelect(years);

  const contracts = await loadAllData(years);
  renderYearChart(document.getElementById('yearChart'), groupByYear(contracts));
  renderSupplierChart(document.getElementById('supplierChart'), topSuppliers(contracts));

  document.getElementById('yearSelect').addEventListener('change', e => {
    const filtered = filterByYear(contracts, e.target.value);
    renderSupplierChart(document.getElementById('supplierChart'), topSuppliers(filtered));
  });
}

init();
