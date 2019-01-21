new Vue({
    el:'#app',
    data() {
        return {
            addressList:[],
            listNum:3,
            alreadyMore:false,
            currentIndex:0,
            shippingMethod:1
        }
    },
    mounted() {
        this.$nextTick(function(){
            this.getAddressList();
        })
    },
    computed: {
        filterAddress:function(){
            // 截取json数据的前三个
            return this.addressList.slice(0,this.listNum);
        }
    },
    methods: {
        getAddressList:function(){
            var that=this;
            this.$http.get("data/address.json").then(function(res){
                var res = res.body;
                if(res.status=="0"){
                    that.addressList=res.result;
                }
            });
        },
        loadMore:function(){
            this.listNum=this.addressList.length;
            this.alreadyMore=true;
        },
        setDefault:function(addressId){
            this.addressList.forEach(function(item,index){
                if(item.addressId==addressId){
                    item.isDefault=true;
                }else{
                    item.isDefault=false;
                }
            })
        }
    },
})