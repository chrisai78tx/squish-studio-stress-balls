const checkoutForm = document.querySelector('#checkoutForm');
const sellerPhone = '8326464404';

function parsePrice(product) {
  const match = product.match(/\$(\d+(?:\.\d{2})?)/);
  return match ? Number(match[1]) : 0;
}

function updateSummary() {
  const data = new FormData(checkoutForm);
  const product = data.get('product') || 'Red Stress Ball - $8.00';
  const qty = Number(data.get('quantity') || 1);
  const name = product.split(' - ')[0];
  const total = parsePrice(product) * qty;
  document.querySelector('#sumProduct').textContent = name;
  document.querySelector('#sumQty').textContent = qty;
  document.querySelector('#sumTotal').textContent = `$${total.toFixed(2)}`;
}

checkoutForm.addEventListener('input', updateSummary);
checkoutForm.addEventListener('change', updateSummary);

document.querySelectorAll('.buy-button').forEach((button) => {
  button.addEventListener('click', () => {
    const select = document.querySelector('select[name="product"]');
    if (select && button.dataset.product) select.value = button.dataset.product;
    updateSummary();
  });
});

checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const checkout = new FormData(checkoutForm);
  const product = checkout.get('product');
  const qty = Number(checkout.get('quantity') || 1);
  const total = parsePrice(product) * qty;
  const body = `NEW STRESS BALL ORDER

Item: ${product}
Quantity: ${qty}
Estimated total: $${total.toFixed(2)}

CUSTOMER
Name: ${checkout.get('customerName')}
Contact: ${checkout.get('contact')}
Delivery/pickup location: ${checkout.get('address')}
Payment method: ${checkout.get('payment')}`;
  const smsUrl = `sms:${sellerPhone}?&body=${encodeURIComponent(body)}`;
  const smsLink = document.querySelector('#smsLink');
  const thankYou = document.querySelector('#thankYou');
  if (smsLink) smsLink.href = smsUrl;
  if (thankYou) {
    thankYou.hidden = false;
    thankYou.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  window.location.href = smsUrl;
});

updateSummary();
