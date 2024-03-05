import '@/assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initializeApp } from "firebase/app";
import App from '@/App.vue';
import router from './router/index';

const firebaseConfig = {
     apiKey: "AIzaSyAMnG-dcob-7_Mo8biqd5F-xjeUlrjYZTI",
     authDomain: "school-f3a15.firebaseapp.com",
     projectId: "school-f3a15",
     storageBucket: "school-f3a15.appspot.com",
     messagingSenderId: "758481503406",
     appId: "1:758481503406:web:e6a511899a96c22487193f"
};

initializeApp(firebaseConfig);
createApp(App)

.use(router)
.use(createPinia())

.mount('#app');