<template>
<div id="charaprofilebox">
    <profile-bar :profile-info="profileInfo" />
    <div style="height:350" class="clearfixbox">
        <profile-img :unitid="unitID" />
        <profile-table :profile-info="profileInfo" />
    </div>
    <battle-table :unitid="unitID" />
    <battle-patern :unitid="unitID" />
    <skill-table :unitid="unitID"/>
    <promotion-table :unitid="unitID" />
    <chara-voice :unitid="unitID" />
</div>
</template>

<script>
import ProfileBar from './profileBar.vue';
import ProfileImg from './profileImg.vue';
import ProfileTable from './profileTable.vue';
import BattleTable from './battleTable.vue';
import BattlePatern from './battlePatern.vue'
import SkillTable from './skillTable.vue';
import PromotionTable from './promotionTable.vue';
import CharaVoice from './charaVoice.vue';
import CharaLove from './charaLove.vue';


export default {
    name: 'CharaProfile',
    data () {
        return {
            profileInfo: {},
            //batInfoDic: {},
            //skillInfo: [],
            //equipInfo: []
        }
    },
    created() {
        this.unitID = this.$route.params.id + "01";
        this.setProfile();
    },
    beforeRouteUpdate (to, from, next) {
        this.unitID = to.params.id + "01";
        this.setProfile();
        next();
    },
	methods:{
        setProfile: function(){
            console.log('setProfile',this.unitID);
            this.$http.get("http://api.liantui.xyz/pcr/profile/"+this.unitID).then((response)=>{
                this.profileInfo = response.data[0];
            });
			//var result = this.Common.db.prepare("SELECT * FROM unit_profile WHERE unit_id = " + this.unitID);
			// while(result.step()){
			// 	this.profileInfo = result.getAsObject();
			// }
			// //释放
			// result.free();
        }
	},
    components: {
        ProfileBar,
        ProfileImg,
        ProfileTable,
        BattleTable,
        BattlePatern,
        SkillTable,
        PromotionTable,
        CharaLove,
        CharaVoice,
    }
}
</script>

<style lang="scss">
#charaprofilebox {
    height: auto;
    margin: 10px;
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);

}
</style>
