function parser(data, target) {
  let columns = []
  let json = data.responseParams
  if (!json) return columns
  for (let prop in json) {
    let column = {}
    column.name = prop
    column.style = {}
    column.header = json[prop].header || ''
    columns.push(column)
  }
  columns.push({
    "name": "actions",
    "header": "操作",
    "component": "Buttons",
    "buttons": {
      "edit": "编辑",
      "delete": "删除",
      "view": "详情"
    }
  })
  return columns
}

module.exports = parser