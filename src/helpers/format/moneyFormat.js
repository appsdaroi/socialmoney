const formatMoney = (value) => {
  if (value) return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  
  return "R$ 0,00"
};

export { formatMoney };
