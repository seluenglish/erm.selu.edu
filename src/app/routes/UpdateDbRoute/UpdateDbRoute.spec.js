import UpdateDbRoute from './UpdateDbRoute'
import UpdateDbForm from 'app/components/UpdateDbForm/UpdateDbForm'

describe(`UpdateDbRoute Component`, function () {
  const shallowSR = (props) => shallow(<UpdateDbRoute {...props} />)
  
  beforeEach(() => {
    this.wrapper = shallowSR()
  })
  
  it(`has className`, () => {
    expect(this.wrapper.hasClass('UpdateDbRoute')).to.equal(true)
  })
  
  it(`has the password box`, () => {
    expect(this.wrapper.find(UpdateDbForm)).to.have.length(1)
  })
  
  it(`can get the password`, () => {
  
  })
})

