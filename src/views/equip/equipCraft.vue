<template>
<div id="equipCraft">
    <h2>合成</h2>
    <div v-if="!needCraft">
        该装备无需合成
    </div>
    <div v-if="needCraft">
        <div>消费マナ {{ cost }}</div>
        <div>消费装备</div>
        <div class="clearfixbox">
            <div class="clearfix small_icon" v-for="(item,key) in items" :key="key">
                <router-link :to="getrouter(item.id)">
                <div class="craftnum">× {{ item.num }}</div>
                <img style="width:100%" :src="geturl(item.id)"/>
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'EquipCraft',
    props: ['equipCraft'],
    data(){
        return {
           
        }
    },
    computed: {
        needCraft: function(){
            if(this.equipCraft == undefined) return false;
            if(this.equipCraft.equipment_id != undefined) return true;
            return false;
        },
        cost: function(){
            if(this.equipCraft == undefined) return 0;
            return this.equipCraft.crafted_cost;
        },
        items: function(){
            var dic = {};
            for(var i=1;i<=10;i++){
                let prname = 'condition_equipment_id_'+i;
                let consume = 'consume_num_'+i;
                if(this.equipCraft[prname]>0){
                    let dd = {id:this.equipCraft[prname], num:this.equipCraft[consume]};
                    dic[i] = dd;
                }
            }
            return dic;
        }
    },
    created(){
        //console.log(this.equipCraft);
    },
    methods:{
        geturl: function(key){
            return '/static/img/equipment/icon_equipment_' + key + '.png';
        },
        getrouter: function(key){
            return '/equip/' + key;
        },
    }
}
</script>

<style lang="scss">
#equipCraft{
    div.small_icon {
        padding: 5px;
        width: 90px;
        height: 90px;
        position: relative;

        .craftnum {
            position: absolute;
            bottom: 5px;
            right: 5px;
            font-size: 16px;
            color: #000;
            text-shadow: #fff -1px 0 0,#fff 0 -1px 0,#fff 1px 0 0,#fff 0 1px 0;
        }
    }
}
</style>
