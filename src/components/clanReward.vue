<template>
<div>
    <table>
        <tr>
            <th>排名</th>
            <th>奖励</th>
        </tr>
        <tr v-for="(rl,key) in rankList" :key="key">
            <td>{{ rl.from }}-{{ rl.to }}</td>
            <td>
                <div class="clearfixbox">
                    <div class="clearfix small_icon64 relative" v-for="(ele,skey) in rl.reward" :key="skey">
                        <img :src="Common.getRewardImg(ele.reward_type,ele.reward_id)"/>
                        <div class="floatnum">{{ ele.reward_num }}</div>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</div>
</template>

<script>
export default {
    name: 'ClanReward',
    data(){
        return {
            rankList: []
        }
    },
    created(){
        this.loadData();
    },
    methods:{
        loadData: function(){
            
            this.$http.get("http://api.liantui.xyz/pcr", { params: {table: 'clan_battle_period' }}).then((response)=>{
                var clanid = this.getClanId(response.data);
                this.$http.get("http://api.liantui.xyz/pcr", { params: {table: 'clan_battle_period_rank_reward', condition: "clan_battle_id ="+clanid }}).then((response)=>{
                    this.rankList = this.setRewardList(response.data);
                });
            });
            

            // var result = this.Common.db.prepare("select * from clan_battle_period")
            // let clanid = this.getClanId(result);
            // result.free();
            // result = this.Common.db.prepare("SELECT * FROM clan_battle_period_rank_reward WHERE clan_battle_id ="+clanid);
            // this.rankList = this.setRewardList(result);
        },
        getClanId: function(result){
            var now = new Date().getTime();
            for(var id in result){
                let ele = result[id];
                let st = Date.parse(ele.start_time);
                let ed = Date.parse(ele.end_time);
                //判断当前时间段的活动
                if(st<now && now<ed){
                    return ele.clan_battle_id;
                }
            }
        },
        setRewardList: function(result){
            var dd = [];
            for(var id in result){
                var ele = result[id];
                let index = ele.id;
                //创建对象
                var rk = {};
                rk.from = ele.rank_from;
                rk.to = ele.rank_to;
                //奖励部分
                var cc = [];
                for(var j=1;j<=5;j++){
                    var dic = {};
                    let type = 'reward_type_'+j;
                    let id = 'reward_id_'+j;
                    let num = 'reward_num_'+j;
                    if(ele[type] != 0){
                        dic['reward_type'] = ele[type];
                        dic['reward_id'] = ele[id];
                        dic['reward_num'] = ele[num];
                        cc.push(dic);
                    }
                }
                rk.reward = cc;
                //赋值给dd
                dd.push(rk);
                }
            return dd;
        }
    }
}
</script>

<style>

</style>
