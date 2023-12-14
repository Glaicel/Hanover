// VehicleTypeSection.tsx


import React from 'react';
import { Card, CardGroup, Container } from 'react-bootstrap';


interface VehicleTypeSectionProps {
    vehicleTypes: VehicleType[];
}

const VehicleTypeSection: React.FC<VehicleTypeSectionProps> = ({ vehicleTypes }) => (
    <Container>
        {/* Your vehicle type section code */}
        <Card style={{ width: '55.7rem', height: '5rem', marginLeft: '11%' }} className=' border-0 bg-primary shadow-sm'>
            <Card.Body>
                <Card.Title className='mt-2 text-white'>Categories</Card.Title>
            </Card.Body>
        </Card>
        <Container>
            <Card style={{ width: '55.7rem', height: '13rem', marginLeft: '10%' }} className='mt-3 mb-3 shadow-lg border-0'>
                {/* ... */}
                <CardGroup className='mt-5 ms-3'>
                    {vehicleTypes.map(vehicleType => (
                        <Card key={vehicleType.vehicle_id} className='me-4 border-0 shadow-lg'>
                            <Card.Img variant='top' src={vehicleType.image_path} alt={vehicleType.vehicle_type} />
                        </Card>
                    ))}
                </CardGroup>
            </Card>
        </Container>
    </Container>
);

export default VehicleTypeSection;
