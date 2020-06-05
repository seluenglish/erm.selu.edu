import { Form, Col, Card, Button,Toast,Alert } from 'react-bootstrap'
import React,{ useState,useEfect} from 'react'
import Row from 'react-bootstrap/Row'
import './form.css'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

const axios = require('axios')

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
      username:null,
      isAuthenticated:false
    }

    if (this.props.location.state){
      this.state={
        show:false,
        title: this.props.location.state.title,
        titleError:null,
        imgUrl: this.props.location.state.imgUrl,
        imgUrlError: null,
        description: this.props.location.state.description,
        descriptionError: null,
      }
    }
  }



  componentDidMount() {
    fetch('/isLoggedIn').then((response => response.json())).then(result => {
      console.log('what?')
      this.setState({
        username:result.passport.user
      });
      console.log(this.state.username)
      if(this.state.username){
        this.setState({isAuthenticated:true})
      }
      console.log(result)
      console.log(this.state.username)
    })
  }


  handleForm(e) {
    //prevents the default form loading
    e.preventDefault();
    //checks if the form is created or is edited
    if (this.state.title && this.state.imgUrl && this.state.description){
      //if edited
      if (this.props.location.state){

        //this will execute when post is edited
        axios.put(`/editNews/${this.props.location.state._id}`, {title:`${this.state.title}`,imgUrl:`${this.state.imgUrl}`,description:`${this.state.description}`})
          .then(res => {
            this.setState({show:true})
          })
        //if created a new form
      } else {
        //Request to backend for adding post
        axios.post(`/createNews`,{title:`${this.state.title}`,imgUrl:`${this.state.imgUrl}`,description:`${this.state.description}`})
          .then(res => {
            this.setState({show:true})
          })
      }

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
        {this.state.username?(
          <span>
          <span>
            {/*Excutes only after user submits the form either submits the form or render form validation error*/}
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
        </span>
        /*this will make form auto populate on post edit*/

            {this.props.location.state?(
              <Form onSubmit={(e)=>this.handleForm(e)}>
              <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Title of Post</Form.Label>
              <Form.Control type="text" name="title"  value ={`${this.state.title}`} placeholder={`${this.props.location.state.title}`} onChange={(e)=>this.change(e)} />
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
              <Form.Control type="text" name="imgUrl" value ={`${this.state.imgUrl}`} placeholder={`${this.props.location.state.imgUrl}`} onChange={(e)=>this.change(e)} />
              <span className={'validationError'}>{this.state.imgUrlError}</span>
              </Form.Group>
              </Form.Group>
              </Form.Row>
              <Form.Label>Post in Detail</Form.Label>
              <Form.Row style={{border:'inset'}}>
              <textarea style={{height:'250px',width:'100%'}} name='description' value ={`${this.state.description}`}  placeholder={`${this.props.location.state.description}`} onChange={(e)=>this.change(e)} />
              <span className={'validationError'}>{this.state.descriptionError}</span>
              </Form.Row>
              <br/>
              <Button variant="primary" type="submit">
              Submit
              </Button>
              </Form>
              ):(
              // this will render a complete new form
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
              )}
        </span>
        ):(
          <Link to={'/login'}>
            <Button link={'/login'}>Login</Button>
          </Link>


            // <Redirect to={'/login'}/>
          )}

      </div>
    )
  }
}
