// Axios configuration to connect to my API endpoints on localhost:1337
        // stores: '/api/stores',
        // allItems: '/api/allitems',
        // craftingTables: '/api/craftingtables',
        // recipes: '/api/recipes',
        // tags: '/api/tags'



import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:1337",
    headers: {
        "Content-type": "application/json"
    }
});
