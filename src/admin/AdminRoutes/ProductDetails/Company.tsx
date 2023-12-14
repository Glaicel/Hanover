// CompanyComponent.js
import { useState, useEffect } from 'react';
import { Button, Form, Modal, Table, Spinner } from 'react-bootstrap';
import axios from 'axios';


interface Company {
    id: number;
    company_name: string;
    address: string;
}

function Company() {
    const [companyName, setCompanyName] = useState<string>('');
    const [companyAddress, setCompanyAddress] = useState<string>('');
    const [showCompanyModal, setShowCompanyModal] = useState<boolean>(false);
    const [companyData, setCompanyData] = useState<Company[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedCompanyIndex, setSelectedCompanyIndex] = useState<number | null>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
    const [deletingCompanyIndex, setDeletingCompanyIndex] = useState<number | null>(null);


    useEffect(() => {
        // Fetch company data from the server on component mount
        fetchCompanyData();
    }, []);

    const fetchCompanyData = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem('token');
            console.log('Token:', token);

            const response = await axios.get(
                'http://carfinity.test/api/company/select',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('API Response:', response);

            if (Array.isArray(response.data) && response.data.length > 0) {
                setCompanyData(response.data);
            } else {
                console.error('Invalid response format for company data:', response.data);
            }
        } catch (error) {
            console.error('Error fetching company data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleShowCompanyModal = () => {
        setShowCompanyModal(true);
    };

    const handleCloseCompanyModal = () => {
        setShowCompanyModal(false);
    };

    const handleSaveChanges = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem('token');
            console.log('Token:', token);

            const response = await axios.post(
                'http://carfinity.test/api/company/insert',
                {
                    company_name: companyName,
                    address: companyAddress,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Response:', response);

            const newCompany: Company = {
                id: response.data.id,
                company_name: companyName,
                address: companyAddress,
            };

            // Use the callback form of setCompanyData
            setCompanyData(prevCompanyData => [...prevCompanyData, newCompany]);

            // Save data to localStorage after the state has been updated
            localStorage.setItem('companyData', JSON.stringify([...companyData, newCompany]));

            handleCloseCompanyModal();
        } catch (error) {
            console.error('Error:', error);
            console.log('Response:', error.response);
        } finally {
            setLoading(false);
        }
    };

    const handleEditCompany = (index: number) => {
        setSelectedCompanyIndex(index);
        // Fetch the data of the selected company and set it in the form fields
        const selectedCompany = companyData[index];
        setCompanyName(selectedCompany.company_name);
        setCompanyAddress(selectedCompany.address);
        // Show the modal for editing
        setShowCompanyModal(true);
    };

    const handleDeleteCompany = (index: number) => {
        setDeletingCompanyIndex(index);
        setShowDeleteConfirmation(true);
    };

    const handleConfirmDelete = () => {
        if (deletingCompanyIndex !== null) {
            const updatedCompanyData = [...companyData];
            updatedCompanyData.splice(deletingCompanyIndex, 1);
            setCompanyData(updatedCompanyData);

            // Save updated company data to localStorage
            localStorage.setItem('companyData', JSON.stringify(updatedCompanyData));

            setShowDeleteConfirmation(false);
            setDeletingCompanyIndex(null);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
        setDeletingCompanyIndex(null);
    };



    return (
        <>
            <Button className='mt-4' onClick={handleShowCompanyModal}>
                Add Company
            </Button>
            <Table className='mt-3'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Company Name</th>
                        <th>Company Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {companyData.map((company, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{company.company_name}</td>
                            <td>{company.address}</td>
                            <td>
                                <Button variant="info" onClick={() => handleEditCompany(index)}>
                                    Edit
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDeleteCompany(index)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* Deletion Confirmation Modal */}
            <Modal show={showDeleteConfirmation} onHide={handleCancelDelete} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Company</Modal.Title>
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
            <Modal show={showCompanyModal} onHide={handleCloseCompanyModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="CompanyName">
                            <Form.Control type="text" placeholder="Enter company name" onChange={(e) => setCompanyName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className='mt-3' controlId="companyAddress">
                            <Form.Control type="text" placeholder="Enter company address" onChange={(e) => setCompanyAddress(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCompanyModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges} disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                Loading...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Company;
