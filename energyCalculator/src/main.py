import logging
import numpy as np
import os as os
from pathlib import Path
import pandas as pd
from datetime import datetime, timedelta
import plotly.express as px
from modules.functions import *
from modules.createTables import *
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import argparse
 
parser = argparse.ArgumentParser(description="Energy counter", formatter_class=argparse.ArgumentDefaultsHelpFormatter)
parser.add_argument('--config', required=True)
parser.add_argument('--dataset', required=True)
parser.add_argument("-d", "--dataTable", action="store_true", help="create table with random data")
parser.add_argument("-p", "--prepareData", action="store_true", help="create table with data and prices")
parser.add_argument("-s", "--showChart", action="store_true", help="show active chart of calculated data")
parser.add_argument("-r", "--prepareRaport", action="store_true", help="prepare raport in pdf to send as email - TO DO")
args = vars(parser.parse_args())
print(args)

logging.basicConfig(filename='energyCalculator.log', level=logging.INFO)
pd.set_option('display.max_columns', 5)
pd.set_option('display.max_rows', 20)


if args['dataTable']:
    createTestDataTable('2020-01-01','2021-01-01', 10)
if args['prepareData']:
    createCostTable(args['config'],args['dataset'],args['dataset'] + '_' + args['config'], 10)
if args['showChart']:
    pd.set_option('display.max_columns', None)
    energyCostInTime_df = pd.read_csv('public/energyMeter/' + args['dataset'] + '_' + args['config'])
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