<template>
<div class="inset-container">
    <div class="section whitebox">
        <h2>装备</h2>
        <equip-filter v-on:filter="listenProps" />
        <transition-group name="flip-list" tag="div" class="warpbox clearfixbox">
            <div class="clearfix" v-for="ele in equipShowDic" v-bind:key="ele.equipment_id">
                <router-link :to="getrouter(ele.equipment_id)">
                    <div class="small_icon90">
                        <img :src="Common.getEquipIcon(ele.equipment_id)" />
                    </div>
                </router-link>
            </div>
        </transition-group>
    </div>
</div>
</template>

<script>
import EquipFilter from '@/components/equipFilter.vue';
export default {
    name: 'EquiptIndex',
    data(){
        return{
            equipDic: {},
            filter: {},
        }
    },
    created: function(){
        this.loadData();
    },
    computed:{
        equipShowDic: function () {
            var result = [];
            for(var key in this.equipDic){
                let ele = this.equipDic[key];
                result.push(ele);
            }
            result = result.filter(this.checkPromo);
            result = result.filter(this.checkFlag);
            return result;
        }
    },
    methods:{
        listenProps: function(childValue){
            console.log('from child');
            this.filter = childValue;
        },
        loadData: function(){
            var url = this.Common.GetApi("pcr/equip");
            this.$http.get(url).then((response)=>{
                this.setEquipDic(response.data);
            });
        },
        setEquipDic: function(result){
            var dd = {};
            for(var id in result){
                var ele = result[id];
                let index = ele['equipment_id'];
                dd[index] = ele;
            }
            this.equipDic = dd;
        },
        checkPromo: function(ele){
            if(this.filter.plv == -1) return true;
            return ele.promotion_level == this.filter.plv;
        },
        checkFlag: function(ele){
            if(this.filter.flag == -1) return true;
            return ele.craft_flg == this.filter.flag;
        },
        getrouter: function(key) {
            //改为路由跳转
            return '/equip/' + key;
        }
    },
    components:{
        EquipFilter
    }
}    
</script>

<style lang="scss">
    .warpbox {
        margin: auto;
    }
</style>
