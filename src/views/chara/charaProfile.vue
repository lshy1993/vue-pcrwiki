<template>
<div class="inset-container">
    <div class="section whitebox">
        <profile-bar :profile-info="profileInfo" />
        <div style="height:350;margin:10px;" class="clearfixbox">
            <profile-img :unitid="unitID" />
            <profile-table :profile-info="profileInfo" />
        </div>
        <battle-table :unitid="unitID" />
        <battle-patern :unitid="unitID" />
        <skill-table :unitid="unitID"/>
        <promotion-table :unitid="unitID" />
        <chara-voice :unitid="unitID" />
    </div>
</div>
</template>

<script>
import ProfileBar from './profile/profileBar.vue';
import ProfileImg from './profile/profileImg.vue';
import ProfileTable from './profile/profileTable.vue';
import BattleTable from './profile/battleTable.vue';
import BattlePatern from './profile/battlePatern.vue'
import SkillTable from './profile/skillTable.vue';
import PromotionTable from './profile/promotionTable.vue';
import CharaVoice from './profile/charaVoice.vue';
import CharaLove from './profile/charaLove.vue';


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
