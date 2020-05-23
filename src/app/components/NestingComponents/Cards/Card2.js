import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Button,Card } from 'react-bootstrap';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});


export class Test2 extends React.Component{
  render() {
    // <Card >
    //   <CardActionArea>
    //     <CardMedia
    //       component="img"
    //       alt="Contemplative Reptile"
    //       height="140"
    //       image="https://media.istockphoto.com/photos/breaking-news-concept-picture-id951045968?k=6&m=951045968&s=612x612&w=0&h=Oyz6r7huasMM4E8QkFa-eGvtSDo-7znAoUSYSZwC_dk="
    //       title="Contemplative Reptile"
    //     />
    //     <CardContent>
    //       <Typography gutterBottom variant="h5" >
    //         Lizard
    //       </Typography>
    //       <Typography variant="body2" color="textSecondary">
    //         Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
    //         across all continents except Antarctica
    //       </Typography>
    //     </CardContent>
    //   </CardActionArea>
    //
    // </Card>
    return (


      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  }
}
