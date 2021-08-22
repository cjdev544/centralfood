export const concatArray = (res) => {
  const sushiGuay = res?.sushiwuay_platoes;
  const guayWok = res?.guaywok_platoes;
  const saborCasita = res?.saborcasita_platoes;
  const tapas = res?.tapas;
  const bebidas = res?.bebidas;

  return sushiGuay
    .concat(guayWok)
    .concat(saborCasita)
    .concat(tapas)
    .concat(bebidas)
    .filter((e) => e !== undefined);
};
