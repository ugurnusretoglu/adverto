import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';

import Vehicle from '../images/vehicle.jpg';
import Estate from '../images/estate.jpg';
import '../CSS/CategoryCard.css';
import { useNavigate } from 'react-router-dom';

const categories = [
    {
        title: 'Vehicle',
        image: Vehicle,
        description:
            'Share your vehicle with thousands of potential buyers through Adverto. Add detailed information such as brand, model, year, mileage, and pricing to create a professional listing. Upload high-quality photos to attract more attention and connect directly with interested users. Whether you are selling or searching for a car, Adverto makes the process simple and fast.',
    },
    {
        title: 'Estate',
        image: Estate,
        description:
            'Publish your property listings easily with Adverto and reach people looking for their next home or investment. Add detailed descriptions, pricing, location, and property features to help users find exactly what they need. Showcase your apartment, house, office, or land with attractive photos and updated information. Discover reliable real estate opportunities and communicate directly with property owners or agents.',
    },
];

function CategoryCard() {

    const navigate = useNavigate();

    const goToVehicle = () => {
        navigate("/create-vehicle");
    }

    return (
        <Container maxWidth="xl" className="category">
            {categories.map((category) => (
                <Card className="card" key={category.title}>
                    <CardActionArea className="cardAction">
                        <CardMedia
                            component="img"
                            image={category.image}
                            alt={category.title}
                            className="cardImage"
                            onClick={goToVehicle}
                        />

                        <CardContent className="cardContent">
                            <Typography gutterBottom variant="h5" component="h2">
                                {category.title}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                {category.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </Container>
    );
}

export default CategoryCard;