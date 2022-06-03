const fetchItem = async (chave) => {
  const url = `https://api.mercadolibre.com/items/${chave}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
