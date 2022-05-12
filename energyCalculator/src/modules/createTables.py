from importlib.resources import path
import numpy as np
import pandas as pd
import json
from datetime import datetime, timedelta
from configs.tarifs import varParameters, basicParameters
from datetime import datetime, timedelta
from modules.functions import *



def createPriceTables(startDate, endDate, deltaInMinutes):
    index = varParameters['diffVarPriceArray'][1]
    # Create table with empty records
    timeArray = np.empty([1,3])
    baseTimePriceArray = datetime_range(np.datetime64(startDate), np.datetime64(endDate),np.timedelta64(deltaInMinutes,'m'))
    baseTimePriceArray_df = pd.DataFrame(baseTimePriceArray, columns=['Timestamp', 'Daytype'])
    pd.to_datetime(baseTimePriceArray_df['Timestamp'])

    for index in varParameters['diffVarPriceArray']:
        timeArray = np.append(timeArray, [dt for dt in datetime_test(np.datetime64(index['beginDate']), np.datetime64(index['endDate']),np.timedelta64(deltaInMinutes,'m'),index['beginHour'], index['endHour'], index['price'])], axis=0)

    timePeriods_df = pd.DataFrame(timeArray, columns=['Timestamp', 'Daytype', 'VariableFee'])

    for key in basicParameters:
        timePeriods_df[key] = basicParameters[key]

    #Merge table
    timePeriods_df = timePeriods_df.tail(timePeriods_df.shape[0] -1)
    timePeriods_df['Timestamp'] = pd.to_datetime(timePeriods_df['Timestamp'])
    timePeriods_df = pd.merge(baseTimePriceArray_df,timePeriods_df,how="left",left_on=None, on=["Timestamp"], validate="one_to_one")
    timePeriods_df['VariableFee'] = timePeriods_df['VariableFee'].fillna(varParameters['baseVarPrice'])
    timePeriods_df.set_index('Timestamp')
    timePeriods_df.to_csv('public/energyMeter/' + 'T_' + varParameters['country'] + '_' + varParameters['tarifName'])
    print('energyCalculator/dataFrames/timePeriods_df')

def createTestDataTable(startDate, endDate, deltaInMinutes):
    dts = [dt for dt in 
        datetime_range(np.datetime64(startDate), np.datetime64(endDate),np.timedelta64(deltaInMinutes,'m'))]
    df = pd.DataFrame(dts, columns=['Timestamp', 'Daytype'])
    # Add random values
    df['ActivePowerConsumption'] = np.random.randint(20,30, size=len(df))
    df['ReactivePowerConsumption'] = np.random.randint(5,10, size=len(df))
    df['PowerFactor'] = np.random.rand(len(df))
    df['OrderedPower'] = 10
    df.to_csv("public/energyMeter/testData_df")

def createCostTable(priceTablePath, dataTablePath, datasetName):
    
    energyPricesInTime_df = pd.read_csv(priceTablePath)
    energyUsageInTime_df = pd.read_csv(dataTablePath)
    energyCostInTime_df = pd.merge(energyUsageInTime_df,energyPricesInTime_df,how="left",left_on=None, on=["Timestamp"], validate="one_to_one")
    energyCostInTime_df['energyCost'] = energyCostInTime_df['ActivePowerConsumption'] * energyCostInTime_df['VariableFee']
    energyCostInTime_df.to_csv('public/energyMeter/' + datasetName)
    return energyCostInTime_df

