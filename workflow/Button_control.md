### 根据黑白名单控制列表的展示权限（搜索，导出，编辑，添加,删除，重置密钥,重置密码）

后台返回的参数格式

```javascript
  
  authority:{
    type:'black',  //black 不显示  white 只显示
    list:[
      “交易/交易列表/导出”，        
      “合作商/合作商列表/编辑,导出”
    ]
  }

  
```

### 实现思路

 - 根据黑白名单匹配展示导航数组的子集的sliderbar  给相应的导航传递列表控制参数buttonState，每个导航点击时根据黑白名单类型以及返回的控制列表 修改每个组件中的按钮状态
 - 根据state参数在每个单页组件中控制按钮的展示。
 - 黑白名单根据type 的状态，white则只显示白名单按钮   black则只隐藏黑名单按钮
 - 代码实现思路：根据黑白名单的类型以及黑白名单列表 改变默认不显示按钮的数组 根据生成的隐藏按钮数组改变state初始状态 只有某个按钮状态hide*button:true时隐藏按钮,否则默认显示该按钮
                 - 黑名单的时候，只向数组添加符合黑名单的状态名
                 - 白名单的时候，除了白名单的都添加到数组
                 - 没有名单时隐藏数组为空
                 - 页面按钮非隐藏状态显示

 
 1.参数buttonState实现代码
 
 ```javascript
  //src/layout.js

    //如果黑白名单存在
    //modeFake();
    
    if(global.authoritylist){
        const authority=JSON.parse(global.authoritylist).list_layoutlist;
        for(let i=0;i<authority.length;i++){
             const listArr=authority[i].split("/");
             const parentName=listArr[0]+"/"+listArr[1];
             const childs=listArr[2];
             const defaultList=this.state.initlist;
             let next=true;
             for(let j=0;j<defaultList.length;j++){
                  let listPar=defaultList[j].sidebar;
                  let listChild= defaultList[j].children;  
                  for(let m=0;m<listChild.length;m++){
                      let childPar=listChild[m].sidebar;
                      let name=listPar+"/"+childPar;
                     
                      if(parentName===name){
                           console.log(11+"name"+name)
                           listChild[m].buttonState=childs;
                           next=false;
                           break;
                      }
                  } 
                  if(!next){
                        break;
                  }
             }
        }
        console.log("默认黑白名单列表")
        console.log(this.state.initlist) 

    }

 
 ```
 
2.导航点击根据 buttonState该变组件按钮的显示状态值

```javascript
   // src/common/util.js
   //黑白按钮列表控制组
    function authorityControl(){
      let arr=[
          {
            text:'导出',
            name:'hideExportButton'
          },
          {
            text:'编辑',
            name:'hideEditButton'
          },
          {
            text:'添加',
            name:'hideAddButton'
          },
          {
            text:'删除',
            name:'hideDeleteButton'
          },
          {
            text:'重置密码',
            name:'hideChangePwdButton'
          },
          {
            text:'重置密钥',
            name:'hideChangeKeyButton'
          }
         ];
         if(this.props.location.state&&this.props.location.state.buttonState){
             const buttonnameList=this.props.location.state.buttonState.split(',');
             let newarr=[];//最后获得的数组是要隐藏的按钮组
             if(localStorage.authorityType&&localStorage.authorityType==="white"){
                 //白名单 把存在的都去掉
                  for(let i=0;i<arr.length;i++){
                      let names=arr[i].text;
                      let had=false;
                      for(let j=0;j<buttonnameList.length;j++){
                            if(buttonnameList[j]===names){
                                 had=true;
                                 break; 
                            }
                      }
                      if(!had){
                          newarr.push(arr[i].name)
                      }
                  } 
                   
             }else if(localStorage.authorityType&&localStorage.authorityType==="black"){
                //黑名单  不存在的都去掉 只有存在的才添加到数组
                  for(let i=0;i<buttonnameList.length;i++){
                      let names=buttonnameList[i];
                      for(let j=0;j<arr.length;j++){
                            if(arr[j].text===names){
                                 newarr.push(arr[i].name)
                                 break; 
                            }
                      }
                  } 
             }
             console.log(newarr)
             //最后留下的则是不显示的按钮组 给相关的state值赋值 
             //不存在黑白名单则 数组为空 不隐藏默认存在的按钮
             if(newarr.length>0){
                  for(let i=0;i<newarr.length;i++){
                    let names=newarr[i];
                    this.setState({
                          [names]:true 
                    })
                 }  
             }
         }
    }
    //初始化state状态
    function initListState(listfn,stateArray){
          this.authorityControl2=authorityControl;
          this.authorityControl2(); //绑定this
          var listMess=this.props.location.state?this.props.location.state.listMess:null;
          if(listMess&&stateArray&&stateArray.length>0){
             var listPre=JSON.parse(listMess);
             for(let i=0;i<stateArray.length;i++){
                    let keys=stateArray[i];
                    this.setState({
                       [keys]:listPre[keys]
                    },()=>{
                        if(i===stateArray.length-1){
                          listfn();
                        }
                    })
             }
          }else{
            listfn();
          }
    }
  
  
```

每个页面中,只有非隐藏状态显示

```javascript

  {!this.state.hideAddButton&&
     <Button type="primary" icon="plus" className="qc-add-list" onClick={this.addBotton}>添加{this.state.hideAddButton?"1":"0"}</Button>
  }

```

