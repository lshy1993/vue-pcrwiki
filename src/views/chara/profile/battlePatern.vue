<template>
<div id="battlePatern">
    <h2>行动模式</h2>
    <table>
        <tr>
            <td class="patternstart" :colspan="patternData.loop_start">
                起手
            </td>
            <td class="patternloop" :colspan="(patternData.loop_end-patternData.loop_start)">
                循环部分
            </td>
        </tr>
        <tr>
            <td v-for="i in (patternData.loop_end)" :key="i">
                {{ patternLoop[i] }}
            </td>
        </tr>
        <tr>
            <td v-for="i in (patternData.loop_end)" :key="i">
                {{ explain[patternLoop[i]] }}
            </td>
        </tr>
    </table>
</div>
</template>

<script>
export default {
    name: 'BattlePatern',
    props: ['unitid'],
    data(){
        return {
            patternData: {},
            patternLoop: [],
            explain: {
                1: '普通攻击',
                1001: "技能一",
                1002: "技能二",
            }
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData: function(){
            this.$http.get("http://api.liantui.xyz/pcr/atkpattern/"+this.unitid).then((response)=>{
                this.setPatternData(response.data);
            });
        },
        setPatternData: function(result){
            var ele = result[0];
            for(var i=0;i<=ele.loop_end;i++){
                let key = 'atk_pattern_'+i;
                if(ele[key]>0){
                    this.patternLoop[i]=ele[key];
                }
            }
            this.patternData = ele;
        }
    }

}
</script>

<style lang="scss">
#battlePatern{
    margin: 10px;
    table {
        width: 1000px;
        td {
            border: 1px solid #aaa;
        }
    }
    .patternstart {
        background: pink;
    }
    .patternloop {
        background: #c3e6cb;
    }
}
</style>
