import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Thumbnail } from 'app/components/NestingComponents/Cards/NewsThumbnail'

//import { Thumbnail } from '../NestingComponents/Cards/NewsThumbnail'


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
      const { news } =this.state
      let newsData = news.filter((item) => {
        if (item._id !== id) return item
      })
      this.setState({ news: newsData })
    }
    return (
      <Container>
        <Row>
          {this.state.news
            ? this.state.news.map((item, index) => (
              <Col
                xs={12} md={6}
                key={item._id}>
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
