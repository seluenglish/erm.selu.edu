import { isBrowser, typeToReducer, get } from 'app/utils'
import { END_CONNECTION, ADD_MESSAGE, START_CONNECTION, UPDATE_LOGGER_DIV_ID } from './server-update-db.constants'
import update from 'immutability-helper';
import ReactDOM from 'react-dom'
import cx from 'classnames'

const initialState = {
  data: {
    div: undefined,
  },
}

export const serverUpdateDbReducers = typeToReducer({
  [START_CONNECTION]: (state, action) => {
    return state
  },
  [ADD_MESSAGE]: (state, action) => {
    if (isBrowser) {
      let { level, message } = action.payload

      const div = state.data.div
      if (div) {
        const container = div.current

        const htmlDiv = document.createElement('div')

        const lineNumber = container.children.length + 1

        ReactDOM.render((
          <div className={cx('level-'+level, 'logger-row')}>
            <span className={'line-number'}>{lineNumber}</span>.
            <span
              className={'level'}
              style={{
                display: level === 'INFO'?'none':'inline-block',
              }}
            > [{level}]</span>
            <span className={'message'}> {message}</span>
          </div>
        ), htmlDiv)

        container.append(htmlDiv)
      }

    }
    return state
  },
  [UPDATE_LOGGER_DIV_ID]: (state, action) => {
    if (isBrowser) {
      const myNode = action.data.current
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild)
      }

      return update(state, {
        data: {
          div: { $set: action.data },
        },
      })

    }
    return state
  },

}, initialState)
