import * as echarts from 'https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.esm.min.js';

let charts = {};

export function renderYearChart(element, data) {
  if (charts.year) charts.year.dispose();
  charts.year = echarts.init(element);
  charts.year.setOption({
    tooltip: { trigger: 'axis', formatter: '{b}: R$ {c}' },
    xAxis: { type: 'category', data: Object.keys(data) },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: Object.values(data), color: '#5470C6' }]
  });
}

export function renderSupplierChart(element, data) {
  if (charts.supplier) charts.supplier.dispose();
  charts.supplier = echarts.init(element);
  charts.supplier.setOption({
    tooltip: { trigger: 'item', formatter: '{b}: R$ {c}' },
    series: [{
      type: 'pie',
      radius: '70%',
      data: Object.entries(data).map(([name, value]) => ({ name, value })),
      emphasis: {
        itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' }
      }
    }]
  });
}
