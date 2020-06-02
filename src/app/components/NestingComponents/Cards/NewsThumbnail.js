import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

let axios = require('axios')


export class Thumbnail extends React.Component {

  constructor(props) {
    super(props)
  }


  render() {
    const decision=()=>{
      if (confirm('Are you sure you want to delete?'+ this.props.props.title)) {
      // Save it!
        this.props.deleteItem(this.props.props._id)
      } else {
      // Do nothing!
      }

    }
    return (
      <div>
        <Card>
          <Card.Img variant='top' src={`${this.props.props.imgUrl}`} />
          <Card.Body>
            <Card.Title>{this.props.props.title}</Card.Title>
            <Card.Text>
              {this.props.props.description.replace(/^(.{200}[^\s]*).*/, '$1') }
            </Card.Text>

            <Row>
              <Col>
                <Button variant='primary' >
                  <Link to={{ pathname: '/news/newsOne',
                    state:  this.props.props }}>
                  Read More
                  </Link>
                </Button>
              </Col>
              <Col>
                {/*this code executes only if the admin is in /edithNews route*/}
                {document.location.pathname.indexOf('editNews')>0?(
                  <Button variant='warning' >
                    <Link to={{ pathname: `/editPost/${this.props.props._id}`,
                      state:  this.props.props }}>
                    Edit Post
                    </Link>
                  </Button>
                ):('')}
              </Col>
              <Col>
                {/*this code executes only if the admin is in /edithNews route*/}
                {document.location.pathname.indexOf('editNews')>0?(
                  <Button variant='danger' onClick={()=>decision()}>
                  Delete
                  </Button>
                ):('')}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    )

  }

}
