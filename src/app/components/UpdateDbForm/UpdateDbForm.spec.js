import UpdateDbForm from './UpdateDbForm'
import sinon from 'sinon'

describe(`Search Box Component`, function () {
  const shallowSB = props => shallow(<UpdateDbForm {...props} />)
  
  beforeEach(() => {
    this.wrapper = shallowSB({
      handleClick: () => {},
    })
  })
  
  it(`has class as className`, () => {
    expect(this.wrapper.hasClass('UpdateDbForm')).to.equal(true)
  })
  
  it(`has required the fields`, () => {
    expect(this.wrapper.find('input[type="password"]')).to.have.length(1)
    
    expect(this.wrapper.find('button')).to.have.length(1)
  })
  
  it(`search button returning callback`, () => {
    const spy = sinon.spy()
    const wrapper = shallow(<UpdateDbForm handleClick={spy} />)
    const button = wrapper.find('button')
    
    button.simulate('click')
    
    expect(spy.calledOnce).to.equal(true)
  })
  
  it(`returns user entered password on callback`, () => {
    const password='holyshitilearnthowtotest'
    
    const spy = sinon.spy()
    const wrapper = shallow(<UpdateDbForm handleClick={spy} />)
    const button = wrapper.find('button')
    const passwordField = wrapper.find('input[type="password"]')
    
    passwordField.simulate('change', { target: { value: password } })
    
    button.simulate('click')
    
    expect(spy.getCall(0).args[0]).to.equal(password)
  })
})
