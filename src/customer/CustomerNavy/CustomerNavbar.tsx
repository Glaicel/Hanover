import { Container, Dropdown, Nav, Navbar, Form, Button, FormControl, Card, CardGroup, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState } from "react";
import ProductCard from "./CustomerProducts";



const fetchProducts = async (search: any) => {
    try {
        console.log(search)
        const token = localStorage.getItem('token');
        console.log(token);
        const response = await fetch("http://carfinity.test/api/product-show", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                search: search
            })
        })
        return response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

function CustomerNavbar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);


    const handleProfileClick = () => {
        // Redirect to the profile page
        navigate('/customer-profile');
    };

    const handleSearch = () => {
        fetchProducts(search)
            .then((result) => {
                setProducts(result);
                console.log(result);
                setSearch("")
            })
            .catch((error) => {
                console.log(error);
            });
    };



    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        fetchProducts(search)
            .then((result) => {
                setProducts(result);
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            });
    }, [])

    return (
        <>

            <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
                <Container fluid style={{ marginRight: '5%' }} className='mt-2 mb-2'>
                    <Link to="/customer-page" className='text-decoration-none'>
                        <Navbar.Brand>
                            <img className="img-fluid w-50" src='src/assets/HANOVER.png' />
                        </Navbar.Brand>
                    </Link>
                    <Form as="div" className="d-flex">
                        <FormControl type="search"
                            placeholder="Search"
                            aria-label="Search"
                            className="mr-sm-2"
                            value={search}
                            onInput={(e) => setSearch(e.currentTarget.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault(); // Prevent default behavior (e.g., form submission)
                                    handleSearch();
                                }
                            }}
                        />
                        <Button variant="outline-info"
                            className="btn-rounded btn-sm my-0"
                            type="button"
                            onClick={(e) => {
                                handleSearch()
                            }}
                        >
                            <i className="bi bi-search text-white"></i>
                        </Button>
                    </Form>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        {/* Navigation items on the right side */}
                        <Nav className="ms-auto" style={{ maxHeight: '100px' }} navbarScroll>
                            <Link to="/customer-page" className='me-5 text-decoration-none text-white mt-2'>
                                <i className="bi bi-house-door-fill me-2"></i>
                                Home
                            </Link>
                            <Link to="/customer-purchase" className='me-5 text-decoration-none text-white mt-2'>
                                <i className="bi bi-cart-fill me-2"></i>
                                Purchases
                            </Link>
                            {/* User icon button */}
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                                    <i className="bi bi-person"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {/* Add profile and sign-out items here */}
                                    <Dropdown.Item onClick={handleProfileClick}>Your Profile</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleLogout}>Sign Out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* {searchResults.length > 0 && (
                <div>
                    <h3>Search Results</h3>
                    <ul>
                        {searchResults.map((dealer) => (
                            <li key={dealer.id}>{dealer.name}</li>
                        ))}
                    </ul>
                </div>
            )} */}
            <Container>
                <Row>
                    <CardGroup className="mt-5 mb-5">
                        {products.map((product) => (
                            <Col key={product.dealer_product_id} md={4}>
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </CardGroup>
                </Row>

            </Container>
        </>
    );
}

export default CustomerNavbar;