import React from 'react'
import { Card } from 'react-bootstrap'
export class Maps extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      height: '900px',
    }
  }
  ComponentDidMount() {
    // let width= window.innerWidth+'px';
    this.setState({
      height: window.innerHeight + 'px',
    })
  }
  render() {
    return (
      <Card style={{ height: this.state.height }}>
        <embed className="map-dora-embed" src={'https://prashantbasnet94.github.io/Erm_Ruskin_Map/'}
               style={{ height: '100%', width: '100%' }}/>
      </Card>
    )
  }
}
