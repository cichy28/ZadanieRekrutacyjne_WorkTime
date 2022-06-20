import numpy as np
import pandas as pd
import os as os
from datetime import datetime, timedelta

# numpy.busday_offset Można zdefiniować 1 a dobrze święta na podstawie tej funkcji

def datetime_test(startingTimestamp, endingTimestamp, timestampIncrement, recordConfig, config):
    currentTimestamp = startingTimestamp
    # Loop thorugh whole dataset
    while currentTimestamp < endingTimestamp:
        timestamp = pd.to_datetime(str(currentTimestamp)).strftime("%H:%M")
        # Check if record is in the scope of config
        
        if (time_in_range(recordConfig['beginHour'], recordConfig['endHour'], timestamp)):
            workDay = np.is_busday(currentTimestamp.astype('datetime64[D]'),holidays=config['holidaysArray'])
            # Hollidays and weekends as offpeak prices
            if not workDay and config['weekendAsOffPeak']:
                yield [
                    currentTimestamp,
                    workDay,
                    config['varPrices'][recordConfig['offDayPriceTag']],
                    recordConfig['offDayPriceTag']]
            else:
                yield [
                    currentTimestamp,
                    workDay,
                    config['varPrices'][recordConfig['workDayPriceTag']],
                    recordConfig['workDayPriceTag']]
        currentTimestamp += timestampIncrement

def datetime_range(start, end, delta):
    current = start
    while current < end:
        yield [current, np.is_busday(current.astype('datetime64[D]'))]
        current += delta

def time_in_range(start, end, x):
    """Return true if x is in the range [start, end]"""
    if start <= end:
        return start <= x <= end
    else:
        return start <= x or x <= end

def absolutePath(path):
    return os.path.abspath(os.getcwd() + path)