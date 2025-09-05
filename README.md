# contrata-es

Dashboard interativo estilo BI para visualização de contratos públicos. Os dados são obtidos da API de Dados Abertos da Câmara dos Deputados e exibidos com gráficos dinâmicos via ECharts.

## Como executar

1. Abra `index.html` em um navegador moderno com acesso à internet.
2. O painel carrega os últimos cinco anos de contratos. Utilize o seletor de ano para filtrar e analisar os valores por fornecedor.
3. Se a API pública não estiver disponível, o sistema usa os dados de exemplo em `data/contracts.json`.

## Testes

Execute os testes unitários com:

```bash
npm test
```

Os testes verificam as funções de agregação responsáveis pelos gráficos.
