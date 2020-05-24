import { Form, Col, Card, Button } from 'react-bootstrap'
import React from 'react'

export class PostNews extends React.Component{

  render() {
    return (
      <div>

        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Title of Post</Form.Label>
              <Form.Control type="text" placeholder="Enter post title" />
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
                <Form.Control type="text" placeholder="Enter image link" />
              </Form.Group>
            </Form.Group>
          </Form.Row>



          <Form.Label>Post in Detail</Form.Label>
          <Form.Row>
                <textarea style={{height:'250px',width:'100%'}} placeholder={'Write your post description here!'}>
                </textarea>
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
