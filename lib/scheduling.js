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
      form: parser_form(res),
      table: parser_table(res),
      ajax: parser_ajax(res)
    }
    // parser['parser_' + type](res)
    return resObj
  }).then((res) => {
    builder(res)
  })
}

module.exports = getUrl