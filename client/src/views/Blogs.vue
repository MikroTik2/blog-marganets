<template>
     <main class="flex-1">
          <div class="container max-w-4xl py-6 lg:py-10">
               <div class="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
                    <div class="flex-1 space-y-4">
                         <h1 class="inline-block font-heading text-4xl tracking-tight lg:text-5xl">Новини</h1>
                    </div>
               </div>

               <hr class="my-8">

               <div class="grid gap-10 sm:grid-cols-2">
                    <article class="group relative flex flex-col space-y-2" v-for="element in blogs">
                         <img 
                              alt="Preview Mode for Headless CMS" 
                              fetchpriority="high" 
                              :src="element.images[0].url"
                              decoding="async" 
                              data-nimg="1" 
                              class="rounded-md object-cover border h-[223px] bg-muted transition-colors" 
                              style="color: transparent;"
                         >

                         <h2 class="text-2xl font-extrabold line-clamp-1"> {{ element.title[0]  }} </h2>

                         <p class="text-muted-foreground line-clamp-2">{{ element.description[0] }}</p>
                         <p class="text-sm text-muted-foreground line-clamp-2">{{ formatDate(element.createdAt) }}</p>

                         <router-link :to="`/category/news/detail/${element._id}`" class="absolute inset-0"></router-link>
                    </article>
               </div>
          </div>
     </main>
</template>

<script setup lang="ts">
     import { ref, onMounted } from 'vue';
     import blogsService from '@/services/blogsService.js';

     interface Blog {
          images: [{
               url: string,
               public_id: string,
          }],
          _id: string,
          title: string;
          description: string;
          createdAt: string;
     }

     const blogs = ref<Blog[]>([]);

     const formatDate = (dateString: string): string => {
          const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
          const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
          return formattedDate;
     };

     onMounted(async () => {
          blogs.value = await blogsService.getAllBlogs();
          console.log(blogs.value);
     });
</script>
