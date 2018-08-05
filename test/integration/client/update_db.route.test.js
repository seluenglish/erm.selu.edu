
describe(`Update Db Route`, function () {
  beforeEach(done => {
    helpers.prepare(this, '/update_db', done)
  })
  
  afterEach(() => {
    helpers.cleanup(this)
  })
  
  it(`renders the .UpdateDbRoute`, () => {
    expect(this.wrapper.find('.UpdateDbRoute')).to.be.present()
  })
})
