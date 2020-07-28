const router = [
    {
      title: '控制台',
      icon: 'DingdingOutlined',
      key: '/index'
    },
    {
      title: '用户管理',
      icon: 'DingdingOutlined',
      key: '/index/user',
      child: [
        {key: '/index/user/list', title: '用户列表', icon: '',},
        {
          key: '/index/user/add', 
          title: '添加用户', 
          icon: ''
        }
      ]
    },
    {
      title: '部门管理',
      icon: 'DingdingOutlined',
      key: '/index/department',
      child: [
        {key: '/index/department/list', title: '部门列表', icon: ''},
        {key: '/index/department/add', title: '添加部门', icon: ''},
      ]
    },
    {
      title: '职位管理',
      icon: 'DingdingOutlined',
      key: '/index/post',
      child: [
        {key: '/index/post/list', title: '职位列表', icon: ''},
        {key: '/index/post/add', title: '添加职位', icon: ''}
      ]
    },
    {
      title: '请假',
      icon: 'DingdingOutlined',
      key: '/index/leave'
    },
    {
      title: '加班',
      icon: 'DingdingOutlined',
      key: '/index/extrawork'
    }
  ]
  export default router;