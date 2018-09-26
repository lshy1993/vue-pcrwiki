<template>
<div>
    <table>
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
    name: 'ArenaBonus',
    props: ['rankList'],
    data(){
        return {
            dailyRankList: [],
        }
    },
    methods: {
        
    }
}
</script>

<style>

</style>
