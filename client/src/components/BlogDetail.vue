<template>
     <main class="flex-1">
          <article class="container relative max-w-3xl py-6 lg:py-10" v-if="blog">
               <div>
                    <time datetime="2023-04-09T00:00:00.000Z" class="block text-sm text-muted-foreground"></time>

                    <h2 class="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">{{ blog.title[0] }}</h2>

                    <div class="mt-4 flex space-x-4">
                         <div class="flex items-center space-x-2 text-sm">
                              <Avatar class="h-11 w-11">
                                   <AvatarImage :src="blog.author.avatar.url" alt="avatar" />
                                   <AvatarFallback>{{ getShortName() }}</AvatarFallback>
                              </Avatar>
                         </div>

                         <div class="flex-1 text-left leading-tight">
                              <p class="font-medium">{{ blog.author.name }}</p>
                              <p class="text-[12px] text-muted-foreground">@{{ blog.author.name }}</p>
                         </div>
                    </div>

                    <img class="my-8 rounded-md border object-cover h-[400px] w-full bg-muted transition-colors" :src="blog.images[0].url" :alt="blog.title[0]">

                    <div class="mdx">
                         <div class="my-6 flex items-start rounded-md border border-l-4 p-4">
                              <div>
                                   <p class="leading-7 [&:not(:first-child)]:mt-6">
                                        {{ blog.description[0] }}
                                   </p>
                              </div>
                         </div>
                    </div>

                    <p class="leading-7 [&:not(:first-child)]:mt-6">
                         {{ blog.description[0] }}
                    </p>

                    <p class="leading-7 [&:not(:first-child)]:mt-6">
                         {{ blog.description[1] }}
                    </p>

                    <blockquote class="mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground">
                         <p class="leading-7 [&:not(:first-child)]:mt-6">
                              {{ blog.description[2] }}
                         </p>
                    </blockquote>

                    <p class="leading-7 [&:not(:first-child)]:mt-6">
                         {{ blog.description[3] }}
                    </p>
                    
                    <p class="leading-7 [&:not(:first-child)]:mt-6">
                         {{ blog.description[4] }}
                    </p>

                    <h2 class="mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0">
                         {{ blog.title[1] }}
                    </h2>

                    <p class="leading-7 [&:not(:first-child)]:mt-6">
                         {{ blog.description[5] }}
                    </p>

                    <img class="my-8 object-cover rounded-md border h-[400px] w-full bg-muted transition-colors" :src="blog.images[1].url" :alt="blog.title[1]">

                    <p class="leading-7 [&:not(:first-child)]:mt-6">
                         {{ blog.description[6] }}
                    </p>

                    <hr class="mt-12">

                    <div class="flex justify-center py-6 lg:py-10">
                         <Button as-child class=" font-medium text-sm left-8 top-8" variant="ghost">
                              <router-link to="/category/news">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4">
                                        <polyline points="15 18 9 12 15 6"></polyline>
                                   </svg>

                                   Посмотреть все блоги
                              </router-link>
                         </Button>
                    </div>

               </div>
          </article>
     </main>
</template>

<script setup lang="ts">
     import { ref, onMounted } from 'vue';
     import { useRoute } from 'vue-router';
     import { Button } from '@/components/ui/button';
     import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
     import blogsService from '@/services/blogsService';

     const route = useRoute();

     interface Blog {
          _id: string,
          title: string;
          description: string;
          createdAt: string;
          author: {
               name: string;
               avatar: {
                    url: string;
                    public_id: string;
               };
          };
          images: [
               {
                    url: string,
                    public_id: string,
               },
               {
                    url: string,
                    public_id: string,
               },
          ],
     };

     const blogId = ref('');
     const blog = ref<Blog | null>(null);

     const getShortName = () => {
          let fullName = blog.value?.author.name;
          if (fullName) {
               const initials = fullName
                    .split(' ')
                    .map(word => word.charAt(0))
                    .join('');

               return initials;
          } else {
               return '';
          };
     };
     
     onMounted(async () => {
          blogId.value = route.params.id as string; 
          const response = blog.value = await blogsService.getBlog(blogId.value);

          blog.value = response.blog;
          document.title = `Марганецький ліцей № 10 Новини ${response.blog.title[0]}`
     });
</script>