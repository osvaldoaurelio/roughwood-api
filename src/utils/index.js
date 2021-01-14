const sample_id = instances => {
  const ids = instances.reduce((previous, current) => ([...previous, current.id]), []);
  const randomIndex = Math.floor(Math.random() * ids.length);
  return ids[randomIndex];
};

module.exports = {
  sample_id,
}
