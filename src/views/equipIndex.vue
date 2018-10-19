<template>
<div class="inset-container">
    <div class="section whitebox">
        <div>过滤器</div>
        <div class="warpbox clearfixbox">
            <div class="clearfix" v-for="(equip,key) in equipDic" v-bind:key="key">
                <router-link :to="getrouter(key)">
                    <div class="small_icon90">
                        <img :src="Common.getEquipIcon(key)" />
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'EquiptIndex',
    data(){
        return{
            equipDic: {}
        }
    },
    created: function(){
        this.loadData();
        console.log("mlist");
    },
    methods:{
        loadData: function(){
            this.$http.get("http://api.liantui.xyz/pcr/equip").then((response)=>{
                this.setEquipDic(response.data);
            });
			// var result = this.Common.db.prepare("SELECT * FROM equipment_data");
            // this.setEquipDic(result);
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
        getrouter: function(key) {
            //改为路由跳转
            return '/equip/' + key;
        }
	}
}    
</script>

<style lang="scss">
    .warpbox {
        margin: auto;
    }
</style>
