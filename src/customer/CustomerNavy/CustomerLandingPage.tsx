import { Container, Carousel } from "react-bootstrap";
import { useEffect, useState } from 'react';
import BrandsList from "../../dealer/DealerNavy/ProductNavy/BrandList";
import { Link, useNavigate } from 'react-router-dom';
import CustomerNavbar from "./CustomerNavbar";

function CustomerPage() {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            <CustomerNavbar />
        </>
    );

}

export default CustomerPage;