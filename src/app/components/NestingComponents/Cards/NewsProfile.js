import React from 'react';
import { Button,Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'
export class NewsProfile extends React.Component{
  render() {
    return (
      <div>
        <Card.Body>
          <Card.Img variant="top" src="https://media.istockphoto.com/photos/breaking-news-concept-picture-id951045968?k=6&m=951045968&s=612x612&w=0&h=Oyz6r7huasMM4E8QkFa-eGvtSDo-7znAoUSYSZwC_dk=" />
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional content.
          </Card.Text>
          <Link to={'/news'}>
            Go Back
          </Link>
        </Card.Body>
      </div>
    );
  }
}
