import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
let axios = require('axios')

export class UserManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
    }
  }
  componentDidMount() {
    try {
      //gets all the user in the system except admin
      fetch('/allUsers').then((response => response.json())).then(result => {
        //to preserve the previous state
        this.setState({ users: result })
        console.log(this.state.users)
      })
    } catch (e) {
    }
  }
  render() {
    //this takes user id and setting it's permission to ?
    const handlePermissionChange = (userId, action) => {
      //clone it because you should not directly mutate state
      let cloneCurrentUserArray = [ ...this.state.users ]
      cloneCurrentUserArray.map((user) => {
        if (user._id === userId) {
          user.verified = action
        }
      })
      //update local UI
      this.setState({ users: cloneCurrentUserArray })
      //send changes to backend
      axios.put(`/setUserPermission/${userId}`, { setAction: action })
        .then(res => {
          console.log(res)
        })
    }
    return (
      <div>
        <Card>
          <Card.Body>
            {/*this resides on top of users, will be displayed only when users list is shown */}
            {this.state.users.length > 0 ? (
              <p>
                <Row>
                  <Col>Username</Col>
                  <Col>Permission</Col>
                  <Col>Actions</Col>
                </Row>
              </p>
            ) : (
              // this is render is user is not login
              <Row>
                <Col>
                  <Link to={'/login'}>
                    <Button>Login</Button>
                  </Link>
                </Col>
                <Col>
                  <Link to={'/register'}>
                    <Button>Register</Button>
                  </Link>
                </Col>
              </Row>
            )}
            {this.state.users.length > 0 ? (
              this.state.users.map((user, index) => {
                return (
                  <p>
                    <Row>
                      <Col>
                        <Button variant="primary">{user.username}</Button>
                      </Col>
                      <Col>
                        <Button variant="success"> {user.verified.toString()}</Button>
                      </Col>
                      <Col>
                        {/*sends userId and action value, action value is set !originalValue*/}
                        <Button variant="danger" onClick={(e) => handlePermissionChange(user._id, !user.verified)}>
                          {/*to display boolean value */}
                          Set to {(!user.verified).toString()}
                        </Button>
                      </Col>
                    </Row>
                  </p>
                )
              })
            ) : (
              ''
            )}
          </Card.Body>
        </Card>
      </div>
    )
  }
}
