import { createApp } from 'vue'
import App from './Devtools.vue'
import { setupApp } from '~/logic/common-setup'
import '../styles'

const app = createApp(App)
setupApp(app)
app.mount('#app')
chrome.devtools.panels.create("Sample Panel", "icon.png", "../options.html", panel => {
  // code invoked on panel creation
  console.log("===🐛=== ~ panel:", panel);
});
