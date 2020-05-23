import React from 'react'
import MediaCard2 from './Card2'
import { Field, Form } from 'formik'
import styles from '../../SearchBox/SearchBox.module.scss'
import cx from 'classnames'
import {Test2} from './Card2'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'

export class MediaCard extends React.Component{

  render() {
    return (
      <div>
        <div >

          <Link to={'/newsOne'}>
            <Paper elevation={0} />
            <h5 >Card title</h5>
            <p >Some quick example text to build on the card title and make up the bulk of the card's
              content.</p>

          </Link>

        </div>

        <Link to={'/newsOne'}>
          <Test2/>
        </Link>




      </div>


    )
  }
  }



