import numpy as np
# Skrypt wylicza cenwy w pln/kwh

# EO - lato - 1 kwietnia - 30 września
# EO - Zima_1 - 1 pąździernika - 31marca
# 

basicParameters = {
    'price_Quality': 1,
    'price_Temporary': 2,
    'price_OZE': 2.20,
    'price_Kogeneracja': 0,
    'price_Mocowa': 0.0762,
}

varParameters = {
    'country': 'PL',
    'tarifName': 'B23',
    'year': 2019,
    'baseVarPrice': 100,
    'price_Stała': 14.45,
    'price_Przejsciowa': 0.19,
    'price_Jakosciowa': 13.00,
    'price_Abonamentowa': 10.00,
    'diffVarPriceMultiplyer': 0.001, #Mnożnik liczący z Mwh na Kwh
    'diffVarPriceArray': [
        {
            'id': 'Lato_szczyt_przedpołudniowy',
            'beginDate': np.datetime64('2019-04-01'),
            'endDate': np.datetime64('2019-09-30'),
            'beginHour': '07:00',
            'endHour': '12:59',
            'price': 51.84,
            'tag': 'Szczyt przepołudniowy'
        },
                {
            'id': 'Lato_szczyt_popołudniowy',
            'beginDate': np.datetime64('2019-04-01'),
            'endDate': np.datetime64('2019-09-30'),
            'beginHour': '19:00',
            'endHour': '21:59',
            'price': 63.96,
            'tag': 'Szczyt popołudniowy'
        },
        {
            'id': 'Lato_pozaszczytowy_1',
            'beginDate': np.datetime64('2019-04-01'),
            'endDate': np.datetime64('2019-09-30'),
            'beginHour': '13:00',
            'endHour': '18:59',
            'price': 19.95,
            'tag': 'Pozaszczytowy'
        },
        {
            'id': 'Lato_pozaszczytowy_2',
            'beginDate': np.datetime64('2019-04-01'),
            'endDate': np.datetime64('2019-09-30'),
            'beginHour': '00:00',
            'endHour': '06:59',
            'price': 19.95,
            'tag': 'Pozaszczytowy'
        },
        {
            'id': 'Lato_pozaszczytowy_3',
            'beginDate': np.datetime64('2019-04-01'),
            'endDate': np.datetime64('2019-09-30'),
            'beginHour': '22:00',
            'endHour': '23:59',
            'price': 19.95,
            'tag': 'Pozaszczytowy'
        },
        {
            'id': 'Zima_1_szczyt_przedpołudniowy',
            'beginDate': np.datetime64('2019-01-01'),
            'endDate': np.datetime64('2019-03-31'),
            'beginHour': '07:00',
            'endHour': '12:59',
            'price': 52.36,
            'tag': 'Szczyt przepołudniowy'
        },
        {
            'id': 'Zima_1_szczyt_popołudniowy',
            'beginDate': np.datetime64('2019-01-01'),
            'endDate': np.datetime64('2019-03-31'),
            'beginHour': '16:00',
            'endHour': '20:59',
            'price': 64.03,
            'tag': 'Szczyt popołudniowy'
        },
        {
            'id': 'Zima_1_pozaszczytowy_1',
            'beginDate': np.datetime64('2019-01-01'),
            'endDate': np.datetime64('2019-03-31'),
            'beginHour': '13:00',
            'endHour': '15:59',
            'price': 23.81,
            'tag': 'Pozaszczytowy'
        },
        {
            'id': 'Zima_1_pozaszczytowy_2',
            'beginDate': np.datetime64('2019-01-01'),
            'endDate': np.datetime64('2019-03-31'),
            'beginHour': '00:00',
            'endHour': '06:59',
            'price': 23.81,
            'tag': 'Pozaszczytowy'
        },
        {
            'id': 'Zima_1_pozaszczytowy_3',
            'beginDate': np.datetime64('2019-01-01'),
            'endDate': np.datetime64('2019-03-31'),
            'beginHour': '21:00',
            'endHour': '23:59',
            'price': 23.81,
            'tag': 'Pozaszczytowy'
        },
        {
            'id': 'Zima_2_szczyt_przedpołudniowy',
            'beginDate': np.datetime64('2019-10-01'),
            'endDate': np.datetime64('2019-12-31'),
            'beginHour': '07:00',
            'endHour': '12:59',
            'price': 52.36,
            'tag': 'Szczyt przepołudniowy'
        },
        {
            'id': 'Zima_2_szczyt_popołudniowy',
            'beginDate': np.datetime64('2019-10-01'),
            'endDate': np.datetime64('2019-12-31'),
            'beginHour': '16:00',
            'endHour': '20:59',
            'price': 64.03,
            'tag': 'Szczyt popołudniowy'
        },
        {
            'id': 'Zima_2_pozaszczytowy_1',
            'beginDate': np.datetime64('2019-10-01'),
            'endDate': np.datetime64('2019-12-31'),
            'beginHour': '13:00',
            'endHour': '15:59',
            'price': 23.81,
            'tag': 'Pozaszczytowy'
        },
        {
            'id': 'Zima_2_pozaszczytowy_2',
            'beginDate': np.datetime64('2019-10-01'),
            'endDate': np.datetime64('2019-12-31'),
            'beginHour': '00:00',
            'endHour': '06:59',
            'price': 23.81,
            'tag': 'Pozaszczytowy'
        },
        {
            'id': 'Zima_2_pozaszczytowy_3',
            'beginDate': np.datetime64('2019-10-01'),
            'endDate': np.datetime64('2019-12-31'),
            'beginHour': '21:00',
            'endHour': '23:59',
            'price': 23.81,
            'tag': 'Pozaszczytowy'
        },
        
    ]
}