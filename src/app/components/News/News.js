import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {Thumbnail} from '../NestingComponents/Cards/NewsThumbnail'

export class News extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      news:[]
    }
  }

  componentDidMount() {
    fetch('/getNews').then((response=>response.json())).then(result=>{
      console.log('what?')
      this.setState({news:result});
      console.log(this.state.news)
    })

  }
//
//   this.state.news.map((item=>{
// <Col >
// {/*<Thumbnail props={item}/>*/}
// data
// </Col>
// }))
  render() {
    return (
      <Container>
        <Row>
          {this.state.news?
            this.state.news.map((item)=>(
              <Col xs={12} md={6}>
                <Thumbnail props={item}/>
              </Col>
            ))
            :
            (<span>no data</span>)}
        </Row>
      </Container>
    )
  }
}
