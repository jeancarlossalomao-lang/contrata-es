const API_BASE = 'https://dadosabertos.camara.leg.br/api/v2/contratos';

export async function fetchContracts(year) {
  const url = `${API_BASE}?ano=${year}&itens=100`;
  try {
    const res = await fetch(url, { headers: { accept: 'application/json' } });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    const json = await res.json();
    return json.dados.map(item => ({
      id: item.id,
      value: item.valorInicial,
      date: item.dataInicioVigencia,
      supplier: item.contratada?.nome || 'Desconhecido'
    }));
  } catch (err) {
    console.warn('Falha ao acessar API pública, usando dados locais', err);
    const local = await fetch('./data/contracts.json');
    return await local.json();
  }
}
