## 后台系统权限控制开发文档 ##
- 功能介绍
  - 根据不同的用户权限展示不同的导航列表
  - 根据黑白名单列表限制用户操作权限（查询，搜索，编辑，添加）
- 功能实现  
  - [导航展示](workflow/Navigation_display.md)
  - [按钮控制](workflow/Button_control.md)  
- 请求参数返回的格式

```javascript
    //url:[*]  当值为*的时候代表全部展示
    role:'admin',  //admin,super  
    url:[
      '交易/*',
      '合作商/*'，
      '设置/支付方式，支付类型，支付配置'
    ],
    authority:{ 
        type:'black',  //black 黑名单不显示 white白名单 只显示
        list:[
          “交易/交易列表/导出”，
          “合作商/合作商列表/编辑,导出”
        ]
    }



```

