const toDollars = (value) => {
  value = (value + "").replace(/[^\d.-]/g, "");
  value = parseFloat(value);
  const dollarsValue = value ? value / 100 : 0;

  return dollarsValue.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};

const toCents = (value) => {
  value = (value + '').replace(/[^\d.-]/g, '');
  if (value && value.includes('.')) {
    value = value.substring(0, value.indexOf('.') + 3);
  }

  return value ? Math.round(parseFloat(value) * 100) : 0;
}


const formatMoney = (value) => {
  return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};

export { toDollars, toCents, formatMoney };
