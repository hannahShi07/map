<template>
  <component :is="currentComponent" :params="params" :type="type" @handleSwitch="handleSwitch"></component>
</template>

<script>
    import Index from './components/index'
    import ProDouAdd from './components/pro-dou-add'
    import ProDouDetail from './components/pro-dou-detail'
    import prosocialAdd from './components/prosocial-add'
    import prosocialDetail from './components/prosocial-detail'
    import socialOrgAdd from './components/socialOrg-add'
    import socialOrgDetail from './components/socialOrg-detail'
    import socialNonAdd from './components/socialNon-add'
    import socialNonDetail from './components/socialNon-detail'

    export default {
        components:
            {Index,ProDouAdd,ProDouDetail,prosocialAdd,prosocialDetail,socialOrgAdd,socialOrgDetail,socialNonAdd,socialNonDetail},
        watch:{
            $route(to,from){
                if(to){
                    // if(to.path == '/backstage/party/priority/awards/index'){
                    //     this.currentComponent = 'Index'
                    // }
                }
            }
        },
        data () {
            return {
                currentComponent: 'Index',
                params: {},
                type:''
            }
        },
        created () {
            this.currentComponent = 'Index'
        },
        methods: {
            handleSwitch ({name, params = {},type}) {
                this.currentComponent = name
                this.params = params
                this.type = type
            }
        }
    }
</script>
