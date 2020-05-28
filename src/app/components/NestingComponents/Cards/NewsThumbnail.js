import React from 'react';
import { Button,Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export class Thumbnail extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      _id:props.props._id,
      title:props.props.title,
      imgUrl:props.props.imgUrl,
      description:props.props.description
    }
  }
  render() {
    return (
      <Card>
        <Card.Img variant="top" src={`${this.state.imgUrl}`} />
        <Card.Body>
          <Card.Title>{this.state.title}</Card.Title>
          <Card.Text>
            {this.state.description.replace(/^(.{200}[^\s]*).*/, "$1") }
          </Card.Text>
          <Button variant="primary" >
            <Link to={{ pathname: '/news/newsOne',
              state:  this.state }}>
                Read More
            </Link>
          </Button>
        </Card.Body>
      </Card>
    );
  }
}
