<template>
    <div>
        <label ref="si" for="search-input">{{ prompt }}</label>
        <div class="dropdown">
            <input id="search-input" name="search-input" v-model="searchStr"
                   @input="onInputSearch"
                   class="dropinput"
            />
            <div class="dropdown-content">
                <a href="#" v-for="(item) in options" :key="item.id" @click="onSelect(item)">{{item.name}}</a>
            </div>

        </div>

    </div>

</template>

<script>

export default {
    name: "SearchBar",
    props: {
        prompt: {
            type: String,
            default: "Search: "
        },
        searcher: Function
    },
    data() {
        return {
            searchStr: "",
            options: []
        }
    },
    methods: {
        onInputSearch(event) {
            this.searcher(this.searchStr).then( value => {
                this.options = value
            });
        },

        onSelect(item) {
            this.$refs.si.focus();
            this.$emit("select", item);
        },

        onChangeSearch() {
            let data = this.options.findIndex(opt => {
                return opt.name === this.searchStr
            })
            this.$emit("select", this.options[data]);
        }
    }

}

</script>

<style scoped>
/* Style The Dropdown Button */
.dropinput {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    font-size: 16px;
    border: none;
    cursor: pointer;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
    position: relative;
    display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 400px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #f1f1f1}

/* Show the dropdown menu on hover and focus */
.dropdown:hover .dropdown-content {
    display: block;
}

.dropdown:focus-within .dropdown-content {
    display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropinput {
    background-color: #3e8e41;
}
</style>