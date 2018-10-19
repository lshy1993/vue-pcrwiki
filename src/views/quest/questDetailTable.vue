<template>
<div id="mainPanel">
    <div id="detailBg" :style="{'top':imgpos }" >
        <img :src="imgurl" />
    </div>
    <span id="questName">{{ questname }}</span>
    <table id="dropTable">
        <tr>
            <th>怪物</th>
            <div class="clearfix small_icon64" v-for="ele in enemyImg" :key="ele">
                <img :src="Common.getEnemyImg(ele)" />
            </div>
        </tr>
        <tr>
            <th>主要掉落</th>
            <div class="clearfix small_icon64" v-for="ele in mainRewardData" :key="ele">
                <img :src="Common.getRewardImg(4, ele)" />
            </div>
        </tr>
        <tr>
            <th>奖励</th>
            <div class="clearfix small_icon64 relative" v-for="ele in clearRewardData" :key="ele.reward_id">
                <div class="floatnum">{{ ele.reward_num }}</div>
                <img :src="Common.getRewardImg(ele.reward_type, ele.reward_id) " />
            </div>
            <div class="clearfix small_icon64 relative" v-for="ele in rankRewardData" :key="ele.reward_id">
                <div class="floatnum">{{ ele.reward_num }}</div>
                <img :src="Common.getRewardImg(ele.reward_type, ele.reward_id) " />
            </div>
        </tr>
    </table>
    <table id="basicTable">
        <tr>
            <th>开放等级</th>
            <td>{{ questData.limit_team_level }}</td>
        </tr>
        <tr>
            <th>限制时间</th>
            <td>{{ questData.limit_time }}</td>
        </tr>
        <tr>
            <th>消耗体力（最小）</th>
            <td>{{ questData.stamina }}({{ questData.stamina_start }})</td>
        </tr>
        <tr>
            <th>玩家经验</th>
            <td>{{ questData.team_exp }}</td>
        </tr>
        <tr>
            <th>角色经验</th>
            <td>{{ questData.unit_exp }}</td>
        </tr>
        <tr>
            <th>可获得羁绊点数</th>
            <td>{{ questData.love }}</td>
        </tr>
        <tr>
            <th>每日可挑战次数</th>
            <td>{{ dailylimit }}</td>
        </tr>
    </table>
</div>
</template>

<script>
export default {
    name: 'QuestDetailTable',
    props: ['questData','mainRewardData','rankRewardData','clearRewardData','enemyImg'],
    data(){
        return {
            //questData: {},
            //mainRewardData: [],
            // rankRewardData: [],
            // clearRewardData: [],
            //enemyGroup: [],
            // enemyDic: {}
        }
    },
    computed:{
        questname: function(){
            if(this.questData == undefined) return '';
            return this.questData.quest_name;
        },
        dailylimit: function(){
            let times = this.questData.daily_limit;
            if(times==0||times==undefined) return '∞';
            return times;
        },
        imgpos: function(){
            if(this.questData == undefined) return 0;
            return this.questData.quest_detail_bg_position;
        },
        imgurl: function(){
            if(this.questData == undefined) return '';
            let id = this.questData.quest_detail_bg_id;
            return 'static/img/bg/bg_'+ id + '.png';
        }
    },
    created(){
        //console.log('route changed:',this.$route.params.id);
        //this.loadData();
    },
    watch: {
        questid: function(){
            //this.loadData();
        }
    },
    methods: {
        loadData: function(){
            //var db = this.Common.db;
            //if(this.questData == undefined) return;

            //主要奖励
            // var dd = [];
            // for(var i=1;i<=5;i++){
            //     let iconid = this.questData['reward_image_'+i];
            //     if(iconid != 0){
            //         dd.push(iconid);
            //     }
            // }
            // this.mainRewardData = dd;
            
            // this.$http.get("http://api.liantui.xyz/pcr/quest/"+this.questid+"/info").then((response)=>{
            //     this.setEnemyData(response.data.EnemyData);
            //     this.setClearReward(response.data.ClearReward);
            //     this.setRankReward(response.data.RankReward);
            // });

            //可能出现的所有敌人资料
            // var enemy_group = [];
            // for(var i=1;i<=5;i++){
            //     let enemyid = this.questData['enemy_image_'+i];
            //     if(enemyid != 0){
            //         enemy_group.push(enemyid);
            //     }
            // }
            // this.enemyGroup = enemy_group;
            // var result = db.prepare("SELECT * FROM enemy_parameter WHERE enemy_id IN (" + enemy_group +")");
            // this.setEnemyData(result);
            
            //读取清关奖励
            //let clearreward = this.questData.clear_reward_group;
            // result = db.prepare("SELECT * FROM quest_reward_data WHERE reward_group_id =" + clearreward);
            // this.setClearReward(result);

            //读取3星奖励
            //let rankreward = this.questData.rank_reward_group;
            // result = db.prepare("SELECT * FROM quest_reward_data WHERE reward_group_id =" + rankreward);
            // this.setRankReward(result);

        },
        // setEnemyData: function(result){
        //     var dd = {};
        //     for(var id in result){
        //         var ele = result[id];
        //         let index = ele.enemy_id;
        //         dd[index] = ele;
        //     }
        //     this.enemyDic = dd;
        // },
        // setRankReward: function(result){
        //     var ele = result[0];
        //     var dd = [];
        //     for(var i=1;i<=5;i++){
        //         let dic = {};
        //         dic['reward_type'] = ele['reward_type_'+i];
        //         dic['reward_id'] = ele['reward_id_'+i];
        //         dic['reward_num'] = ele['reward_num_'+i];
        //         if(ele['reward_type_'+i]>0) dd.push(dic);
        //     }
        //     this.rankRewardData = dd;
        // },
        // setClearReward: function(result){
        //     var ele = result[0];
        //     var dd = [];
        //     for(var i=1;i<=5;i++){
        //         let dic = {};
        //         dic['reward_type'] = ele['reward_type_'+i];
        //         dic['reward_id'] = ele['reward_id_'+i];
        //         dic['reward_num'] = ele['reward_num_'+i];
        //         if(ele['reward_type_'+i]>0) dd.push(dic);
        //     }
        //     this.clearRewardData = dd;
        // },
    },
}
</script>

<style lang="scss">
#mainPanel {
    display: inline-block;
    width: 800px;
    height: 400px;
    position: relative;
    border-radius: 20px;
    border: gold solid 1px;
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
    text-align: left;
    
    #questName {
        position: relative;
        top: 15px;
        left: 30px;
        font-size: 20px;
        font-weight: bold;
    }
    #detailBg {
        width: 800px;
        height: 400px;
        border-radius: 20px;
        position: absolute;
        overflow: hidden;
    }
    #dropTable {
        position: absolute;
        bottom: 20px;
        left: 20px;
        background: rgba(255,255,255,0.7);
        border-radius: 10px;
        padding: 5px;

        div {
            margin: 5px;
        }
    }
    #basicTable {
        position: absolute;
        bottom: 20px;
        right: 30px;
        padding: 10px;
        background: rgba(255,255,255,0.7);
        border-radius: 10px;

        th {
            text-align: left;
            //background: black;
        }

        td {
            text-align: right;
            width: 100px;
        }
    }
}
</style>
