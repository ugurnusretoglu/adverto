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
        path: '/create-vehicle',
        description: 'Share your vehicle with thousands of potential buyers...',
    },
    {
        title: 'Estate',
        image: Estate,
        path: '/create-estate',
        description: 'Publish your property listings easily with Adverto...',
    },
];

function CategoryCard() {
    const navigate = useNavigate();

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
                            onClick={() => navigate(category.path)}
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