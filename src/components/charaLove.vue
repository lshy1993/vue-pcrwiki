<template>
<div>
    <h1>{{ msg }}</h1>
</div>
</template>

<script>
export default {
    name: 'CharaLove',
    props: ['unitid'],
    data () {
        return {
            msg: ''
        }
    },
    created() {
        this.msg = 'there a voice data';
        console.log('11');
    },
	methods:{

	},
    components: {

    }
}
</script>