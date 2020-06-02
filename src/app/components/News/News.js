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

  render() {
    const deleteItem =(id) =>{
      // let copyState =this.state.news.slice();
      // copyState.map((item,index)=>{
      //   if (item._id===id){
      //     copyState.splice(index ,1);
      //
      //     copyState.map((data)=>{
      //       console.log('---------')
      //       console.log(data.title)
      //     })
      //
      //     this.setState({news:[]})
      //     this.state.news.map((data)=>{
      //       console.log('))))))))))')
      //       console.log(data.title)
      //     })
      //
      //   }
      // })



      this.state.news.map((item,index)=>{
        if (item._id===id){
          this.setState({news:this.state.news.splice(index ,1)})

          console.log(this.state.news.length)
        }
      })



    }
    return (
      <Container>
        <Row>
          {this.state.news?
            this.state.news.map((item,index)=>(
              <Col xs={12} md={6}>
                <Thumbnail props={item} deleteItem ={deleteItem} keys={index}/>
              </Col>
            ))
            :
            (<span>no data</span>)}
        </Row>
      </Container>
    )
  }
}
