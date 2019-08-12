const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
let root = __dirname.split('node_modules')[0]

function builder(data, target, type) {
  let _path =  path.join(root, 'src', 'appConfig', target)
  md(_path).then(function () {
    let targetPatch = _path + path.sep + type + '.json'
    if (fs.existsSync(targetPatch)){
      inquirer.prompt([{
        name: 'description',
        message: '文件已存在，是否覆盖：(y/n)'
      }]).then((answers) => {
        if (answers.description !== 'y') return
        fs.writeFile(targetPatch, JSON.stringify(data), 'utf-8', function(error){
          if(error){
            console.log(error);
            return false;
          }
          console.log('生成成功');
        })
      })
    }
    
  }) 
}

function md(url) {
  return new Promise(function (resolve, reject) {
    let paths=url.split(path.sep); //将a/b/c拆分成数组['a','b','c']
    let index=0;
    function make(_path){
        if(index===paths.length+1){ // 如果到终点，停止递归
            resolve();
            return;
        }
        if(!fs.existsSync(_path)){ //不存在
            //创建文件夹
            fs.mkdir(_path,function (error) {
              if (error) {
                reject()
              }
              make(paths.slice(0,++index).join(path.sep))
            })
        }else{ //存在
            make(paths.slice(0,++index).join(path.sep))
        }
    }
    make(paths[index++]) //先取出第一个
  })
}
module.exports = builder