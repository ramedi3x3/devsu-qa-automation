ejercicio automatizacion - devsu
autor: idemar rojas
junio 2026

hay dos pruebas:
  saucedemo.cy.js - prueba el flujo de compra (e2e)
  petstore-api.cy.js - prueba la api de mascotas (api rest)

para correr:

1. tener node instalado (yo use v22 pero v18 en adelante funciona)

2. instalar dependencias:
   npm install

3. correr las pruebas:
   npx cypress run

   si queres ver el navegador:
   npx cypress open

nota: las pruebas de api usan Date.now() como id para evitar chocar con datos
de otros en la api publica. si falla por timeout en petstore, vuelve a correr,
esa api publica a veces tiene latencia.
