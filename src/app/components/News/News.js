import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Thumbnail } from '../NestingComponents/Cards/NewsThumbnail'

import { isAuthenticated } from '../../../action/authentication'

export class News extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      news: [],
      props: props.props,
    }
  }
  componentDidMount() {
    fetch('/getNews').then((response => response.json())).then(result => {

      this.setState({ news: result })
    })
  }
  render() {
    const deleteSingleNews = (id) => {
      let newsData = this.state.news.filter((item) => {
        if (item._id !== id) return item
      })
      this.setState({ news: newsData })
    }
    return (
      <Container>
        <Row>
          {this.state.news
            ? this.state.news.map((item, index) => (
              <Col xs={12} md={6}>
                {/*<button onClick={()=>deleteSingleNews(item._id)}>{item.title}</button>*/}
                <Thumbnail
                  props={item}
                  key={item._id}
                  deleteItem={deleteSingleNews}
                />
              </Col>
            ))
            : (<span>no data</span>)}
        </Row>
      </Container>
    )
  }
}
