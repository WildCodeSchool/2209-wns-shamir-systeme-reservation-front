import "./ProductCard.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import IProductProps from "../../interfaces/IProductProps";
import { useLocation } from 'react-router-dom';

function ProductCard({product, productsByDate}: IProductProps) {

const location = useLocation();

  return (

  <Card className={ location.pathname === '/catalogue'  ? "col-lg-3 col-md-5 col-sm-10 col-11 m-4 p-4 "  : "col-12 col-md-2 card_product"} >


    <Card.Img alt={product.name} src={product.image} />
    <Card.Body className="d-flex align-content-between flex-wrap">
    <div>
      <Card.Title className="fs-2 mb-4">{product.name}</Card.Title>
      <Card.Text>{product.description}</Card.Text>
    </div>
      <Card.Text className="mt-4">Prix / Jour : <span className="fw-bold fs-2">{product.price} €</span></Card.Text>
    </Card.Body>
    {
     productsByDate.length ? (<Button className="fs-2 p-3 col-7 m-auto">Ajouter au panier</Button>) : ""
    }
    
  </Card>
  )
}

export default ProductCard