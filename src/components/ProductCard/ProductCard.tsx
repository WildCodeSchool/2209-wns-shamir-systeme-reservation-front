import "./ProductCard.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import IProduct from "../../interfaces/IProduct"

function ProductCard(product: IProduct) {

  return (
  <Card className="col-4 m-4 p-4">
    <Card.Img alt={product.name} src={product.image} />
    <Card.Body className="d-flex align-content-between flex-wrap">
    <div>
      <Card.Title className="fs-2 mb-4">{product.name}</Card.Title>
      <Card.Text>{product.description}</Card.Text>
    </div>
      <Card.Text className="mt-4">Prix / Jour : <span className="fw-bold fs-2">{product.price} €</span></Card.Text>
    </Card.Body>
    <Button className="fs-2 p-3 col-5 m-auto">Ajouter au panier</Button>
  </Card>
  )
}

export default ProductCard