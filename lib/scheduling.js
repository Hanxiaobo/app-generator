const requester = require('./requester')
const parser_form = require('./parser/parserForm')
const parser_table = require('./parser/parserTable')
const parser_ajax = require('./parser/parserAjax')
const builder = require('./builder')

let parser = {
  'parser_form': parser_form,
  'parser_table': parser_table,
  'parser_ajax': parser_ajax
}

function getUrl(url, target) {
  requester(url)
  .then((res) => {
    let resObj = {
      form: parser_form(res, target),
      table: parser_table(res, target),
      ajax: parser_ajax(res, target)
    }
    // parser['parser_' + type](res)
    return resObj
  }).then((res) => {
    builder(res)
  })
}

module.exports = getUrl