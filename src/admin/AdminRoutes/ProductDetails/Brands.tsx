import { useEffect, useState } from 'react';
import { Button, Form, Modal, Table, Spinner, DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios';

interface Brand {
    brand_id: number;
    brand_name: string;
    name: string;
    image_data: string;
}

function Brand() {
    const [brandName, setBrandName] = useState<string>('');
    const [companyName, setCompanyName] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [showBrandModal, setShowBrandModal] = useState<boolean>(false);
    const [brandData, setBrandData] = useState<Brand[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [companyNames, setCompanyNames] = useState<string[]>([]);
    const [selectedBrandIndex, setSelectedBrandIndex] = useState<number | null>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
    const [deletingBrandIndex, setDeletingBrandIndex] = useState<number | null>(null);
    const [companies, setCompanies] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchBrandData();
        fetchCompany();
    }, [])


    const fetchBrandData = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem('token');
            console.log('Token:', token);

            const response = await axios.get('http://carfinity.test/api/brand/select',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (Array.isArray(response.data) && response.data.length > 0) {
                setBrandData(response.data);
            } else {
                console.error('Invalid response format for company data:', response.data);
            }
        } catch (error) {
            console.error('Error fetching company data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleShowBrandModal = () => {
        setShowBrandModal(true);
    };

    const handleCloseBrandModal = () => {
        setShowBrandModal(false);
    };

    const handleSaveChanges = async () => {
        try {
            setLoading(true);



            const formData = new FormData();
            formData.append('brand_name', brandName);
            formData.append('name', companyName);
            formData.append('image_data', imageFile || '');

            const response = await axios.post(
                'http://carfinity.test/api/brand/insert',
                formData,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',

                    },
                }
            );

            console.log('Response:', response);

            const newBrand: Brand = {
                brand_id: response.data.id,
                brand_name: brandName,
                name: companyName,
                image_data: response.data.image_data,
            };

            setBrandData([...brandData, newBrand]);

            handleCloseBrandModal();
        } catch (error) {
            console.error('Error:', error);
            console.log('Response:', error.response);
        } finally {
            setLoading(false);
        }
        localStorage.setItem('companyNames', JSON.stringify(companyNames));
    };


    const handleEditBrand = (index: number) => {
        setSelectedBrandIndex(index);
        // Fetch the data of the selected company and set it in the form fields
        const selectedBrand = brandData[index];
        setBrandName(selectedBrand.brand_name);
        setCompanyName(selectedBrand.name);


        // Show the modal for editing
        setShowBrandModal(true);
    };

    const handleDeleteBrand = (index: number) => {
        setDeletingBrandIndex(index);
        setShowDeleteConfirmation(true);
    };

    const handleConfirmDelete = () => {
        if (deletingBrandIndex !== null) {
            const updatedBrandData = [...brandData];
            updatedBrandData.splice(deletingBrandIndex, 1);
            setBrandData(updatedBrandData);

            // Save updated company data to localStorage
            localStorage.setItem('brandData', JSON.stringify(updatedBrandData));

            setShowDeleteConfirmation(false);
            setDeletingBrandIndex(null);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
        setDeletingBrandIndex(null);
    };


    const fetchCompany = async () => {
        try {
            const response = await fetch('http://carfinity.test/api/company/select', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setCompanies(data);
        } catch (error) {
            console.error('Error fetching vehicle types:', error);
        }

    }


    return (
        <>
            <Button className='mt-4' onClick={handleShowBrandModal}>Add Brand</Button>
            <Table className='mt-3'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Brand Name</th>
                        <th>Brand Logo</th>

                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {brandData.map((brand, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{brand.brand_name}</td>
                            <td>
                                <img src={brand.image_data} alt={`Logo of ${brand.brand_name}`} style={{ width: '50px', height: '50px' }} />
                            </td>
                            <td>{brand.name}</td> {/* Update this line to display the company name */}
                            <td>
                                <Button variant="info" onClick={() => handleEditBrand(index)}>
                                    Edit
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDeleteBrand(index)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showDeleteConfirmation} onHide={handleCancelDelete} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Brand</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this item?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelDelete}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showBrandModal} onHide={handleCloseBrandModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Brand</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="BrandName">
                            <Form.Control
                                type="text"
                                placeholder="Enter Brand name"
                                onChange={(e) => setBrandName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mt-3' controlId="companyImage">
                            <div className="mb-3">
                                <input type="file" className="form-control" id="imageInput" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                            </div>
                        </Form.Group>
                        <Form.Group className='mt-3' controlId="CompanyName">
                            <Form.Select title="Select Vehicle Type">
                                {companies.map(company => (
                                    <option key={company.company_id} value={company.company_id}>
                                        {company.company_name} {/* Assuming the vehicle type has a 'name' property */}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseBrandModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Brand;