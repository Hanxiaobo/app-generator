const prettyFormat = require('pretty-format')
function parser(json, target) {
  console.log(json)
  let fields = []
  for (let key in json) {
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
  return fields
}

module.exports = parser