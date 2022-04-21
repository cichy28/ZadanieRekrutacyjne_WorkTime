import numpy as np

basicParameters = {
    'price_Quality': 1,
    'price_Temporary': 2,
    'price_OZE': 2.20,
    'price_Kogeneracja': 0,
    'price_Mocowa': 0.0762,
}

varParameters = {
    'country': 'PL',
    'tarifName': 'B22',
    'baseVarPrice': 100,
    'price_Stała': 14.04,
    'price_Przejsciowa': 0.19,
    'price_Jakosciowa': 10.18,
    'price_Abonamentowa': 10.00,
    'diffVarPriceArray': [
        {
            'name': 'DziennySzczytowy_1',
            'beginDate': np.datetime64('2020-01-01'),
            'endDate': np.datetime64('2020-12-31'),
            'beginHour': '08:00',
            'endHour': '10:59',
            'price': 93.72
        },
        {
            'name': 'NoncnyPozaszczytowy_1',
            'beginDate': np.datetime64('2020-01-01'),
            'endDate': np.datetime64('2020-12-31'),
            'beginHour': '21:00',
            'endHour': '23:59',
            'price': 93.72
        },
        {
            'name': 'NoncnyPozaszczytowy_2',
            'beginDate': np.datetime64('2020-01-01'),
            'endDate': np.datetime64('2020-12-31'),
            'beginHour': '00:00',
            'endHour': '07:59',
            'price': 93.72
        },
        {
            'name': 'NoncnyPozaszczytowy_3',
            'beginDate': np.datetime64('2020-01-01'),
            'endDate': np.datetime64('2020-03-01') - np.timedelta64(1,'D'),
            'beginHour': '11:00',
            'endHour': '15:59',
            'price': 47.41
        },
        {
            'name': 'NoncnyPozaszczytowy_4',
            'beginDate': np.datetime64('2020-03-01'),
            'endDate': np.datetime64('2020-03-31'),
            'beginHour': '11:00',
            'endHour': '17:59',
            'price': 47.41
        },
        {
            'name': 'NoncnyPozaszczytowy_5',
            'beginDate': np.datetime64('2020-04-01'),
            'endDate': np.datetime64('2020-04-30'),
            'beginHour': '11:00',
            'endHour': '18:59',
            'price': 47.41
        },
        {
            'name': 'NoncnyPozaszczytowy_6',
            'beginDate': np.datetime64('2020-05-01'),
            'endDate': np.datetime64('2020-08-31'),
            'beginHour': '11:00',
            'endHour': '19:59',
            'price': 47.41
        },
        {
            'name': 'NoncnyPozaszczytowy_7',
            'beginDate': np.datetime64('2020-09-01'),
            'endDate': np.datetime64('2020-09-30'),
            'beginHour': '11:00',
            'endHour': '18:59',
            'price': 47.41
        },
        {
            'name': 'NoncnyPozaszczytowy_8',
            'beginDate': np.datetime64('2020-10-01'),
            'endDate': np.datetime64('2020-10-31'),
            'beginHour': '11:00',
            'endHour': '17:59',
            'price': 47.41
        },
        {
            'name': 'NoncnyPozaszczytowy_9',
            'beginDate': np.datetime64('2020-11-01'),
            'endDate': np.datetime64('2020-12-31'),
            'beginHour': '11:00',
            'endHour': '15:59',
            'price': 47.41
        },
    ]
}