<template>
<div id="">
    <div class="missionbox" v-for="(ele,key) in dailyMissionList" :key="key">
        <div>{{ ele.description }}</div>
        <div class="clearfixbox">
            <div class="small_icon64 clearfix relative" v-for="(re,sk) in dailyRewardList[ele.mission_reward_id]" :key="sk">
                <img :src="Common.getRewardImg(re.reward_type,re.reward_id)"/>
                <div class="floatnum">{{ re.reward_num }}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'StationaryMissionBonus',
    data(){
        return {
            dailyMissionList: {},
            dailyRewardList: {},
        }
    },
    created(){
        this.loadData();
    },
    methods: {
        loadData: function(){
            this.$http.get("http://api.liantui.xyz/pcr", { params: {table: 'stationary_mission_data' }}).then((response)=>{
                this.setDailyMissionDic(response.data);
            });
            this.$http.get("http://api.liantui.xyz/pcr", { params: {table: 'mission_reward_data' }}).then((response)=>{
                this.setMissonRewardDic(response.data);
            });

            // var result = this.Common.db.prepare("SELECT * FROM stationary_mission_data");
            // this.setDailyMissionDic(result);
            // result = this.Common.db.prepare("SELECT * FROM mission_reward_data");
            // this.setMissonRewardDic(result);
        },
        setDailyMissionDic: function(result){
            var dd = {};
            for(var id in result){
                var ele = result[id];
                let index = ele.stationary_mission_id;
                dd[index] = ele;
            }
            this.dailyMissionList = dd;
        },
        setMissonRewardDic: function(result){
            var dd = {};
            for(var id in result){
                var ele = result[id];
                let index = ele.mission_reward_id;
                if(dd[index]==undefined){
                    dd[index] = [];
                }
                dd[index].push(ele);
            }
            this.dailyRewardList = dd;
        }
    }
}
</script>

<style lang="scss">
.missionbox {
    width: 500px;
    //height: 96px;
    border-radius: 10px;
    overflow: hidden;
    margin: 10px;
    background: white;
    padding: 10px;
}
</style>

