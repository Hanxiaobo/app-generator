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

function getUrl(url, target, type, api, path) {
  requester(url)
  .then((res) => {   
    res = parseInterFaceJson(res, target)
    return parser['parser_' + type](res, target)
  }).then((res) => {
    builder(res, target, type, api, path)
  })
}

function parseInterFaceJson(val, target) {
  let data = {}
  var jsontxt = val;
  var json = JSON.parse(jsontxt);
  let key = '/' + target
  let params = []
  let responseParams = ''
  let requestType = json.paths[key].get ? 'get' : 'post'

  params = json.paths[key][requestType].parameters.length > 0 ? json.paths[key][requestType].parameters : []
 
  var schema
  json.paths[key][requestType].parameters.map(function (item) {
    if (item.in === 'body') {
      schema = item.schema
    }
  })
  // var schema = json.paths[key][requestType].parameters[json.paths[key][requestType].parameters.length-1].schema
  if (schema && schema.$ref) {
    params = json.definitions[schema.$ref.substr(14, schema.length)].properties
  }

  let resref = json.paths[key][requestType].responses[200].schema && json.paths[key][requestType].responses[200].schema.$ref
  responseParams = resref ? resref.substr(14, resref.length) : ''
 
  if (responseParams && json.definitions[responseParams].properties) {
    let resObj = getRes (json.definitions[responseParams] && json.definitions[responseParams].properties, json.definitions)
    data.responseParams = resObj || '没能找到数据'
  }
  data.requestParams = params
  data.requestType = requestType
  return data
}

function getRes (resObj, definitions) {
  let reskey = ''
  let hasRef = false
  for(var key in resObj) {
    if (resObj[key].$ref) {
      hasRef = true
      reskey = resObj[key].$ref.substr(14, resObj[key].$ref.length)
      break
    }
    if (resObj[key].type === 'array' && resObj[key].items && resObj[key].items.$ref) {
      hasRef = true
      reskey = resObj[key].items.$ref.substr(14, resObj[key].items.$ref.length)
      break
    }
    if (resObj[key].type === 'object'&& resObj[key].data && resObj[key].data.$ref) {
      hasRef = true
      reskey = resObj[key].data.$ref.substr(14, resObj[key].data.$ref.length)
      break
    }
  }
  if (!hasRef) {
    return resObj
  } else {
    return getRes(definitions[reskey] && definitions[reskey].properties, definitions)
  }
}

module.exports = getUrl