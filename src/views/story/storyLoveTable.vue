<template>
<div class="clearfix">
    <div v-for="(ele,key) in propertyAdd" :key="key">
        <th>{{ key }}</th>
        <td>+{{ ele }}</td>
    </div>
</div>
</template>

<script>
export default {
    name: 'StoryLoveTable',
    props: ['loveData'],
    data(){
        return{
            propertyAdd: {}
        }
    },
    created(){
        this.setStatusList();
    },
    methods:{
        setStatusList: function(){
            if(this.loveData==undefined) return;
            var dd = {};
            for(var i=1;i<=5;i++){
                let index = this.loveData['status_type_'+i];
                if(index == 0) continue;
                let property = this.Translation.zh_status_type[index];
                dd[property] = this.loveData['status_rate_'+i];
            }
            this.propertyAdd = dd;
        }
    }
}
</script>

<style>

</style>
