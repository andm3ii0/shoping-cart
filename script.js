const products = fetchProducts('computador').then((data) => data.results);
const items = document.querySelector('.items');
const ol = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addToCart = async (event) => {
  const id = event.target.parentNode.firstChild.innerHTML;
  const data = await fetchItem(id);
  const { id: sku, title: name, price: salePrice } = data;
  const newLi = createCartItemElement({ sku, name, salePrice });
  ol.appendChild(newLi);
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (element === 'button') {
    e.addEventListener('click', addToCart);
  }
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

products.then((data) => {
  data.forEach((produto) => {
    const { id: sku, title: name, thumbnail: image } = produto;
    items.appendChild(createProductItemElement({ sku, name, image }));
  });
});

window.onload = () => { };
