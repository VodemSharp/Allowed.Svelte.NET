import './app.css'
import App from './App.svelte'

declare global {
    interface Window {
        SVELTE_DOT_NET_STATE
    }
}

const app = new App({
    target: document.getElementById('app'), 
    hydrate: true,
    props: {
        url: window.location.href,
        ssrData: window.SVELTE_DOT_NET_STATE
    }
})

export default app
