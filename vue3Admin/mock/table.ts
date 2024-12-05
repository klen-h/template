import Mock from 'mockjs'

// 定义模拟数据接口
Mock.mock('/api/user', 'get', {
  code: 200,
  message: 'success',
  data: {
    'list|10': [ // 生成10到50个列表项
      {
        'id|+1': 1, // 自增ID
        name: '@cname', // 随机生成中文名
        'age|18-60': 1, // 随机生成年龄
        'gender|1': ['男', '女'], // 随机生成性别
        'status|0-2': 1,
        email: '@email', // 随机生成邮箱
        // 可以添加更多字段...
      },
    ],
  },
})

Mock.mock('/api/gender', 'get', {
  code: 200,
  message: 'success',
  data: {
    list: [
      {
        id: '1',
        name: '男',
      },
      {
        id: '2',
        name: '女',
      },
    ],
  },
})
