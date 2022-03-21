import numpy as np
import pandas as pd
import json
from datetime import datetime, timedelta
from modules.tableFunctions import *
from configs.tarifs import *

dts = [dt for dt in 
       datetime_range(np.datetime64('2020-02-01'), np.datetime64('2020-02-16'),np.timedelta64(15,'m'))]
df = pd.DataFrame(dts, columns=['Timestamp', 'Daytype'])
# Add random values
df['ActivePowerConsumption'] = np.random.randint(20,30, size=len(df))
df['ReactivePowerConsumption'] = np.random.randint(5,10, size=len(df))
df['PowerFactor'] = np.random.rand(len(df))
df['OrderedPower'] = 10
df.to_csv("public/testData_df")