import enum
import numpy as np
import os as os
from pathlib import Path
import pandas as pd
import json
from datetime import datetime, timedelta
import plotly.express as px
from modules.functions import *
from modules.createTables import *
from configs.tarifs import *
import plotly.graph_objects as go
from plotly.subplots import make_subplots
from configs.tarifs import basicParameters
import argparse
 
parser = argparse.ArgumentParser(description="Energu counter", formatter_class=argparse.ArgumentDefaultsHelpFormatter)
parser.add_argument("-p", "--priceTable", action="store_true", help="create table with prices")
parser.add_argument("-d", "--dataTable", action="store_true", help="create table with test data")
parser.add_argument("-m", "--mergeTables", action="store_true", help="create merged tables with data and prices")
parser.add_argument("-s", "--showChart", action="store_true", help="show active chart of calculated data")
parser.add_argument("-r", "--prepareRaport", action="store_true", help="prepare raport in pdf to send as email - TO DO")
args = vars(parser.parse_args())
print(args)

pd.set_option('display.max_columns', 5)
pd.set_option('display.max_rows', 20)

# if args['priceTable']:
createPriceTables('2021-01-01','2022-01-01', 15)
# if args['dataTable']:
#     createTestDataTable('2021-01-01','2022-01-01', 15)
# if args['mergeTables']:
# createCostTable("public/energyMeter/T_PL_B22","public/energyMeter/testData_df",'energyCost_df')
if args['showChart']:
    energyCostInTime_df = pd.read_csv('public/energyMeter/energyCost_df')
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