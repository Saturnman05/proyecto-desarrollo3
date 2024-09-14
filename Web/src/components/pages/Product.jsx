import { useParams } from 'react-router-dom'

export default function Product() {
  const { productId } = useParams()

  const mockProducts = [
    { productId: 1, name: "Minimal Chair", unitPrice: "$199" },
    { productId: 2, name: "Sleek Table", unitPrice: "$299" }
  ]

  const product = mockProducts.find(p => p.productId === parseInt(productId))

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: {product.unitPrice}</p>
    </div>
  )
}
