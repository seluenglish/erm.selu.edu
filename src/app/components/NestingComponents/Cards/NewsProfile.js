import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export class NewsProfile extends React.Component {
  constructor(props) {
    super(props)
    // console.log('test------**')
    if (props.location.state) {
      this.state={
        dataExist:true,
        title:props.location.state.title,
        imgUrl:props.location.state.imgUrl,
        description:props.location.state.description,
        backUrl:props.history.location.pathname,
      }
    } else {
      this.state={
        dataExist:false,
      }
    }

    // console.log(props)
  }
  render() {
    return (
      <div>
        {this.state.dataExist?(
          <Card.Body>
            <Card.Img variant='top' src={`${this.state.imgUrl}`} />
            <Card.Title>{this.state.title}</Card.Title>
            <Card.Text>
              {this.state.description}
            </Card.Text>
            {this.state.backUrl? (
              <Link to={'/news'}>
                Go Back
              </Link>
):''}
          </Card.Body>
          ):(
            <span>No data</span>
        )
        }

      </div>
    )
  }
}
