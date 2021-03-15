const sample_id = instances => {
  const ids = instances.reduce((previous, current) => ([...previous, current.id]), []);
  const randomIndex = Math.floor(Math.random() * ids.length);
  return ids[randomIndex];
};

const random = values => values[Math.floor(Math.random() * values.length)];

const genColor = () => {
  const values = ['5', '6', '7', '8', '9', 'a', 'b', 'c', 'd'];
  const r = `${random(values)}${random(values)}`;
  const g = `${random(values)}${random(values)}`;
  const b = `${random(values)}${random(values)}`;

  return `#${r}${g}${b}`;
};

const genInitials = name => name
  .split(' ')
  .splice(0, 2)
  .map(([name]) => name)
  .join('')
  .toUpperCase();

const userAttr = [
    'id',
    'name',
    'username',
    'address',
    'phone',
    'color',
    'initials',
    'is_active',
    'created_at'
  ];

const makeLateMessage = (days, discount, value, newValue) => {
  value = Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
  newValue = Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }).format(newValue);

  let msg = `\n\n* Devido à ${days} dia${days === 1 ? '' : 's'},`;
  msg = `${msg} foi aplicado ${discount}% de desconto ao valor`;
  msg = `${msg} da mão de obra desta ordem de serviço.\nValor `;
  msg = `${msg}original: ${value}\nValor reajustado: ${newValue}`;

  return msg;
};

const calcDiscount = days => {
  let discount = days * 2.5;

  if (discount >= 100) {
    discount = 100;
  }

  return discount;
};

module.exports = {
  sample_id,
  genColor,
  genInitials,
  userAttr,
  makeLateMessage,
  calcDiscount,
}
