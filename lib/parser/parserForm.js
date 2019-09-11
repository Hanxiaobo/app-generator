const prettyFormat = require('pretty-format')
function parser(data, target) {
  let json = data.requestParams
  let fields = []
  let model = {}
  let validation = {}
  for (let key in json) {
    model[key] = ''
    let obj = {
      name: key,
      label: json[key].description,
      component: ''
    }
    
    if (json.required) {
      validation[key] = {
        required: true
      }
    }
    switch (json[key].type) {
      case 'integer':
        obj.component = 'Number'
        break
      case 'string':
        obj.component = 'Input'
        if (json[key].format === 'date-time') {
          obj.component = 'zkt-datetimepicker'
        }
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
    model,
    validation
  }
}

module.exports = parser