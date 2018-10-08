<template>
<div>
    <h2>掉落</h2>
    {{ msg }}
</div>
</template>

<script>
export default {
    name: 'EquipDrop',
    props: ['equipid'],
    data(){
        return {
            msg: 'drop',
        }
    }
}
</script>