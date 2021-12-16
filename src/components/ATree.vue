<template>
    <ul>
        <li
            v-for="(item, index) in nodes"
            :key="item.id"
            @click.stop="onNodeClicked({item, index})"
            @contextmenu.stop="onContextMenu({item, index,event: $event})"
            :class="selectedNodeClass(item.id)"
            :ref="'li_'+item.id"
        >
            <span :ref="'caret_'+item.id" class="caret" @click.stop="onCaretClick(item,index, $event)"></span>

            {{ item.name }}

<!--            <ATree-->
<!--                v-if="item.isLoaded"-->
<!--                v-show="item.isVisible"-->
<!--                :start_with_id="item.id"-->
<!--                :loader="loader"-->
<!--                :path="path.concat([item.id])"-->
<!--                :highlight="highlight"-->
<!--                mode="root"-->

<!--                @nodeClicked="onNodeClicked"-->
<!--                @nodeContextMenu="onNodeContextMenu"-->
<!--            />-->
        </li>
    </ul>
</template>

<script>
export default {
    name: "ATree",
    props: {
        loader: Function,
        highlight: Array,
        path: {
            type: Array,
            default: () => []
        },
        start_with_id: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            nodes: []
        }
    },
    methods: {
        async onCaretClick(item, index, event) {
            event.target.classList.toggle("caret-down");
            this.nodes[index].isLoaded = true;
            this.nodes[index].isVisible = !this.nodes[index].isVisible;
        },
        async onNodeClicked({item, index}) {
            this.$emit("nodeClicked", {item, index})
        },

        async onContextMenu({item, index, event}) {
            event.preventDefault();
            this.$emit("nodeContextMenu", {item, index})
        },

        onNodeContextMenu({item, index}) {
            this.$emit("nodeContextMenu", {item, index})
        },

        selectedNodeClass: function (id) {
            return this.highlight.indexOf(id) === -1 ? "" : "selected"
        }
    },
    async created () {
        this.nodes = await this.loader(this.start_with_id);
        await this.$nextTick()
        if (this.highlight) {
            this.highlight.forEach(id => {
                const nl = this.$refs[`caret_${id}`];
                if (nl) {
                    nl[0].click();
                }
            })
        }
    },


    watch: {
        highlight: async function(val) {
            if (val && !this.isLoaded) {
                val.forEach(id => {
                    const nl = this.$refs[`caret_${id}`];
                    if (nl) {
                        if (! nl[0].classList[1])
                            nl[0].click();
                    }
                })
            }
        }
    }

}
</script>

<style scoped>
ul {
    list-style-type: none;
    text-align: left;
    cursor: pointer;
    user-select: none; /* Prevent text selection */
}

.selected {
    border: 1px solid aquamarine;;
}

/* Style the caret/arrow */
.caret {
    cursor: pointer;
    user-select: none; /* Prevent text selection */
}

/* Create the caret/arrow with a unicode, and style it */
.caret::before {
    content: "\25B6";
    color: black;
    display: inline-block;
    margin-right: 6px;
}

/* Rotate the caret/arrow icon when clicked on (using JavaScript) */
.caret-down::before {
    transform: rotate(90deg);
}

/* Hide the nested list */
.nested {
    display: none;
}

/* Show the nested list when the user clicks on the caret/arrow (with JavaScript) */
.active {
    cursor: pointer;
    display: block;
}
</style>