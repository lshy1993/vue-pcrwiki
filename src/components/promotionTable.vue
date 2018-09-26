<template>
    <div id="PromotionTable">
        <h2>晋升所需装备一览</h2>
        <table >
            <tr v-for="(promo, index) in promoList" v-bind:key="index">
                <th> R{{ index }} </th>
                <td class="clearfixbox">
                    <div class="clearfix small_icon64" v-for="i in 6" v-bind:key="i">
                        <router-link :to="getrouter(promo,i)">
                            <img :src=imgurl(promo,i) />
                        </router-link>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'PromotionTable',
    props: ['unitid'],
    data(){
        return{
            promoList: {}
        }
    },
    created(){
        this.loadData();
    },
    watch: {
		unitid: function(){
			this.loadData();
	    }
    },
    methods:{
        loadData: function(){            
            console.log('LOAD unit_promotion');
            //var result = this.Common.prepare("SELECT * FROM unit_promotion WHERE unit_id = "+ this.unitid);

            this.$http.get("http://api.liantui.xyz/pcr/promotion/"+this.unitid).then((response)=>{
                this.setPromotionList(response.data);
            });
            //this.setPromotionList(result);

        },
		setPromotionList: function(result){
            var dd = {};
            for(var id in result){
                var ele = result[id];
				var index = ele['promotion_level'];
				dd[index] = ele;
            }
            this.promoList = dd;
        },
        imgurl: function(curPromo,i){
            var equipid = curPromo['equip_slot_'+i];
            if(equipid == undefined){
                equipid = '999999'
            }
            return '/static/img/equipment/icon_equipment_' + equipid +'.png';
        },
        getrouter: function(curPromo,i){
            var equipid = curPromo['equip_slot_'+i];
            if(equipid == undefined){
                equipid = '999999'
            }
            return '/equip/' + equipid;
        }
	}
}
</script>

<style lang="scss">
#PromotionTable {
    margin: 10px;
    table {
        border: 1px solid #aaa;
        border-collapse: collapse;
        color: black;
	}
    th {
        background: gray;
        padding: 10px;
    }
    td {
        border: 1px solid #aaa;
        padding: 5px;
    }
	
}
</style>