/**
 学习参考，观点评论
 * @author 张仁荣
 * @date 2019-06-26
 */
var suiXi = new Vue({
    el:'#wrapper',
    data:{
        load:true,
        learningReference:[],//学习参考155
        opinionReview:[],//观点评论154
        limit:10,
        learnIndex:0,//学习党建当前页下标
        learnMark:0,//学习党建分页标志
        learnPage:1,//学习参考分页
        learnTotal:[],//学习参考总条数
        opinioIndex:0,//学习党建当前页下标
        opinioMark:0,//学习党建分页标志
        opinioPage:1,//观点评论总当前页
        opinionTotal:[],//观点评论总条数
    },
    mounted:function () {
        this.getData(155,this.learnPage,1,0);//学习参考
        this.getData(154,this.learnPage,2,0);//学习参考
        sessionStorage.removeItem('tableIndex');
    },
    methods:{
        getData:function (nodeid,page,type,init) {
            var $this = this;
            pAjax.myAjax_Token(rootPath, "party/info/list", {
                nodeid:nodeid,
                page:page,
                limit:$this.limit,
                infoid:0
            },function(data){
                if(data.code==200){
                    if(type== 1){
                        suiXi.learningReference = data.data;
                        //分页
                        console.log(init == 0)
                        if(init == 0){
                            var total =  data.count;
                            var num = total/10;
                            num = num.toString();
                            // num = '10';
                            var total = num.split('.');
                            if(total.length>1){
                                total = parseInt(total[0])+1;
                            }else{
                                total = parseInt(total[0]);
                            }
                            for(var i=1;i<=total;i++){
                                suiXi.learnTotal.push(i)
                            }
                        }
                    }else{
                        suiXi.opinionReview = data.data;
                        //分页
                        if(init == 0){
                            var total =  data.count;
                            var num = total/10;
                            num = num.toString();
                            // num = '10';
                            var total = num.split('.');
                            if(total.length>1){
                                total = parseInt(total[0])+1;
                            }else{
                                total = parseInt(total[0]);
                            }
                            for(var i=1;i<=total;i++){
                                suiXi.opinionTotal.push(i)
                            }
                        }
                    }
                }else {

                }
            },function(){

            }, function(xhr,xhrStatus){
                if(xhrStatus !=='success'){

                }
            }, "通知公告")
        },
        //跳转到第几页
        goToPage:function(index,type){
            if(type == 1){
                this.learnIndex = index-1;
                if(this.learnMark <= this.learnTotal.length -7){
                    this.learnMark = index-1;
                }
                this.getData(155,index,1);//学习参考
            }else{
                this.opinioIndex = index-1;
                if(this.opinioMark <= this.opinionTotal.length -7){
                    this.opinioMark = index-1;
                }
                this.getData(154,index,2);//学习参考
            }
        },
        //下一页
        nextPage:function (type) {
            console.log(type)
            if(type == 1) {
                if(this.learnIndex+1 < this.learnTotal.length){
                    this.learnIndex = this.learnIndex+1;
                    this.getData(155, this.learnIndex+1, 1);//学习参考
                }
            }else{
                if(this.opinioIndex+1 < this.opinionTotal.length){
                    this.opinioIndex = this.opinioIndex+1;
                    this.getData(154, this.opinioIndex+1, 2);//学习参考
                }
            }
        },
        //上一页
        prePage:function (type) {
            console.log(type)
            if(type == 1) {
                if(this.learnIndex+1 > 1){
                    this.learnIndex = this.learnIndex-1;
                    this.getData(155, this.learnIndex, 1);//学习参考
                }
            }else{
                if(this.opinioIndex+1 > 1){
                    this.opinioIndex = this.opinioIndex-1;
                    this.getData(154, this.opinioIndex, 2);//学习参考
                }
            }
        },
        //查看详情页
        lookDetail:function(url,id,index,infoid){
            window.location.href = url+'?id='+id+'&index='+index+'&infoid='+infoid;
        },
    }
})