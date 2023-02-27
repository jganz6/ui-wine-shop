import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardImage from '../assets/images/products/1_barrelx2.png';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function MediaCard({ like }) {
    return (
        <Card sx={{ maxWidth: 200, borderRadius: '20px', margin: '20px 0 20px 0', filter: 'drop-shadow(1px 4px 4px rgba(0, 0, 0, 0.25))' }}>
            <CardMedia sx={{ height: 140, backgroundSize: '100px 200px' }} image={CardImage} title="green iguana" />
            <CardContent>
                <Typography gutterBottom variant="h5" color="text.secondary" component="div">
                    Soju ChumChurum Original 360ml, A ...
                </Typography>
                <Typography variant="h4">Rp 68.000</Typography>
            </CardContent>
            <CardActions>
                <IconButton size="small" color="error">
                    {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <IconButton size="small" color="primary">
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
