new Vue({
    el:"#app",
    data:{
        productList:[],
        //后台返回的总金额
        totalMoney:0,
        //实际总金额
        totalPrice:0,
        isCheckedAll:false
    },
    filters:{
        formatMoney(val){
            return "￥ "+val.toFixed(2);
        }
    },
    mounted() {
        this.cartView();
    },
    methods:{
        cartView(){
            // var that = this;
            //get里面是要请求的参数
            //es6语法可以改变this的作用域, 使得外面和里面的this一致. 这样外面就不用声明that来保存this了
            this.$http.get("data/cartData.json",{"id":123}).then(res=>{
                // that.productList = res.body.result.list;
                // that.totalMoney = res.body.result.totalMoney;
                this.productList = res.body.result.list;
                // this.totalMoney = res.body.result.totalMoney;
            });
        },
        //改变数量
        changeQuentity(item,flag){
            if(flag==1){
                item.productQuentity++;
            }else if(flag==-1){
                item.productQuentity--;
                if(item.productQuentity<0){
                    item.productQuentity=0;
                }
            }
            this.calcTotalPrice();
        },
        //选中功能
        selectProduct(item){
            // debugger
            //检查item是否存在check属性
            if(typeof item.checked == 'undefined'){
                //全局注册属性
                Vue.set(item,'checked',true);
                //局部注册属性
                // Vue.$set(item,'check',true);
            }else{
                item.checked=!item.checked;
            }
            this.calcTotalPrice();
        },
        //全选 和取消全选, 通过flag判断是哪个
        selectAll(flag){
            //选中和取消选中
            this.isCheckedAll= flag;
            var that=this;

            //遍历所有商品的选中状态
            this.productList.forEach(function(item,index){
                //检查item是否存在check属性
                if(typeof item.checked == 'undefined'){//如果没选中,就要注册属性并选中
                    //局部注册属性
                    that.$set(item,'checked',that.isCheckedAll);
                }else{//如果选中了,取消选中
                    item.checked=that.isCheckedAll;
                }
            })
            this.calcTotalPrice();
        },
        //计算总价
        calcTotalPrice(){
            this.totalPrice=0;
            var that=this;
            //遍历所有商品的选中状态
            this.productList.forEach(function(item,index){
                //如果商品选中了
                if(item.checked){
                    //累加价格
                    that.totalPrice += item.productQuentity*item.productPrice;
                }
            })
        },
        //删除单项
        delItem(item){
            var index=this.productList.indexOf(item);
            this.productList.splice(item,1);
            this.calcTotalPrice();
        }
    }
})