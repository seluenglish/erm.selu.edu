import { Form, Col, Card, Button } from 'react-bootstrap'
import React,{useState,useEfect} from 'react'
const axios = require('axios')




export class PostNews extends React.Component{

  constructor(props) {
    super(props);

    //creating a state
    this.state={
      title: null,
      imgUrl: null,
      description: null,
    }
  }

  handleForm(e) {
    e.preventDefault();
    if (this.state.title && this.state.imgUrl && this.state.description){

      // const requestOptions = {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: {
      //     "title":"prashant",
      //     "imgUrl":"what?",
      //     "description":"no no no"
      //   }
      // };


      axios.post(`/createNews`,{"title":"prash'ant","imgUrl":"what?","description":"n"})
        .then(res => {
          console.log(res);
          console.log(res.data);
        })


    }
  }



  change(e) {
    this.setState({[e.target.name]:e.target.value})
  }

  render() {
    return (
      <div>

        <Form onSubmit={(e)=>this.handleForm(e)}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Title of Post</Form.Label>
              <Form.Control type="text"  name="title" placeholder="Enter post title" onChange={(e)=>this.change(e)} />
            </Form.Group>
          </Form.Row>

          <Form.Label>Image</Form.Label>
          <Form.Row>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.File

                label="Custom file input"
                lang="en"
                custom
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Control type="text" name="imgUrl" placeholder="Enter image link" onChange={(e)=>this.change(e)} />
              </Form.Group>
            </Form.Group>
          </Form.Row>



          <Form.Label>Post in Detail</Form.Label>
          <Form.Row style={{border:'inset'}}>
            <textarea style={{height:'250px',width:'100%'}} name='description' placeholder={'Write your post description here!'} onChange={(e)=>this.change(e)} />
          </Form.Row>

          <br/>



          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

      </div>

    )
  }

}
