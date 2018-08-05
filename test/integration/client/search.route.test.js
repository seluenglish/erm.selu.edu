
describe(`Search Route`, function () {
  beforeEach(done => {
    helpers.prepare(this, '/search', done)
  })
  
  afterEach(() => {
    helpers.cleanup(this)
  })
  
  it(`renders the .SearchRoute`, () => {
    expect(this.wrapper.find('.SearchRoute')).to.be.present()
  })
})
