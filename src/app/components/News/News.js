import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {Thumbnail} from '../NestingComponents/Cards/NewsThumbnail'

export class News extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <Thumbnail/>
          </Col>
        </Row>
      </Container>
    )
  }
}
