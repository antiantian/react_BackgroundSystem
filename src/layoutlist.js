const Slider=null;
const Index=null;
const Repos=null;
const About=null;
//details 详情页路径 必填
//buttonState 黑白名单列表 登录后才会追加 
const layoutList = [
  { path: null,
    exact: true,
    sidebar:'交易',
    type:"pay-circle-o",
    main:null,
    parent:'sub1',
    children: [
            { path: '/layout',details:'/dealDetals', main: Slider, sidebar:'交易记录'},
            { path: '/settleList',details:'/flowDetails', main: Repos, sidebar:'代付记录'},
    ]  
  },
  { path:null,
    sidebar:'合作商',
    type:"team",
    main:null,
    parent:'sub2',
    children: [
           { path: '/offcialList',details:'/addOffcial', main: Slider, sidebar: '合作商列表'},
           { path: '/groupList',details:'/addGroup', main: Repos, sidebar: '合作商组列表' },
    ]
  },
  { path:null,
    sidebar:'商户',
    type:"user",
    main:null,
    parent:'sub3',
    children: [
           { path: '/merchantList',details:'/addMerchant', main: Slider, sidebar: '商户列表'},
           { path: '/merchantCapital',details:'/merchantCapitaDetail', main: Repos, sidebar: '商户资金列表' },
    ]
  },
  { path:null,
    sidebar:'设置',
    type:"setting",
    parent:'sub4',
    main:null,
    children: [
            { path: '/paymentWay',details:'/addPaymentWay', main: About, sidebar: '支付方式'},
            { path: '/paymentType',details:'/addPaymentType', main: Repos, sidebar: '支付类型' },
            { path: '/paymentConfiguration',details:'/addPaymentConfiguration', main: Index, sidebar: '支付配置' },
            { path: '/paymentChannel',details:'/addPaymentChannel', main: Repos, sidebar: '支付通道' },
            { path: '/settlementList',details:'/EditSettlement', main: Index, sidebar: '结算通道列表' },   
        ]
  }
]
export default  layoutList;
