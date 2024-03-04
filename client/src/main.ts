import '@/assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initializeApp } from "firebase/app";
import App from '@/App.vue';
import router from './router/index';

const firebaseConfig = {
     apiKey: "AIzaSyCvwy_hdoYlfn9jJCGFHlSeq_eKO4F0lZk",
     authDomain: "marganets-blogs.firebaseapp.com",
     projectId: "marganets-blogs",
     storageBucket: "marganets-blogs.appspot.com",
     messagingSenderId: "128771123652",
     appId: "1:128771123652:web:d080cce70c8e89bfb65c91"
};

initializeApp(firebaseConfig);
createApp(App)

.use(router)
.use(createPinia())

.mount('#app');