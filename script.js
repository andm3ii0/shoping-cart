const products = fetchProducts('computador').then((data) => data.results);
const items = document.querySelector('.items');
const ol = document.querySelector('.cart__items');
const price = document.querySelector('.total-price');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const atualizaValor = () => {
  let valor = 0;
  const olArray = Array.from(document.getElementsByClassName('cart__item'));
  if (olArray.length === 0) {
    price.innerHTML = parseFloat(valor, 10);
  } else {
    olArray.forEach(async (element) => {
    const data = await fetchItem(element.id);
    valor += parseFloat(data.price, 10);
    price.innerHTML = parseFloat(valor, 10);
    });
  }
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  event.target.remove();
  atualizaValor();
  saveCartItems(ol.innerHTML);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = sku;
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
  atualizaValor();
  saveCartItems(ol.innerHTML);
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

window.onload = () => {
  if (localStorage.getItem('cartItems') === undefined) {
    return undefined;
  }
  ol.innerHTML = getSavedCartItems();
  // Usei Array.from depois de fazer uma pesquisa no link https://stackoverflow.com/questions/40703465/javascript-getelementbyclass-foreach-function-not-workin
  Array.from(document.getElementsByClassName('cart__item')).forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
  atualizaValor();
};
