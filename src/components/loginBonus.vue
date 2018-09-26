<template>
<div class="loginbox">
    <div class="loginHead">每日登陆奖励</div>
    <div class="loginMain clearfixbox">
        <div class="clearfix small_icon64 relative" v-for="(ele,key) in loginData" :key="key">
            <img :src="Common.getRewardImg(ele.reward_type,ele.reward_id)">
            <div class="floatnum">
                {{ ele.reward_num }}
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'LoginBonus',
    data(){
        return{
            loginData: {},
        }
    },
    created(){
        this.loadData();
    },
    methods:{
        loadData: function(){

            this.$http.get("http://api.liantui.xyz/pcr/loginbonus").then((response)=>{
                this.setLoginBonus(response.data);
            });
            // var result = this.Common.prepare("SELECT * FROM login_bonus_detail WHERE login_bonus_id = 30000");
            // this.setLoginBonus(result);
        },
        setLoginBonus: function(result){
            var dd = {};
            for(var id in result){
                let ele = result[id];
                let index = ele.count;
                dd[index] = ele;
            }
            this.loginData = dd;
        }
    }
}
</script>

<style lang="scss">
.loginbox {
    position: absolute;
    top: 660px;
    right: 0;
    margin: 10px;
    width: 340px;
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);

    div.loginHead {
        position: relative;
        padding: 10px 15px 10px;
        color: white;
        background: pink;
    }
    div.loginMain{
        padding: 10px;
        //height: 100%;
    }
}
</style>

