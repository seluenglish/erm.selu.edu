import DocumentMeta from 'react-helmet'
import { hot } from 'react-hot-loader'

class SearchRoute extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section className='SearchRoute'>
        <DocumentMeta>
          <title />
        </DocumentMeta>
        Searching...

        <form
          className='searchForm'>
          <fieldset>
            <legend>Advanced Search</legend>
            <div className='searchFields'>
              <div className={'firstBox'}>
                <input
                  type={'text'}
                  name={'searchText'}
                  placeholder={'Search for a keyword or phrase...'}
                />
                <label htmlFor='fullTextCheckbox'>
                  <input
                    type='checkbox'
                    name='fullText'
                    id='fullTextCheckbox'
                  />
                  Search full text of documents</label>
              </div>
              <div className='secondBox'>
                <button type='button'>Search</button>
              </div>
              <div className='thirdBox'>
                <label htmlFor='searchIn'>
                  Search in:
                  <select id='searchIn'>
                    <option>A</option>
                    <option>B</option>
                  </select>
                </label>

                <label htmlFor='docType'>
                  Doc Type:
                  <select id='docType'>
                    <option>A</option>
                    <option>B</option>
                  </select>
                </label>

                <label htmlFor='subDocType'>
                  Subdoc type:
                  <select id='subDocType'>
                    <option>A</option>
                    <option>B</option>
                  </select>
                </label>
              </div>
            </div>
          </fieldset>

        </form>

      </section>
    )
  }
}

export default hot(module)(SearchRoute)

