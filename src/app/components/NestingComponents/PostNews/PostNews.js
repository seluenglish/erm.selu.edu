import { Form, Col, Card, Button,Toast,Alert } from 'react-bootstrap'
import React,{useState,useEfect} from 'react'
import Row from 'react-bootstrap/Row'
const axios = require('axios')
import './form.css'

let afterBackendCall=false;

export class PostNews extends React.Component{

  constructor(props) {
    super(props);

    //creating a state
    this.state={
      show:false,
      title: null,
      titleError:null,
      imgUrl: null,
      imgUrlError: null,
      description: null,
      descriptionError: null,
    }
  }

  handleForm(e) {
    e.preventDefault();
    if (this.state.title && this.state.imgUrl && this.state.description){
      //Request to backend for adding post
      axios.post(`/createNews`,{title:`${this.state.title}`,imgUrl:`${this.state.imgUrl}`,description:`${this.state.description}`})
        .then(res => {
          this.setState({show:true})
        })


    } else {
      if (this.state.title==null) this.setState({titleError:'Check the title '})
      if (this.state.imgUrl==null) this.setState({imgUrlError:'Check the image url '})
      if (this.state.description==null) this.setState({descriptionError:'Check the description '})
    }
  }


  change(e) {
    this.setState({[e.target.name]:e.target.value})
    this.setState({titleError:null,imgUrlError:null,descriptionError:null})
  }

  render() {
    return (
      <div>

        {this.state.show?(

          <Row>

            <Col xs={12}>
              <Toast onClose={() => this.setState({show:false})} show={this.state.show}   autohide>
                <Toast.Header>

                </Toast.Header>
                <Alert variant='primary'>
                  Post was successful!
                </Alert>
              </Toast>
            </Col>
          </Row>


        ):('')}

        <Form onSubmit={(e)=>this.handleForm(e)}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Title of Post</Form.Label>
              <Form.Control type="text"  name="title" placeholder="Enter post title" onChange={(e)=>this.change(e)} />
              <span className={'validationError'}>{this.state.titleError}</span>
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
                <span className={'validationError'}>{this.state.imgUrlError}</span>
              </Form.Group>
            </Form.Group>
          </Form.Row>



          <Form.Label>Post in Detail</Form.Label>
          <Form.Row style={{border:'inset'}}>
            <textarea style={{height:'250px',width:'100%'}} name='description' placeholder={'Write your post description here!'} onChange={(e)=>this.change(e)} />
            <span className={'validationError'}>{this.state.descriptionError}</span>
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
