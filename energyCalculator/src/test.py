import pandas as pd
from statistics import mean

energyUsageInTime_df = pd.read_csv("public/energyMeter/data.csv")
energyUsageInTime_df['Date/time UTC'] = pd.to_datetime(energyUsageInTime_df['Date/time UTC'])
energyUsageInTime_df.set_index('Date/time UTC')
print(energyUsageInTime_df)
# Tutaj coś trzeba z funkcją pokombinować 
test = energyUsageInTime_df.resample(rule='15T',on='Date/time UTC').agg({'Active energy Wh': 'mean', 'Returned energy Wh': 'sum' })
print(test)