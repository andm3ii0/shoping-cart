require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Testa se é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('testa se fetch é chamado com a função fetchItem', async () => {
    expect.assertions(1)
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Testa se a função fetch é chama com oend point "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    const url = "https://api.mercadolibre.com/items/MLB1615760527";
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('Testa se o retorno da função é igual ao objeto \'item\'', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });
  it('Testa se a função retorna o erro \'You must provide an url\'', async () => {
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
