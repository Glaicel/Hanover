import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

interface Product {
    dealer_product_id: number;
    dealer_id: number;
    brand_name: string;
    model_name: string;
    selling_price: number;
    dealer_name: string;
    image_path: string;
    color: string;
    // ... other properties
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const navigate = useNavigate();



    const handleBuyNowClick = () => {
        // Redirect to the product details page when the "Buy now" button is clicked
        navigate(`/product-details/${product.dealer_product_id}`);

    };

    return (
        <Card style={{ width: '22rem', height: '25rem', border: 'none' }} className='shadow-sm mt-4'>
            <Card.Body>
                <Card.Img variant="top" src={product.image_path} />
                <Card.Title>{product.brand_name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{product.model_name}</Card.Subtitle>
                <Card.Text>
                    Selling Price: {product.selling_price} -
                    <Link to={`/Profile/${product.dealer_id}`} >
                        Dealer: {product.dealer_name}
                    </Link>
                </Card.Text>
                <Card.Text>
                    Color:{product.color}
                </Card.Text>
                {/* Use a function to handle the click event */}
                <Button variant="primary" onClick={handleBuyNowClick}>
                    Buy now
                </Button>
            </Card.Body>
        </Card >
    );
};

export default ProductCard;
