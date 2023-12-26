// Importando função calculadora do arquivo models/calculadora.js
const calculadora = require("../models/calculadora");

test("Espera-se que a soma de 2 + 2 seja 4", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
  console.log("O resultado é " + resultado);
});
