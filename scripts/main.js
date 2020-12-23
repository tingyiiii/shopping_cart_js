document.addEventListener('DOMContentLoaded', () => {
  const deleteBtn = document.querySelectorAll('.delete-btn');
  deleteBtn.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', setRemoveItemBtn)
  })

  document.querySelectorAll('.cart .cart-item .quantity').forEach((input) => {
    input.addEventListener('change', setQuantity)
  })

  document.querySelectorAll('.add-cart-btn ').forEach((btn) => {
    btn.addEventListener('click', setAddBtn)
  })
})

function setRemoveItemBtn(e) {
  const row = e.currentTarget.parentElement.parentElement;
  row.remove();
  updateCartPrice();
}

function updateCartPrice(){
  const cartItems = document.querySelectorAll('.cart .cart-item')
  let total = 0

  cartItems.forEach((item) => {
    const quantity = item.querySelector('.quantity').value
    const price = item.querySelector('.price').innerText.replace('$', '')
    total += (quantity * price)
  })

  document.querySelector('.total-price').innerText = `$${total}`
}

function setQuantity(e){
  const input = e.target
  let quantity = input.value
  if (quantity <= 0) {
    quantity = 1
    e.target.value = quantity
  }

  const cartItem = input.parentElement.parentElement
  const price = cartItem.querySelector('.price').innerText.replace('$', '')
  cartItem.querySelector('.sub-total-price').innerText = `$${price * quantity}`
}

function setAddBtn(e){
  const product = e.currentTarget.parentElement.parentElement
  const productName = product.querySelector('.product-name').innerText
  const productPrice = product.querySelector('.price').innerText.replace('$', '')
  console.log(productName)
  console.log(productPrice)
}