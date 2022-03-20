import numpy as np
import pandas as pd
import json
from datetime import datetime, timedelta
import plotly.express as px
from modules.tableFunctions import *
from configs.tarifs import *
import plotly.graph_objects as go
from plotly.subplots import make_subplots
from configs.tarifs import basicParameters
import os


cwd = os.getcwd()
print(cwd)
pd.set_option('display.max_columns', 5)
pd.set_option('display.max_rows', 20)


energyPricesInTime_df = pd.read_csv("public/timePeriods_df")
energyUsageInTime_df = pd.read_csv("public/testData_df")
energyCostInTime_df = pd.merge(energyUsageInTime_df,energyPricesInTime_df,how="left",left_on=None, on=["Timestamp"], validate="one_to_one")
energyCostInTime_df['energyCost'] = energyCostInTime_df['ActivePowerConsumption'] * energyCostInTime_df['VariableFee']



# Show data on chart
# Create figure with secondary y-axis

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
print(params)

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