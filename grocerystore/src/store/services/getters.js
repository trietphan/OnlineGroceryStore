export const cartProducts = state => {
  return state.shoppingCart.added.map(({ id, quantity }) => {
    const product =
      state
        .products.all
        .find(product => product.id === id)
                // console.log(JSON.parse(JSON.stringify(res.data)))
    return {
      ...product,
      quantity
    }
  })
}

export const itemsQuantity = state => {
  return cartProducts(state).reduce((quantity, item) => {
    return quantity + item.quantity
  }, 0)
}

export const total = state => {
  const sum = cartProducts(state).reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  return sum
}

// export const orderOnLimit = state => state.customer.data.balance <= total(state)