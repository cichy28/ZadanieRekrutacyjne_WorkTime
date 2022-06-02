import pandas as pd
from statistics import mean

energyUsageInTime_df = pd.read_csv("public/energyMeter/data.csv")
energyUsageInTime_df['Date/time UTC'] = pd.to_datetime(energyUsageInTime_df['Date/time UTC'])
energyUsageInTime_df = energyUsageInTime_df.sort_values(by='Date/time UTC',ascending=True)
energyUsageInTime_df.set_index('Date/time UTC')
# Tutaj coś trzeba z funkcją pokombinować 
test = energyUsageInTime_df.resample(rule='15T',on='Date/time UTC').agg({'Active energy Wh': 'mean', 'Returned energy Wh': 'mean' })
test.to_csv('public/energyMeter/' + 'test')
print(test)