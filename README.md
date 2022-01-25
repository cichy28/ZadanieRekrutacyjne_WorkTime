# Zadanie rekrutacyjne

Napisz aplikację do śledzenia czasu pracy. Aplikacja powinna mieć następujące funkcjonalności:

-  startowanie czasu pracy wraz z opisem nad czym aktualnie użytkownik pracuje (należy pamiętać o blokowaniu możliwości startu nowego czasu gdy poprzedni nie został zastopowany).
-  stopowanie czasu pracy.
-  pobieranie sumarycznego czasu pracy w formacie danych umożliwiających łatwe wyświetlenie ich na wykresie z podziałem na dni.

Kryteria techniczne:

-  Implementacja w dowolnym frameworku (preferowany loopback.io w wersji 4 lub innych np: express.js, nest.js)
-  Implementacja w jezyku TypeScript
-  Implementacja testów
-  Opis endpointów w standardzie OpenAPI

## Commands

-  Run the app

```
npm dev_start
```

-  Run tests

```
npm test
```

## Additional informations

-  start/stop timestamps stored as UTC

-  API doc made in Swagger http://localhost:3000/api-docs

-  tests made in JEST

-  data in mongoDB Atlas user:test pass:test123
