const orderForm = document.querySelector('#stressBallForm');
const checkoutForm = document.querySelector('#checkoutForm');
const email = 'your-email@example.com'; // TODO: replace with your real email

function parsePrice(product) {
  const match = product.match(/\$(\d+(?:\.\d{2})?)/);
  return match ? Number(match[1]) : 0;
}

function updateSummary() {
  const data = new FormData(orderForm);
  const product = data.get('product') || '';
  const qty = Number(data.get('quantity') || 1);
  const name = product.split(' - ')[0];
  const total = parsePrice(product) * qty;
  document.querySelector('#sumProduct').textContent = name;
  document.querySelector('#sumQty').textContent = qty;
  document.querySelector('#sumTotal').textContent = `$${total.toFixed(2)}`;
}

orderForm.addEventListener('input', updateSummary);
orderForm.addEventListener('change', updateSummary);

document.querySelectorAll('.buy-button').forEach((button) => {
  button.addEventListener('click', () => {
    const select = document.querySelector('select[name="product"]');
    if (select) select.value = button.dataset.product;
    updateSummary();
  });
});

checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const order = new FormData(orderForm);
  const checkout = new FormData(checkoutForm);
  const product = order.get('product');
  const qty = Number(order.get('quantity') || 1);
  const total = parsePrice(product) * qty;
  const subject = `New Stress Ball Order - ${checkout.get('customerName')}`;
  const body = `NEW STRESS BALL ORDER

Item: ${product}
Quantity: ${qty}
Estimated total: $${total.toFixed(2)}
Main color: ${order.get('color')}
Style: ${order.get('style')}
Size: ${order.get('size')}
Extra details: ${order.get('details') || 'None'}

CUSTOMER
Name: ${checkout.get('customerName')}
Contact: ${checkout.get('contact')}
Shipping address: ${checkout.get('address')}
Payment method: ${checkout.get('payment')}`;
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

updateSummary();
