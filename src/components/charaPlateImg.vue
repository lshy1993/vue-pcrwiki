<template>
<div class="clearfix" @mouseover="hovered=true" @mouseleave="hovered=false">
    <router-link :to="getrouter">
        <div class="charaplate">
            <div id="stardiv">
                
            </div>
            <div id="charanamediv">
                {{ charaName }}
            </div>
            <div id="charakanadiv">
                {{ charaKana }}
            </div>
            <img style="width:100%" :src="imgurl" />
        </div>
    </router-link>
</div>
</template>

<script>
export default {
    name: 'CharaPlateImg',
    props: ['charaData'],
    data(){
        return{
            hovered: false
        }
    },
    computed: {
        imgurl: function(){
            let uid = parseInt(this.charaData['unit_id']);
            uid += this.hovered?30:10;
            return '/static/img/unitplate/unit_plate_' + uid + '.png';
        },
        getrouter: function(){
            let chara_id = parseInt(this.charaData['unit_id']/100);
            return '/chara/' + chara_id;
        },
        charaName: function(){
            return this.charaData['unit_name'];
        },
        charaKana: function(){
            let chara_id = parseInt(this.charaData['unit_id']/100);
            return this.Translation.zh_unit_name[chara_id];
            //return this.charaData['kana'];
        }
    },
    methods: {
        
    }


}
</script>

<style lang="scss">
.charaplate{

    font-size: 16px;
    font-weight: bolder;
    text-shadow: #000 -1px 0 0,#763c12 0 -1px 0,#5d2b08 1px 0 0,#1d1515 0 1px 0;
    color: white;

    #stardiv{
        position: absolute;
    }
    #charanamediv{
        position: absolute;
        bottom: 20px;
        right: 5px;
    }
    #charakanadiv{
        position: absolute;
        bottom: 0px;
        right: 5px;
    }
} 



</style>