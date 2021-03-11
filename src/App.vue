<template>
    <div id="app">

        <v-index></v-index>

        <!-- <v-loading v-if="loading" :progress="progress" :tips="loadingTips"></v-loading> -->
    </div>
</template>

<script>

import Loading from "@/components/loading"
import Index from "@/views/index"

import { Loader } from "resource-loader"
import { IMAGE_URLS } from "@/assets/js/constants"
import { mapState } from "vuex"

export default {
    data() {
        return {
            progress: 0,
            loading: true,
            loadingTips: "程序加载中",
        }
    },
    components: {
        "v-loading": Loading,
        "v-index": Index
    },
    mounted() {
        let loader = new Loader()

        Object.keys(IMAGE_URLS).forEach(name => {
            loader.add(name, IMAGE_URLS[name])
            console.log(IMAGE_URLS[name])
        })

        loader.onProgress.add(() => {
            this.progress = Math.round(loader.progress)
            console.log(this.progress)
        })

        loader.onComplete.add(() => {
            setTimeout(() => {
                this.loading = false
            }, 500)
        })

        loader.load()
        window.loader = loader
    },
    computed: {
        ...mapState({
            index: state => state.indexState,
        })
    }
}
</script>

<style lang="scss">
html,body{
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.layui-m-layer-msg{
    bottom: 0 !important;
}

</style>

<style lang="scss" scoped>
@import url("./assets/scss/reset.scss");

#app{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>

