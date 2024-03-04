<template>
     <footer class="container border-t py-6">
          <div class="flex justify-between">
               <div class="flex items-center gap-[12px]">
                    <a class="w-[36px] flex items-center justify-center h-[36px] bg-white rounded-[100px]" :href="link.path" v-for="link in linkItems" :key="link.svg">
                         <img :src="link.svg" alt="icons">
                    </a>
               </div>

               <router-link to="/">
                    <img class="rounded-[10px]" width="40" height="40" src="/img/branding-school.png" alt="logo">
               </router-link>

          </div>
     </footer>
</template>

<script setup lang="ts">
     import { ref } from 'vue';

     const linkItems = ref([
          { svg: "/icons/facebook.svg", path: "https://www.facebook.com/desjatka1/" },
          { svg: "/icons/main.svg", path: "mailto:desjatka1@gmail.com" },
          { svg: "/icons/novi-znania.svg", path: "https://nz.ua/" },
     ]);


</script>