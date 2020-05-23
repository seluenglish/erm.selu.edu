import React from 'react';


import { Button,Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'




export class Thumbnail extends React.Component{
  render() {
    return (
      <Card>
        <Card.Img variant="top" src="https://media.istockphoto.com/photos/breaking-news-concept-picture-id951045968?k=6&m=951045968&s=612x612&w=0&h=Oyz6r7huasMM4E8QkFa-eGvtSDo-7znAoUSYSZwC_dk=" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
          <Button variant="primary">
              <Link to={'/news/newsOne'}>
                Read More
              </Link>
            </Button>
        </Card.Body>
      </Card>
    );
  }
}
