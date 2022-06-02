import importlib
import logging
from wsgiref import headers
import numpy as np
import pandas as pd
import json
from datetime import datetime, timedelta
from datetime import datetime, timedelta
from modules.functions import *
from statistics import mean



def createPriceTables(startDate, endDate, deltaInMinutes, varParameters, basicParameters, priceTableName):
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
    pd.set_option('display.max_columns', None)
    timePeriods_df = timePeriods_df.tail(timePeriods_df.shape[0] -1)
    timePeriods_df['Timestamp'] = pd.to_datetime(timePeriods_df['Timestamp'])
    timePeriods_df = pd.merge(baseTimePriceArray_df,timePeriods_df,how="left", on=["Timestamp"], validate="one_to_one")
    timePeriods_df['VariableFee'] = timePeriods_df['VariableFee'].fillna(varParameters['baseVarPrice'])
    timePeriods_df.set_index('Timestamp')
    timePeriods_df.loc[startDate:endDate]
    priceTableName = varParameters['country'] + '_' + varParameters['tarifName'] + '_' + str(varParameters['year'])
    logging.info('Price table created - priceTableName ')
    timePeriods_df.to_csv('public/energyMeter/' + priceTableName)

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

def createCostTable(tarifConfigName, dataTableName, priceTableName, interval):
    # Get config
    _config = importlib.import_module('configs.'+ tarifConfigName)
    varParameters = _config.varParameters
    basicParameters = _config.basicParameters
    logging.info('Config ' + tarifConfigName + ' - loaded')
    # Get dataset
    parseDataTable(dataTableName) 
    energyUsageInTime_df = pd.read_csv("public/energyMeter/" + dataTableName + '_parsed')
    beginDate = pd.to_datetime(energyUsageInTime_df.head(1)['Timestamp'])
    endDate = pd.to_datetime(pd.DataFrame({'year': pd.DatetimeIndex(beginDate).year,
                   'month': 12,
                   'day': 31}))
    logging.info('Data ' + dataTableName + ' - loaded')
    # Log        
    createPriceTables(beginDate.iloc[0].strftime('%Y-%m-%d'), endDate.iloc[0].strftime('%Y-%m-%d'),interval, varParameters, basicParameters, priceTableName)     
    energyPricesInTime_df = pd.read_csv("public/energyMeter/" + tarifConfigName)
    print(energyUsageInTime_df)
    print(energyPricesInTime_df)
    energyCostInTime_df = pd.merge(energyPricesInTime_df,energyUsageInTime_df,how="left",left_on=None, on=["Timestamp"], validate="one_to_one")
    energyCostInTime_df['energyCost'] = energyCostInTime_df['ActivePowerConsumption'] * energyCostInTime_df['VariableFee']
    energyCostInTime_df.to_csv('public/energyMeter/' + priceTableName)
    return energyCostInTime_df

def parseDataTable(fileName):
    energyUsageInTime_df = pd.read_csv("public/energyMeter/" + fileName, header= 1)
    print(energyUsageInTime_df.dtypes)
    print(energyUsageInTime_df)
    energyUsageInTime_df['Timestamp'] = pd.to_datetime(energyUsageInTime_df['Timestamp'])
    energyUsageInTime_df = energyUsageInTime_df.sort_values(by='Timestamp',ascending=True)
    energyUsageInTime_df.set_index('Timestamp')

    test = energyUsageInTime_df.resample(rule='15T',on='Timestamp').agg({'ActivePowerConsumption': 'mean' })
    test.to_csv('public/energyMeter/' + fileName + '_parsed')
    return test