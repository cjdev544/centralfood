export const calculateDeliveryCost = (deliveryPrices, address) => {
  const distance = address?.zone?.distNumber;
  let costForDelivery;

  const getCost = (addressDistance) => {
    return deliveryPrices?.filter(
      (deliveryPrice) => deliveryPrice?.distancia === addressDistance
    );
  };

  if (distance <= 2) {
    costForDelivery = getCost("0a2km");
  } else if (distance <= 6) {
    costForDelivery = getCost("2a6km");
  } else {
    costForDelivery = getCost("6a10km");
  }

  return costForDelivery[0]?.costo;
};
