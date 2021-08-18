<template>
    <div class="hello">
        <h1>Test ATree</h1>
        <SearchBar :searcher="searcher" @select="onSelect"></SearchBar>
        <ATree
            :loader="loader"
            :path="[]"
            :highlight="highlight"
            @nodeClicked="onNodeClicked"
            @nodeContextMenu="onNodeContextMenu"/>
    </div>

</template>

<script>
import api from "@/api"
import { ATree, SearchBar} from "@bbones1967/atree";

export default {
    name: 'HelloWorld',
    components: {SearchBar, ATree},
    data() {
        return {
            nodes: [],
            highlight: []
        }
    },

    methods: {
        async loader(parent_id) {
            let data = await api.getNodes(parent_id);
            // console.table(data);
            return data;
        },

        async searcher(str) {
            let data = await api.searchNodes(str);
            return data;
        },

        async onSelect(event) {
            let path = await api.getPath(event.id);
            let arrPath = path.map(n => n.id).reverse();
            console.log(arrPath)
            this.highlight = arrPath;
        },
        onNodeClicked(event) {
            console.log(event)
        },
        onNodeContextMenu({item, index}) {
            alert("You've tried to open context menu" + item + index);
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

</style>
