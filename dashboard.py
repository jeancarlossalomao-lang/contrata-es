import pandas as pd
import requests
from dash import Dash, dcc, html
import plotly.express as px


def fetch_contracts(limit: int = 50) -> pd.DataFrame:
    """Fetches contract data from Compras Gov API.

    Parameters
    ----------
    limit: int
        Number of records to request from the API.
    Returns
    -------
    pd.DataFrame
        Table with contract data or empty table when request fails.
    """
    url = "https://compras.dados.gov.br/contratos/v1/contratos.json"
    try:
        response = requests.get(url, params={"limit": limit}, timeout=10)
        response.raise_for_status()
        data = response.json()
        items = data.get("_embedded", {}).get("contratos", [])
        return pd.DataFrame(items)
    except Exception as exc:  # noqa: BLE001
        print(f"Falha ao buscar dados: {exc}")
        return pd.DataFrame()


def build_app() -> Dash:
    df = fetch_contracts()
    app = Dash(__name__)

    if df.empty:
        tab_content = html.Div("Sem dados para exibir.")
        tabs = [dcc.Tab(label="Contratos", children=tab_content)]
    else:
        df["data_assinatura"] = pd.to_datetime(df["data_assinatura"], errors="coerce")
        df["mes"] = df["data_assinatura"].dt.to_period("M").astype(str)

        fig_uasg = px.bar(
            df,
            x="uasg",
            y="valor_inicial",
            title="Valor inicial por UASG",
        )
        fig_mes = px.line(
            df.groupby("mes")[["valor_inicial"]].sum().reset_index(),
            x="mes",
            y="valor_inicial",
            title="Valor por mês",
        )

        tabs = [
            dcc.Tab(
                label="Contratos por UASG",
                children=html.Div([dcc.Graph(figure=fig_uasg)]),
            ),
            dcc.Tab(
                label="Valor por mês",
                children=html.Div([dcc.Graph(figure=fig_mes)]),
            ),
        ]

    app.layout = html.Div(
        [html.H1("Painel Compras Gov - Demo"), dcc.Tabs(tabs)]
    )
    return app


if __name__ == "__main__":
    app = build_app()
    app.run_server(debug=True)
