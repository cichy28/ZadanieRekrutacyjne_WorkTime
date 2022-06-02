import importlib
import numpy as np
import pandas as pd
from modules.functions import *
import logging
import plotly.express as px
from modules.functions import *
from modules.createTables import *
from modules.showCharts import *
import plotly.graph_objects as go
from plotly.subplots import make_subplots

def showPriceChart(tarifConfigName, datasetName):
    # Get config
    _config = importlib.import_module('configs.'+ tarifConfigName)
    basicParameters = _config.basicParameters
    logging.info('Config ' + tarifConfigName + ' - loaded')
    pd.set_option('display.max_columns', None)
    energyCostInTime_df = pd.read_csv('public/energyMeter/' + datasetName + '_' + tarifConfigName)
    print(energyCostInTime_df)
    fig = make_subplots(rows=4, cols=1,
                        specs=[[{"type": "scatter"}],[{"type": "scatter"}],[{"type": "scatter"}],[{"type": "table"}]],
                        shared_xaxes=True,
                        vertical_spacing=0.05,                 
    )
    
    # Add traces
    fig.add_trace(
        go.Scatter(x= energyCostInTime_df['Timestamp'], y=energyCostInTime_df['energyCost'], name="energyCost"),
        row=1, col=1, secondary_y=False,
    )

    fig.add_trace(
        go.Scatter(x= energyCostInTime_df['Timestamp'], y=energyCostInTime_df['VariableFee'], name="VariableFee"),
        row=2, col=1, secondary_y=False,
    )

    fig.add_trace(
        go.Scatter(x= energyCostInTime_df['Timestamp'], y=energyCostInTime_df['ActivePowerConsumption'], name="ActivePowerConsumption"),
        row=3, col=1, secondary_y=False,
    )

    paramsNames = []
    paramsValues = []
    params = []
    for piece in basicParameters:
        paramsNames.append(piece)
        paramsValues.append(basicParameters.get(piece))
    params.append(paramsNames)
    params.append(paramsValues)

    fig.add_trace(
        go.Table(
            header=dict(
                values=["ParameterName", "Value"],
                font=dict(size=10),
                align="left"
            ),
            cells=dict(
                values=params,
                align = "left")
        ),
        row=4, col=1
    )
    fig.show()

def showPricePerMonth(tarifConfigName, datasetName):
    # Get config
    _config = importlib.import_module('configs.'+ tarifConfigName)
    basicParameters = _config.basicParameters
    logging.info('Config ' + tarifConfigName + ' - loaded')
    pd.set_option('display.max_columns', None)
    energyCostInTime_df = pd.read_csv('public/energyMeter/' + datasetName + '_' + tarifConfigName)
    energyCostInTime_df['Timestamp'] = pd.to_datetime(energyCostInTime_df['Timestamp'])
    energyCostInTime_df.set_index('Timestamp')
    energyCostInTime_df = energyCostInTime_df.resample(rule='M',on='Timestamp').agg({'ActivePowerConsumption': 'sum', 'energyCost': 'sum'})
    energyCostInTime_df = energyCostInTime_df.reset_index(level=0)
    print(energyCostInTime_df)
    fig = px.bar(energyCostInTime_df, x='Timestamp', y='energyCost')
    fig.show()

    # fig = make_subplots(rows=4, cols=1,
    #                     specs=[[{"type": "scatter"}],[{"type": "scatter"}],[{"type": "scatter"}],[{"type": "table"}]],
    #                     shared_xaxes=True,
    #                     vertical_spacing=0.05,                 
    # )
    
    # # Add traces
    # fig.add_trace(
    #     go.Scatter(x= energyCostInTime_df['Timestamp'], y=energyCostInTime_df['energyCost'], name="energyCost"),
    #     row=1, col=1, secondary_y=False,
    # )

    # fig.add_trace(
    #     go.Scatter(x= energyCostInTime_df['Timestamp'], y=energyCostInTime_df['VariableFee'], name="VariableFee"),
    #     row=2, col=1, secondary_y=False,
    # )

    # fig.add_trace(
    #     go.Scatter(x= energyCostInTime_df['Timestamp'], y=energyCostInTime_df['ActivePowerConsumption'], name="ActivePowerConsumption"),
    #     row=3, col=1, secondary_y=False,
    # )

    # paramsNames = []
    # paramsValues = []
    # params = []
    # for piece in basicParameters:
    #     paramsNames.append(piece)
    #     paramsValues.append(basicParameters.get(piece))
    # params.append(paramsNames)
    # params.append(paramsValues)

    # fig.add_trace(
    #     go.Table(
    #         header=dict(
    #             values=["ParameterName", "Value"],
    #             font=dict(size=10),
    #             align="left"
    #         ),
    #         cells=dict(
    #             values=params,
    #             align = "left")
    #     ),
    #     row=4, col=1
    # )
    # fig.show()

    