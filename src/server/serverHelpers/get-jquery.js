import jQuery from 'jquery'
import jsdom from 'jsdom'

const { JSDOM } = jsdom
const { window } = new JSDOM()
const { document } = (new JSDOM('')).window
global.document = document

const $ = jQuery(window)
export default $

