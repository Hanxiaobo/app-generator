// 常用表头映射
let headerMaping = {
  brandId: "集团ID",
  brandName: "集团名称",
  hotelId: "酒店ID",
  createTime: "创建时间",
  updateTime: "更新时间"
}

function parser(data, target) {
  let columns = []
  let json = data.responseParams
  if (!json) return columns
  for (let prop in json) {
    let column = {}
    column.name = prop
    column.style = {
      width: "100px"
    }
    column.header = headerMaping[prop] || '自己敲'
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