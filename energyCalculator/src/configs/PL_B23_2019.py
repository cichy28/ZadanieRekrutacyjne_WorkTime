import string
import numpy as np

   
# Skrypt wylicza cenwy w pln/kwh

# EO - lato - 1 kwietnia - 30 września
# EO - Zima_1 - 1 pąździernika - 31marca
# 
#to jest tylko przykładowy zahardcodowany config
# Kolejne JSONY taryfowe trzeba brac już z JS-a - interfacy i walidacje łatwiej do zrobienia
# intelisensy tez lepsze do ręcznego wbijania configów :D



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
    'baseVarClassifier': 'Pozaszczytowy',
    'price_Stała': 14.45,
    'price_Przejsciowa': 0.19,
    'price_Jakosciowa': 13.00,
    'price_Abonamentowa': 10.00,
    'diffVarPriceMultiplyer': 0.001, #Mnożnik liczący z Mwh na Kwh
    'holidaysArray': [],
    'weekendAsOffPeak': True,
    'tagTypes'
    'varPrices':{
        'offPeak_summer': 19.95,
        'morningPeak_summer': 51.84,
        'afternoonPeak_summer': 63.96,
        'offPeak_winter': 23.81,
        'morningPeak_winter': 52.36,
        'afternoonPeak_winter': 64.03,
    },
    'diffVarPriceArray': [
        {
            'id': 'Lato_szczyt_przedpołudniowy',
            'beginDate': np.datetime64('2019-04-01'),
            'endDate': np.datetime64('2019-09-30'),
            'beginHour': '07:00',
            'endHour': '12:59',
            'workDayPriceTag': 'morningPeak_summer',
            'offDayPriceTag': 'offPeak_summer',
        },
                {
            'id': 'Lato_szczyt_popołudniowy',
            'beginDate': np.datetime64('2019-04-01'),
            'endDate': np.datetime64('2019-09-30'),
            'beginHour': '19:00',
            'endHour': '21:59',
            'workDayPriceTag': 'afternoonPeak_summer',
            'offDayPriceTag': 'offPeak_summer',
        },
        {
            'id': 'Lato_pozaszczytowy_1',
            'beginDate': np.datetime64('2019-04-01'),
            'endDate': np.datetime64('2019-09-30'),
            'beginHour': '13:00',
            'endHour': '18:59',
            'workDayPriceTag': 'offPeak_summer',
            'offDayPriceTag': 'offPeak_summer',
        },
        {
            'id': 'Lato_pozaszczytowy_2',
            'beginDate': np.datetime64('2019-04-01'),
            'endDate': np.datetime64('2019-09-30'),
            'beginHour': '00:00',
            'endHour': '06:59',
            'workDayPriceTag': 'offPeak_summer',
            'offDayPriceTag': 'offPeak_summer',
        },
        {
            'id': 'Lato_pozaszczytowy_3',
            'beginDate': np.datetime64('2019-04-01'),
            'endDate': np.datetime64('2019-09-30'),
            'beginHour': '22:00',
            'endHour': '23:59',
            'workDayPriceTag': 'offPeak_summer',
            'offDayPriceTag': 'offPeak_summer',
        },
        {
            'id': 'Zima_1_szczyt_przedpołudniowy',
            'beginDate': np.datetime64('2019-01-01'),
            'endDate': np.datetime64('2019-03-31'),
            'beginHour': '07:00',
            'endHour': '12:59',
            'workDayPriceTag': 'morningPeek_winter',
            'offDayPriceTag': 'offPeak_winter',
        },
        {
            'id': 'Zima_1_szczyt_popołudniowy',
            'beginDate': np.datetime64('2019-01-01'),
            'endDate': np.datetime64('2019-03-31'),
            'beginHour': '16:00',
            'endHour': '20:59',
            'workDayPriceTag': 'afternoonPeek_winter',
            'offDayPriceTag': 'offPeak_winter',
        },
        {
            'id': 'Zima_1_pozaszczytowy_1',
            'beginDate': np.datetime64('2019-01-01'),
            'endDate': np.datetime64('2019-03-31'),
            'beginHour': '13:00',
            'endHour': '15:59',
            'workDayPriceTag': 'offPeak_winter',
            'offDayPriceTag': 'offPeak_winter',
        },
        {
            'id': 'Zima_1_pozaszczytowy_2',
            'beginDate': np.datetime64('2019-01-01'),
            'endDate': np.datetime64('2019-03-31'),
            'beginHour': '00:00',
            'endHour': '06:59',
            'workDayPriceTag': 'offPeak_winter',
            'offDayPriceTag': 'offPeak_winter',
        },
        {
            'id': 'Zima_1_pozaszczytowy_3',
            'beginDate': np.datetime64('2019-01-01'),
            'endDate': np.datetime64('2019-03-31'),
            'beginHour': '21:00',
            'endHour': '23:59',
            'workDayPriceTag': 'offPeak_winter',
            'offDayPriceTag': 'offPeak_winter',
        },
        {
            'id': 'Zima_2_szczyt_przedpołudniowy',
            'beginDate': np.datetime64('2019-10-01'),
            'endDate': np.datetime64('2019-12-31'),
            'beginHour': '07:00',
            'endHour': '12:59',
            'workDayPriceTag': 'morningPeek_winter',
            'offDayPriceTag': 'offPeak_winter',
        },
        {
            'id': 'Zima_2_szczyt_popołudniowy',
            'beginDate': np.datetime64('2019-10-01'),
            'endDate': np.datetime64('2019-12-31'),
            'beginHour': '16:00',
            'endHour': '20:59',
            'workDayPriceTag': 'afternoonPeak_winter',
            'offDayPriceTag': 'offPeak_winter',
        },
        {
            'id': 'Zima_2_pozaszczytowy_1',
            'beginDate': np.datetime64('2019-10-01'),
            'endDate': np.datetime64('2019-12-31'),
            'beginHour': '13:00',
            'endHour': '15:59',
            'workDayPriceTag': 'offPeak_winter',
            'offDayPriceTag': 'offPeak_winter',
        },
        {
            'id': 'Zima_2_pozaszczytowy_2',
            'beginDate': np.datetime64('2019-10-01'),
            'endDate': np.datetime64('2019-12-31'),
            'beginHour': '00:00',
            'endHour': '06:59',
            'workDayPriceTag': 'offPeak_winter',
            'offDayPriceTag': 'offPeak_winter',
        },
        {
            'id': 'Zima_2_pozaszczytowy_3',
            'beginDate': np.datetime64('2019-10-01'),
            'endDate': np.datetime64('2019-12-31'),
            'beginHour': '21:00',
            'endHour': '23:59',
            'workDayPriceTag': 'offPeak_winter',
            'offDayPriceTag': 'offPeak_winter',
        },
        
    ]
}