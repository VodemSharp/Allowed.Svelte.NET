import {createStores} from "../stores/RouterStores";

let ssrUrl = "https://127.0.0.1:5173";
let ssrData = {model: {text: 'test'}};

createStores(ssrUrl, ssrData);