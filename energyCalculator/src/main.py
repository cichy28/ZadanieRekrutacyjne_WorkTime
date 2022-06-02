import logging
import numpy as np
import os as os
from pathlib import Path
import pandas as pd
from datetime import datetime, timedelta
import plotly.express as px
from modules.functions import *
from modules.createTables import *
from modules.showCharts import *
from modules.createRaport import *
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import argparse
 
parser = argparse.ArgumentParser(description="Energy counter", formatter_class=argparse.ArgumentDefaultsHelpFormatter)
parser.add_argument('--config', required=True)
parser.add_argument('--dataset', required=True)
parser.add_argument("-d", "--dataTable", action="store_true", help="create table with random data")
parser.add_argument("-p", "--prepareData", action="store_true", help="create table with data and prices")
parser.add_argument("-s", "--showChart", action="store_true", help="show active chart of calculated data")
parser.add_argument("-r", "--prepareRaport", action="store_true", help="prepare raport in pdf to send as email - TO DO")
args = vars(parser.parse_args())
print(args)

logging.basicConfig(filename='energyCalculator.log', level=logging.INFO)
pd.set_option('display.max_columns', 5)
pd.set_option('display.max_rows', 20)


# if args['dataTable']:
#     createTestDataTable('2020-01-01','2021-01-01', 15)
if args['prepareData']:
    createCostTable(args['config'],args['dataset'],args['dataset'] + '_' + args['config'], 15)
if args['showChart']:
    showPriceChart(args['config'],args['dataset'])
if args['prepareRaport']:
    showPricePerMonth(args['config'],args['dataset'])