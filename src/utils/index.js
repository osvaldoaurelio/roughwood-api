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

module.exports = {
  sample_id,
  genColor,
  genInitials,
  userAttr,
}
