import numpy as np
import pandas as pd
import os as os
from datetime import datetime, timedelta

# numpy.busday_offset Można zdefiniować 1 a dobrze święta na podstawie tej funkcji
holidaysArray = ['2011-07-01', '2011-07-04', '2011-07-17']

def datetime_test(start, end, delta, begintime, endtime, price, priceClassifier):
    current = start
    while current < end:
        timestamp = pd.to_datetime(str(current)).strftime("%H:%M")
        if (time_in_range(begintime, endtime, timestamp)):
            yield [current, np.is_busday(current.astype('datetime64[D]'),holidays=holidaysArray), price, priceClassifier]
        current += delta

def datetime_range(start, end, delta):
    current = start
    while current < end:
        yield [current, np.is_busday(current.astype('datetime64[D]'),holidays=holidaysArray)]
        current += delta

def time_in_range(start, end, x):
    """Return true if x is in the range [start, end]"""
    if start <= end:
        return start <= x <= end
    else:
        return start <= x or x <= end

def absolutePath(path):
    return os.path.abspath(os.getcwd() + path)