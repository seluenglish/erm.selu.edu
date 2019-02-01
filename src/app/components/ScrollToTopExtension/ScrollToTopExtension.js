import ScrollUp from 'react-scroll-up';

export default class ScrollToTopExtension extends ScrollUp {

  handleClick() {
    const { topPosition } = this.props

    window.scrollTo(topPosition, 0)
  }

}
