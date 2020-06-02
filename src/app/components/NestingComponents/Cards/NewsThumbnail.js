import React from 'react';
import { Button,Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

let axios = require('axios')


export class Thumbnail extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      _id:props.props._id,
      title:props.props.title,
      imgUrl:props.props.imgUrl,
      description:props.props.description,
      deletionItemId:null,
      show:false,
    }
  }
  render() {
    const handleClose = () => this.setState({show:false});
    const handleShow = () => {
      this.setState({show:true});

    }
    const decision =()=>{
      // axios.delete(`/deleteNews/${this.state._id}`)
      //   .then(res => {
      //     console.log(res)
      //     this.setState({title:null})
      //     this.setState({imgUrl:null})
      //     this.setState({description:null})
      //     handleClose();
      //   })
      this.props.deleteItem(this.state._id)
      handleClose();

    }


    return (
      <Card>
        <Card.Img variant="top" src={`${this.state.imgUrl}`} />
        <Card.Body>
          <Card.Title>{this.state.title}</Card.Title>
          <Card.Text>
            {this.state.description.replace(/^(.{200}[^\s]*).*/, "$1") }
          </Card.Text>

          <Row>
            <Col>
              <Button variant="primary" >
                <Link to={{ pathname: '/news/newsOne',
                  state:  this.state }}>
                  Read More
                </Link>
              </Button>
            </Col>
            <Col>
              {/*this code executes only if the admin is in /edithNews route*/}
              {document.location.pathname.indexOf('editNews')>0?(
                <Button variant="warning" >
                  <Link to={{ pathname: `/editPost/${this.state._id}`,
                    state:  this.state }}>
                    Edit Post
                  </Link>
                </Button>
              ):('')}
            </Col>
            <Col>
              {/*this code executes only if the admin is in /edithNews route*/}
              {document.location.pathname.indexOf('editNews')>0?(
                <Button variant="danger"  onClick={handleShow}>
                   Delete
                </Button>
              ):('')}
            </Col>
          </Row>

        </Card.Body>
        <Modal show={this.state.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Do you want to delete this post?</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.title}</Modal.Body>
          <Modal.Footer>
            <Row>
              <Col>
                <Button variant="secondary" onClick={decision}>
                  Yes
                </Button>
              </Col>
              <Col>
                <Button variant="primary" onClick={handleClose}>
                  No
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>
      </Card>
    );
  }
}
