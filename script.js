const form = document.querySelector('#stressBallForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const email = 'your-email@example.com'; // TODO: replace with your real email
  const subject = `New Stress Ball Order: ${data.get('product')}`;
  const body = `Product: ${data.get('product')}\nQuantity: ${data.get('quantity')}\nMain color: ${data.get('color')}\nStyle: ${data.get('style')}\nSize: ${data.get('size')}\n\nExtra details:\n${data.get('details') || 'None'}`;
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
