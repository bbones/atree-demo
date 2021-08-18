const domains = [
    {id: 1, name: "root1", parent_id: null, children: [], isLoaded: false, isVisible: false},
    {id: 2, name: "root2", parent_id: null, children: [], isLoaded: false, isVisible: false},
    {id: 3, name: "root3", parent_id: null, children: [], isLoaded: false, isVisible: false},
    {id: 4, name: "child1-4", parent_id: 1, children: [], isLoaded: false, isVisible: false},
    {id: 5, name: "child4-5", parent_id: 4, children: [], isLoaded: false, isVisible: false},
    {id: 6, name: "child5-6", parent_id: 5, children: [], isLoaded: false, isVisible: false},
    {id: 7, name: "child2-7", parent_id: 2, children: [], isLoaded: false, isVisible: false},
    {id: 8, name: "child3-8", parent_id: 3, children: [], isLoaded: false, isVisible: false},
    {id: 9, name: "child4-9", parent_id: 4, children: [], isLoaded: false, isVisible: false}
];

let dMap = {};

for (const d of domains) {
    dMap[`${d.id}`] = d;
}

export default {
    async getNodes(parent_id) {
        console.debug("getNodes", parent_id)
        let result = domains.filter((d) => {
            return d.parent_id === parent_id
        }) ;
        return result;
    },

    async searchNodes(searchText) {
        console.debug("searchNodes", searchText);
        let result = domains.filter((d) => {
            return d.name.search(searchText) !== -1
        });
        return result;
    },

    async getPath(id) {
        let result = [];
        result.push(dMap[`${id}`])
        if (dMap[`${id}`].parent_id) {
            const data = await this.getPath(dMap[`${id}`].parent_id);
            result.push(...data)
        }
        return result;
    }
}
