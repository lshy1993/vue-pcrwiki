<template>
<div id="questDropTable">
    <table>
        <tr v-for="i in 3" :key="i">
            <th>第{{i}}/3波</th>
            <td class="droptd" v-for="(dp,num) in dropGroup[i-1]" :key="num">
                <tr style="text-align:center">
                    <td colspan="5">第{{ num+1 }}掉落组</td>
                </tr>
                <tr>
                    <td v-for="(ele,skey) in getWaveDrop(dp)" :key="skey">
                        <div class="small_icon64 relative clearfix">
                            <img :src="Common.getRewardImg(ele.reward_type, ele.reward_id)" />
                            <div class="floatnum">{{ele.reward_num}}</div>
                            
                        </div>
                        <div>{{ ele.odds }}%</div>
                    </td>
                </tr>
            </td>
        </tr>
    </table>
</div>
</template>

<script>
export default {
    name: 'QuestDropTable',
    props: ['dropGroup','dropDic'],
    data(){
        return {
            // dropGroup: [],
            // dropDic: {},
        }
    },
    created(){
        //this.loadData();
    },
    watch:{
        // wavegroup:function(){
        //     this.loadData();
        // }
    },
    methods:{
        loadData: function(){
            //获取所有出现的掉落资料
            // var drop_group = [];
            // var sql_group = [];
            // for(var key in this.waveDic){
            //     var ele = this.waveDic[key];
            //     var dd = [];
            //     for(var i=1; i<=5; i++){
            //         let rewardid = ele['drop_reward_id_'+i];
            //         if(rewardid != 0){
            //             dd.push(rewardid);
            //             sql_group.push(rewardid);
            //         }
            //     }
            //     drop_group.push(dd);
            // }
            // this.dropGroup = drop_group;

            // this.$http.get("http://api.liantui.xyz/pcr/quest/"+this.questid+"/" , { params: {table: 'enemy_reward_data',condition: "drop_reward_id IN (" + sql_group +")" }}).then((response)=>{
            //     this.setDropData(response.data);
            // });
            // var result = this.Common.db.prepare("SELECT * FROM enemy_reward_data WHERE drop_reward_id IN (" + sql_group +")");
            // this.setDropData(result);
        },
        // setDropData: function(result){
        //     var dd = {};
        //     for(var id in result){
        //         var ele = result[id];
        //         let index = ele.drop_reward_id;
        //         dd[index] = ele;
        //     }
        //     this.dropData = dd;
        // },
        getWaveDrop: function(key){
            var result = {};
            //获取对应key的掉落组
            let ts = this.dropDic[key];
            //根据掉落组编号获取详细数据
            for(var j=1; j<=5; j++){
                var dic = {};
                let type = 'reward_type_'+j;
                let id = 'reward_id_'+j;
                let num = 'reward_num_'+j;
                let odd = 'odds_'+j;
                if(ts[type] != 0){
                    dic['reward_type'] = ts[type];
                    dic['reward_id'] = ts[id];
                    dic['reward_num'] = ts[num];
                    dic['odds'] = ts[odd];
                    result[j] = dic;
                }
            }
            return result;
        },
    }


}
</script>


<style lang="scss">
#questDropTable{
    margin-top: 10px;
    text-align: center;
    table {
        //border-collapse:collapse;
        border: solid #999 1px;
        margin:  0 auto;

        th {
            font-weight: bold;
            text-align: left;
            color: white;
            background: #212529;
            padding: 10px;
        }
        .droptd {
            min-width: 100px;
        }
    }

    .floatnum {
        position: absolute;
        bottom: 5px;
        right: 5px;
        font-size: 16px;
        color: #000;
        text-shadow: #fff -1px 0 0,#fff 0 -1px 0,#fff 1px 0 0,#fff 0 1px 0;
    }
}

</style>