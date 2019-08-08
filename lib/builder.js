const fs = require('fs')
var path = require("path") 
var root = path.join(__dirname, '../json') 

function builder(data) {
  let filePath = root + '/form.json'
  console.log(data, root)
  fs.writeFile('D:/vue-test/node_modules/app-config-generator/form.json', JSON.stringify(data), 'utf-8', function(error){
    if(error){
      console.log(error);
      return false;
    }
    console.log('生成成功');
  })
}
module.exports = builder