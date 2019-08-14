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

function getUrl(url, target, type) {
  requester(url)
  .then((res) => {   
    res = parseInterFaceJson(res, target)
    return parser['parser_' + type](res, target)
  }).then((res) => {
    builder(res, target, type)
  })
}

function parseInterFaceJson(val, target) {
  var jsontxt = val;
  var json = JSON.parse(jsontxt);
  var maintitle = json.info.title;
  var obj = {}
  json.tags.map((item) => {
    obj[item.name] = {
      des: item.description,
      interface: {}
    }
  })

  let key = '/' + target
  // let temp = ''
  let params = []
  let responseParams = ''
  if (json.paths[key].get) {
    // temp = obj[json.paths[key].get.tags[0]]
    // temp.interface[key] = {
    //   type: 'get',
    //   fields: [],
    //   model: {},
    //   columns: [],
    //   gateway: '\'' + maintitle + key + '\'' + ': \'internal\','
    // }
    params = json.paths[key].get.parameters.length > 0 ? json.paths[key].get.parameters : []
    let resref = json.paths[key].get.responses[200].schema && json.paths[key].get.responses[200].schema.$ref
    responseParams = resref ? resref.substr(14, resref.length) : ''
  } else if (json.paths[key].post) {
    // temp = obj[json.paths[key].post.tags[0]]
    // temp.interface[key] = {
    //   type: 'post',
    //   fields: [],
    //   model: {},
    //   columns: [],
    //   gateway: maintitle + key + ':internal,'
    // }
    params = json.paths[key].post.parameters.length > 0 ? json.paths[key].post.parameters : []
    let resref = json.paths[key].post.responses[200].schema && json.paths[key].post.responses[200].schema.$ref
    responseParams = resref ? resref.substr(14, resref.length) : ''
  }
 
  if (responseParams) {
    let reskey = getKey (json.definitions[responseParams] && json.definitions[responseParams].properties.data, json.definitions)
    return json.definitions[reskey] && json.definitions[reskey].properties || '没能找到数据'
  }
  console.log('接口没有返回参数')
}

function getKey (reskey, definitions) {
  let resfinalKey = '';

  if (reskey) {
    if (reskey.items) {
      if (reskey.items.$ref) {
        resfinalKey = reskey.items.$ref && reskey.items.$ref.substr(14, reskey.items.$ref.length)
      }
      
      if (reskey.items.type && reskey.items.type.toLocaleLowerCase() === 'array') {
        resfinalKey = getKey(definitions[resfinalKey] && definitions[resfinalKey].properties.data, definitions)
      }
    } else {
      if (reskey.$ref) {
        resfinalKey = reskey.$ref.substr(14, reskey.$ref.length)
      } else {
        resfinalKey = ''
      }
    }
  }
  return resfinalKey
}

module.exports = getUrl