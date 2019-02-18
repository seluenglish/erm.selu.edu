import cx from 'classnames'

export default class Footer extends React.Component {
  render() {
    return (
      <footer className='footer'>
        <div className='container'>
          <span className='text-muted'>
            The Early Ruskin Manuscripts, 1826–1842. &copy;&nbsp;David Hanson, &nbsp;
            <a href='mailto:david.hanson@selu.edu'>david.hanson@selu.edu</a>
          </span>
        </div>
      </footer>
    )
  }
}
