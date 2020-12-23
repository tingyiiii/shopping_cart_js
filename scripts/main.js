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

  document.querySelector('.empty-cart-btn').addEventListener('click', emptyCart)
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
    item.querySelector('.sub-total-price').innerText = `$${quantity * price}`
    total += (quantity * price)
  })

  document.querySelector('.total-price').innerText = `$${Math.round(total*100) / 100}`
}

function setAddBtn(e){
  const product = e.currentTarget.parentElement.parentElement
  const productName = product.querySelector('.product-name').innerText
  const productPrice = product.querySelector('.price').innerText.replace('$', '')

  const items = document.querySelectorAll('.cart-item')
  for(let i=0; i < items.length; i++){
    const item = items[i]
    const title = item.querySelector('.item-title').innerText
    if (title == productName){
      item.querySelector('.quantity').value = Number(item.querySelector('.quantity').value) + 1
      updateCartPrice()
      return
    }
  }

  const row = document.createElement('tr')
  row.classList.add('cart-item')
  row.innerHTML = `
      <td  class="item-title">${productName}</td>
      <td><input type="number" value="1" class="quantity"></td>
      <td class="price">$${productPrice}</td>
      <td class="sub-total-price">$${productPrice}</td>
      <td><button class="delete-btn btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td>
  `
  const itemList = document.querySelector('.item-list')
  itemList.appendChild(row)
  row.querySelectorAll('.delete-btn').forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', setRemoveItemBtn)
  })
  row.querySelectorAll('.cart .cart-item .quantity').forEach((input) => {
    input.addEventListener('change', setQuantity)
  })

  updateCartPrice()
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

  updateCartPrice()
}

function emptyCart(){
  document.querySelector('.item-list').innerHTML = ''
  updateCartPrice()
}