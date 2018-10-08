<template>
<div>
    <div>
        排名：
        <input v-model="rktxt"/>
        <button v-on:click="setRankNum">查询</button>
    </div>
    <div class="clearfixbox">
        <div class="clearfix dailytd">
            <h2>单人-每日排名奖励</h2>
            <arena-bonus :rankList="dailyList"/>
        </div>
        <div class="clearfix ranktd">
            <h2>单人-排名突破奖励</h2>
            <arena-bonus :rankList="rankList"/>
        </div>
        <div class="clearfix dailytd">
            <h2>团队-每日排名奖励</h2>
            <arena-bonus :rankList="grandDailyList"/>
        </div>
        <div class="clearfix ranktd">
            <h2>团队-排名突破奖励</h2>
            <arena-bonus :rankList="grandRankList" />
        </div>
    </div>
</div>
</template>

<script>
import ArenaBonus from './arenaBonus.vue';

export default {
    name: 'ArenaIndex',
    data(){
        return{
            ranknum: 1,
            rktxt: 1,
            dailyList: [],
            rankList: [],
            grandDailyList: [],
            grandRankList: [],
        }
    },
    created(){
        this.loadData();
    },
    methods:{
        loadData:function(){
            
            this.$http.get("http://api.liantui.xyz/pcr/arena/"+this.ranknum).then((response)=>{
                this.dailyList = this.getRankList(response.data.dailyList);
                this.rankList = this.getRankList(response.data.rankList);
                this.grandDailyList = this.getRankList(response.data.grandDailyList);
                this.grandRankList = this.getRankList(response.data.grandRankList);
            });

            // var result = this.Common.db.prepare("SELECT * FROM arena_daily_rank_reward WHERE rank_from <= "+this.ranknum+" AND rank_to >="+this.ranknum);
            // this.dailyList = this.getRankList(result);
            // result.free();
            // result = this.Common.db.prepare("SELECT * FROM arena_max_rank_reward WHERE rank_from <= "+this.ranknum+" AND rank_to >="+this.ranknum);
            // this.rankList = this.getRankList(result);
            // result.free();
            // result = this.Common.db.prepare("SELECT * FROM grand_arena_daily_rank_reward WHERE rank_from <= "+this.ranknum+" AND rank_to >="+this.ranknum);
            // this.grandDailyList = this.getRankList(result);
            // result.free();
            // result = this.Common.db.prepare("SELECT * FROM grand_arena_max_rank_reward WHERE rank_from <= "+this.ranknum+" AND rank_to >="+this.ranknum);
            // this.grandRankList = this.getRankList(result);
            // result.free();
        },
        setRankNum:function(){
            this.ranknum = parseInt(this.rktxt);
            this.loadData();
        },
        getRankList: function(result){
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
    },
    components:{
        ArenaBonus
    }
}
</script>

<style>
.dailytd{
    width: 400px;
}
.ranktd{
    width: 300px;
}
</style>
