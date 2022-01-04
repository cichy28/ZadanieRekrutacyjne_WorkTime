# IZC - Proxy for percee system

![GitHub repo size](https://img.shields.io/badge/tech-TypeScript-blue)
![GitHub contributors](https://img.shields.io/badge/env-NodeJS-green)

Zadanie:

Napisz aplikację do śledzenia czasu pracy. Aplikacja powinna mieć następujące funkcjonalności:
 - startowanie czasu pracy wraz z opisem nad czym aktualnie użytkownik pracuje (należy pamiętać o blokowaniu możliwości startu nowego czasu gdy poprzedni nie został zastopowany).
 - stopowanie czasu pracy.
 - pobieranie sumarycznego czasu pracy w formacie danych umożliwiających łatwe wyświetlenie ich na wykresie z podziałem na dni.
 
Kryteria techniczne:
 - Implementacja w dowolnym frameworku (preferowany loopback.io w wersji 4 lub innych np: express.js, nest.js)
 - Implementacja w jezyku TypeScript
 - Implementacja testów
 - Opis endpointów w standardzie OpenAPI

## Prerequisites

Before you begin, ensure you have met the following requirements:

-  You have installed the latest version of [NodeJS](https://nodejs.org/en/)
-  You have installed the latest version of recomended IDE [VisualCode](https://code.visualstudio.com/)

## Installing IZC

To install IZC, follow these steps:

Windows:

-  Install dependencies

```
C:\ize-comm> npm install
```

## Using IZC in dev mode

-  Run the app

```
C:\ize-comm> npm run dev_start
```

![dev-run](/mediaFiles/dev-run.gif?raw=true "Run IZC as dev")

## Using IZC in prod mode

Before you begin, you need to install node menager [PM2](https://pm2.keymetrics.io/docs/usage/application-declaration/). To do so on windows please follow instructions from [PM2 - Autostart](https://stackoverflow.com/questions/42758985/windows-auto-start-pm2-and-node-apps)
In addition configure logs max_size:

```
C:\ize-comm> pm2 install pm2-logrotate
C:\ize-comm> pm2 set pm2-logrotate:max_size 100M
```

-  Run the app

```
C:\ize-comm> npm run prod_build
```

-  Run the app ( "pm2_config_file.config.js" - name of pm2 prod script from src\prod-scripts )

```
C:\ize-comm> pm2 start ./src/prod-scripts/"pm2_config_file.config.js"
```

## Prod scripts - key parameters

| Name                     | Type   | Description                                                                                   |
| ------------------------ | ------ | --------------------------------------------------------------------------------------------- |
| `PERCEE_UDP_PORT_CLIENT` | number | Listening port of UDP_Proxy                                                                   |
| `PROXY_UDP_OFFSET`       | number | Offset of UDP telegrams forward (incremented by 1 for each protocol defined in whole IZC app) |
| `NODE_ENV`               | string | Name of the environment                                                                       |
| `PROTOCOL`               | string | Name of the protocol                                                                          |
| `CONFIG_DIRECTORY`       | string | Same as NODE_ENV                                                                              |
| `PERCEE_UDP_PORT_SERVER` | number | Listening port of percee App                                                                  |
| `PERCEE_IP`              | string | IP adress of percee App                                                                       |
| `PERCEE_MAC`             | string | MAC adress of percee App                                                                      |
| `PERCEE_MNEMONIC`        | string | Mnemonic of percee App                                                                        |
| `IZC_DEVID`              | string | DevID of IZC instance                                                                         |
| `PERCEE_DESTID`          | string | DevID of percee App                                                                           |
|                          |

## Docs:

-  https://solwena.atlassian.net/wiki/spaces/IZE/pages/269090848/Wdro+one+protoko+y
