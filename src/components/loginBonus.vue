<template>
<div id="loginbox" class="rightBox">
    <div class="boxHead">每日登陆奖励</div>
    <div class="boxMain clearfixbox">
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

}
</style>

