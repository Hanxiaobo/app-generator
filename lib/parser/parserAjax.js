function parser(data, target) {
  let ajaxConfig = {}
  let json = data.requestParams
  ajaxConfig.method = data.requestType
  ajaxConfig.url = process.argv[3] + '/' + target
  ajaxConfig.params = {}
  for (let key in json) {
      let name = json[key].name
      let type = json[key].type
      let description = json[key].description
      let required = json[key].required
      let paramType = json[key].in
      ajaxConfig.params[name] = required + ' + ' + type + ' + ' + description + ' + ' + paramType
  }
  return ajaxConfig
}

module.exports = parser