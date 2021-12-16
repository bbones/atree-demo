import { mount } from '@vue/test-utils';
import ATree from "@/components/ATree";
import api from "@/api"

describe("ATree", () => {
    test("Render ATree", async () => {
        const wrapper = mount(ATree, {
            propsData: {
                nodes: [],
                highlight: [],
                loader: async function (parent_id) {
                    let data = await api.getNodes(parent_id);
                    // console.table(data);
                    return data;
                }
            }
        });
    })
})