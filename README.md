# Zadanie rekrutacyjne - wytyczne

Napisz aplikację do śledzenia czasu pracy. Aplikacja powinna mieć następujące funkcjonalności:

-  startowanie czasu pracy wraz z opisem nad czym aktualnie użytkownik pracuje (należy pamiętać o blokowaniu możliwości startu nowego czasu gdy poprzedni nie został zastopowany).
-  stopowanie czasu pracy.
-  pobieranie sumarycznego czasu pracy w formacie danych umożliwiających łatwe wyświetlenie ich na wykresie z podziałem na dni.

Kryteria techniczne:

-  Implementacja w dowolnym frameworku (preferowany loopback.io w wersji 4 lub innych np: express.js, nest.js)
-  Implementacja w jezyku TypeScript
-  Implementacja testów
-  Opis endpointów w standardzie OpenAPI

# Zadanie rekrutacyjne - opis

-  Zaimplementowano rozdział poelceń start/stop w zależnosći od id użytkownika
-  Zaimplementowane blokady: (start juz wystartowanego zadania, stop nie rozpoczetego zadania)
-  Pobierania sumarycznego czasu pracy per dzien - uwzględniono występowanie zadań trwających dłużej niż 1 dzień.
-  Dodano prosty UI do realizacji zadań

Kryteri techniczne:

-  Back -> Express + TypeScript + MongoDB + AJV
-  Testy -> Jest
-  Front -> ejs + plotly
-  Doc -> Swagger

Uwagi:

-  Czas w UTC
-  data in mongoDB Atlas user:test pass:test123
