const fs = require('fs')
let root = __dirname.split('node_modules')[0]
console.log(root)

function builder(data) {
  fs.writeFile(root + '/swagger.json', JSON.stringify(data), 'utf-8', function(error){
    if(error){
      console.log(error);
      return false;
    }
    console.log('生成成功');
  })
}
module.exports = builder