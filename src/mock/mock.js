// 引入mockjs
const Mock = require('mockjs')
// 使用mockjs模拟数据
Mock.mock('localhost:8080/user', (req, res) => {
  return Mock.mock({
    'data': [
      {
        'name': '@name()',
        'email': '@email()'
      }
    ]
  })
})
Mock.mock('localhost:8080/menu', (req, res) => {
  return Mock.mock({
    'data': [
      {
        'id': '@increment()', // id自增
        'name': 'menu', // 名称为menu
        'order|1-20': 5 // 排序1-20之间
      }
    ]
  })
})

Mock.mock('localhost:8080/user/login', 'post', (data) => {
  return {
    'token': 'abc1232'
  }
})
