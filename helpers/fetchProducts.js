const fetchProducts = async (chave) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${chave}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
