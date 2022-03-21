import numpy as np
import pandas as pd
import json
from datetime import datetime, timedelta
from modules.tableFunctions import *
from configs.tarifs import varParameters, basicParameters

pd.set_option('display.max_rows', 50)

# numpy.busday_offset Można zdefiniować 1 a dobrze święta na podstawie tej funkcji --- ???
index = varParameters['diffVarPriceArray'][1]
# Create calculation table 
timeArray = np.empty([1,3])
baseTimePriceArray = datetime_range(np.datetime64('2020-01-01'), np.datetime64('2020-12-31'),np.timedelta64(15,'m'))
baseTimePriceArray_df = pd.DataFrame(baseTimePriceArray, columns=['Timestamp', 'Daytype'])
pd.to_datetime(baseTimePriceArray_df['Timestamp'])

for index in varParameters['diffVarPriceArray']:
    timeArray = np.append(timeArray, [dt for dt in datetime_test(np.datetime64(index['beginDate']), np.datetime64(index['endDate']),np.timedelta64(15,'m'),index['beginHour'], index['endHour'], index['price'])], axis=0)

timePeriods_df = pd.DataFrame(timeArray, columns=['Timestamp', 'Daytype', 'VariableFee'])

for key in basicParameters:
    timePeriods_df[key] = basicParameters[key]

#Merge table
timePeriods_df = timePeriods_df.tail(timePeriods_df.shape[0] -1)
timePeriods_df['Timestamp'] = pd.to_datetime(timePeriods_df['Timestamp'])
timePeriods_df = pd.merge(baseTimePriceArray_df,timePeriods_df,how="left",left_on=None, on=["Timestamp"], validate="one_to_one")
timePeriods_df['VariableFee'] = timePeriods_df['VariableFee'].fillna(varParameters['baseVarPrice'])
timePeriods_df.to_csv("timePeriods_df")
print('energyCalculator/dataFrames/timePeriods_df')
