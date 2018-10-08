<template>
<div>
    <table>
        <tr>
            <th>层数</th>
            <th>匹配系数</th>
            <th>主要掉落</th>
        </tr>
        <tr v-for="(ele,key) in dungeonDic" :key="key">
            <td>{{ ele.floor_num }}</td>
            <td>{{ ele.matching_coefficient }}</td>
            <td>
                <div>
                <div class="clearfix small_icon64 relative" v-for="i in 3" :key="i">
                    <img :src="getRewardImg(ele,i)" />
                    <div v-if="ele['reward_image_'+i]==90002" class="floatnum">{{ ele.reward_coin }}</div>
                </div>
                </div>
            </td>
            <td>
            </td>

        </tr>
    </table>
</div>
</template>

<script>
export default {
    name: 'DungeonTable',
    data(){
        return {
            dungeonDic: {},
            areaid: 0,
        }
    },
    created(){
        console.log("created!");
        this.areaid = parseInt(this.$route.params.id);
        this.loadData();
    },
    methods:{
        loadData: function(){
            var result = this.Common.db.prepare("SELECT * FROM dungeon_quest_data WHERE dungeon_area_id = " + this.areaid);
            this.setDungeonDic(result);
        },
        setDungeonDic: function(result){
            var dic = {};
            while(result.step()){
                var ele = result.getAsObject();
                let index = ele.quest_id;
                dic[index] = ele;
            }
            this.dungeonDic = dic;
            result.free();
        },
        getRewardImg: function(ele,i){
            let key = ele['reward_image_'+i];
            if(key == 0) key ='00000';
            return this.Common.getRewardImg(2,key)
        }
    }
}
</script>

<style>

</style>
