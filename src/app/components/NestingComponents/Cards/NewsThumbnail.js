import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import { isAuthenticated } from '../../../../action/authentication'
import {useDispatch} from 'react-redux'
let axios = require('axios')


export class Thumbnail extends React.Component {

  constructor(props) {
    super(props)

    this.state={
      username:null,
      isAuthenticated:false
    }
  }



  componentDidMount() {

    fetch('/isLoggedIn').then((response => response.json())).then(result => {
      console.log('what?')
      this.setState({
        username:result.passport.user
      });
      if(this.state.username){
        this.setState({isAuthenticated:true})
      }
      console.log(this.state.isAuthenticated)
    })

  }


  render() {
    const decision=()=>{
      if (confirm('Are you sure you want to delete?'+ this.props.props.title)) {
      // Save it!
        this.props.deleteItem(this.props.props._id)
        //this will execute when post is deleted
        axios.delete(`/deleteNews/${this.props.props._id}`)
          .then(res => {
            console.log(res)
          })
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
                { this.state.isAuthenticated?(
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
                { this.state.isAuthenticated?(
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
