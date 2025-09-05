import { groupByYear } from './data.js';

async function loadData() {
  const response = await fetch('./data/contracts.json');
  const data = await response.json();
  return data;
}

function renderChart(summary) {
  const ctx = document.getElementById('contractsChart');
  const chartData = {
    labels: Object.keys(summary),
    datasets: [
      {
        label: 'Contratos por ano',
        data: Object.values(summary),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1
      }
    ]
  };

  new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Contratos por Ano' }
      }
    }
  });
}

function populateSelect(years) {
  const select = document.getElementById('yearSelect');
  years.forEach(year => {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    select.appendChild(option);
  });
}

function filterData(data, year) {
  if (year === 'all') return data;
  return data.filter(item => new Date(item.date).getFullYear().toString() === year);
}

async function init() {
  const data = await loadData();
  const summary = groupByYear(data);
  populateSelect(Object.keys(summary));
  renderChart(summary);

  document.getElementById('yearSelect').addEventListener('change', (e) => {
    const filtered = filterData(data, e.target.value);
    const filteredSummary = groupByYear(filtered);
    renderChart(filteredSummary);
  });
}

init();
