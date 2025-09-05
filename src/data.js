export function groupByYear(contracts) {
  return contracts.reduce((acc, contract) => {
    const year = new Date(contract.date).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});
}
