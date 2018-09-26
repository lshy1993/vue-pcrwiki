<template>
<div id="SkillDetailTable">
    <table>
        <tr>
            <td id="icontd" rowspan="2">
                <div class="icon_large90">
                    <img :src=geturl(skillData) />
                </div>
            </td>
            <th id="nameth" colspan="2">{{ skname }}</th>
            <td id="manatd">
                <button v-on:click="skminus">-</button>
                <input class="num_input" type="text" min="1" v-model="sklv">
                <button v-on:click="skplus">+</button>
                
            </td>
        </tr>
        <tr>
            <td id="skcontent">{{ description }}</td>
            <td id="skaction"><pre>{{ skillAction }}</pre></td>
            <td>需要Mana:<br>{{ mananeed }}</td>
        </tr>
    </table>
</div>
</template>


<script>
export default {
    name: 'SkillDetailTable',
    props: ['skillData', 'skillAction','skillCost'],
    data() {
        return {
            sklv: 1
        }
    },
    computed: {
        skname: function(){
            if(this.skillData == undefined) return "";
            return this.skillData.name;
        },
        description: function(){
            if(this.skillData == undefined) return "";
            return this.skillData.description;
        },
        mananeed: function(){
            let lv = parseInt(this.sklv+1);
            return this.skillCost[lv];
        }
    },
    methods:{
        geturl: function(skillData){
            if(skillData == undefined){
                return '/static/img/skill/icon_skill_Mask_Alpha.png';
            }
            return '/static/img/skill/icon_skill_' + skillData.icon_type +'.png';
        },
        skminus: function(){
            if(this.sklv>1) this.sklv--;
        },
        skplus: function(){
            if(this.sklv<100) this.sklv++;
        }
    }
}
</script>

<style lang="scss">
#SkillDetailTable {

    input.num_input {
		width: 30px;
	}

    table {
        width: 100%;
        height: 100px;
        border: 1px solid #aaa;
        border-collapse: collapse;
        color: black;

        #icontd {
            border: 1px solid #aaa;
            width: 100px;
            //text-align: center;
            align-content: center;
            padding: 5px;
        }
        #manatd {
            padding: 10px;
            border: 1px solid #aaa;
        }
        #nameth {
            height: 45px;
            padding-left: 10px;
            background: gray;
            text-align: left;
        }
        #skcontent {
            width: 500px;
            padding: 5px;
        }
        #skaction {
            width: 250px;
            padding: 5px;
        }

	}
    
}
</style>