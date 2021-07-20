//We are going to create our own module to replace templates

module.exports = (tempCard, element) => {
  //here we want to replace all the placeholders , not only first one thats why we need to use /g (to make it global)
  let output = tempCard.replace(/{%productName%}/g, element.productName)
  output = output.replace(/{%productImage%}/g, element.image)
  output = output.replace(/{%productDescription%}/g, element.description)
  output = output.replace(/{%productPrice%}/g, element.price)
  output = output.replace(/{%productQuantity%}/g, element.quantity)
  output = output.replace(/{%productFrom%}/g, element.from)
  output = output.replace(/{%productId%}/g, element.id)
  output = output.replace(/{%productNutrients%}/g, element.nutrients)

  if (!element.organic) {
    output = output.replace(/{%notOrganic%}/g, 'not-organic')
  }
  return output
}
