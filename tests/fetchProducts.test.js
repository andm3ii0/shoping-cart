require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Testa se é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('testa se fetch é chamado com a função fetchProducts', async () => {
    expect.assertions(1)
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Testa se a função fetch é chama com oend point "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    const url = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('Testa se o retorno da função é igual ao objeto \'computadorSearch\'', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });
  it('Testa se a função retorna o erro \'You must provide an url\'', async () => {
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
