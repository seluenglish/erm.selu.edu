import * as React from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import './authentication.css'
import { Link } from 'react-router-dom'
let axios = require('axios')

export class Authentication extends React.Component{
  constructor(props) {
    super(props)
    this.state={
      email:null,
      emailError:'',
      password:null,
      passwordError:'',
      credentialError:null
    }
  }

  render() {

    const handleForm =(e)=>{
      try{
        e.preventDefault();
        if (this.state.email==null){
          this.setState({emailError:'Check your email'})
        }
        if (this.state.password==null ){
          this.setState({passwordError:'Check your password'})
        }


        if (this.state.emailError===null && this.state.passwordError===null){

          const location = window.location.pathname;

          if (location.indexOf('register')>0){
            console.log('registration ')
            axios.post(`/register`,{username:`${this.state.email}`,password:`${this.state.password}`})
              .then(res => {
                console.log('-----response')
                console.log(res)
                if(res.data.registrationSuccess){
                  console.log('==pushing state')
                  this.props.history.push({
                    pathname: '/login',
                  })
                }else{
                  console.log('==falsing state')
                  this.setState({credentialError:res.data.message})
                }
              })
          }else{
            axios.post(`/login`,{username:`${this.state.email}`,password:`${this.state.password}`})
              .then(res => {
                if(res.data.username===this.state.email){

                  this.props.history.push({
                    pathname: '/news',
                  })
                }else{
                  this.setState({credentialError:'Credential Incorrect'})
                }
              })
          }

        }
      }catch (e) {
        console.log(e)
      }


    }
    const changeState=(e)=> {
      this.setState({[e.target.name]:e.target.value})
      this.setState({emailError:null})
      this.setState({passwordError:null})
      this.setState({credentialError:null})
    }

    const path=this.props.location.pathname;

    return (



      <Form onSubmit={(e)=>{handleForm(e)}} style={{paddingTop:'30px'}}>


        <Card style={{ width: '18rem' }}>
          {path.indexOf('login')>0?(
            <Button variant="warning" size="lg" block>
              Login
            </Button>
          ):(
            <Button variant="warning" size="lg" block>
              Registration
            </Button>
          )}
          <Card.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter email"  onChange={(e)=>changeState(e)}/>
              <Form.Text className={"formError"}>
                {this.state.emailError}
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password"  onChange={(e)=>changeState(e)}/>
              <Form.Text className={"formError"}>
                {this.state.passwordError}
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Form.Text className={"formError"}>
              {this.state.credentialError}
            </Form.Text>
          </Card.Body>
        </Card>


        <p style={{textAlign:'center', color:'#0000ff'}} >
          {path.indexOf('login')>0?(
            <Link to={'/register'} >Don't Have an account?</Link>
          ):(
            <Link to={'/login'} >Already have account?</Link>
          )}


        </p>



      </Form>
    )
  }


}
