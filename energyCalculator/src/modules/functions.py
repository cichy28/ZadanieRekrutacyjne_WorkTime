import numpy as np
import pandas as pd
import os as os
from datetime import datetime, timedelta

# numpy.busday_offset Można zdefiniować 1 a dobrze święta na podstawie tej funkcji

def datetime_test(start, end, delta, begintime, endtime, price, priceClassifier, weekendAsOffPeak, holidaysArray, baseVarPrice, baseVarClassifier):
    current = start
    # Loop thorugh whole dataset
    while current < end:
        timestamp = pd.to_datetime(str(current)).strftime("%H:%M")
        # Check if record is in the scope of config
        if (time_in_range(begintime, endtime, timestamp)):
            workDay = np.is_busday(current.astype('datetime64[D]'),holidays=holidaysArray)
            # Hollidays and weekends as offpeak prices
            if not workDay and weekendAsOffPeak:
                yield [current, workDay, baseVarPrice, baseVarClassifier]
            else:
                yield [current, workDay, price, priceClassifier]
        current += delta

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