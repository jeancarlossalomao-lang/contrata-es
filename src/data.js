export function groupByYear(contracts) {
  return contracts.reduce((acc, contract) => {
    const year = new Date(contract.date).getFullYear();
    acc[year] = (acc[year] || 0) + Number(contract.value || contract.valor || 0);
    return acc;
  }, {});
}

export function topSuppliers(contracts, limit = 5) {
  const totals = contracts.reduce((acc, contract) => {
    const supplier = contract.supplier || contract.fornecedor || 'Desconhecido';
    acc[supplier] = (acc[supplier] || 0) + Number(contract.value || contract.valor || 0);
    return acc;
  }, {});

  return Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .reduce((acc, [name, value]) => {
      acc[name] = value;
      return acc;
    }, {});
}
