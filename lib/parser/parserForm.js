const prettyFormat = require('pretty-format')
function parser(data, target) {
  let json = data.responseParams
  let fields = []
  let model = {}
  for (let key in json) {
    model[key] = ''
    let obj = {
      name: key,
      label: json[key].description,
      component: '',
      value: '',
    }
    switch (json[key].type) {
      case 'integer':
        obj.component = 'Number'
        break
      case 'string':
        obj.component = 'Input'
        break
      case 'array':
        obj.component = 'Select'
        obj.options = []
        obj.optionKeyName = 'label'
        obj.optionValueName = 'value'

        break
    }
    fields.push(obj)
  }
  return {
    fields,
    model
  }
}

module.exports = parser