<template>
     <div class="flex-1">
          <div class="container max-w-4xl py-6 lg:py-10">
               <div class="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
                    <div class="flex-1 space-y-4">
                    <h1 class="inline-block font-heading text-4xl tracking-tight lg:text-5xl">Добавить блог</h1>
                    </div>
               </div>
   
               <hr class="my-8">
   
               <div>
                    <div class="space-y-6">

                         <div>
                              <Label for="title1">Заголовок 1</Label>
                              <Input v-model.trim="title1" id="title1" type="text" placeholder="Введите заголовок 1" />
                         </div>

                         <div>
                              <Label for="title2">Заголовок 2</Label>
                              <Input v-model.trim="title2" id="title2" type="text" placeholder="Введите заголовок 2" />
                         </div>

                         <div>
                              <Label for="description1">Описание 1</Label>
                              <Input v-model.trim="description1" id="description1" type="text" placeholder="Введите описание 1" />
                         </div>

                         <div>
                              <Label for="description2">Описание 2</Label>
                              <Input v-model="description2" id="description2" type="text" placeholder="Введите описание 2" />
                         </div>

                         <div>
                              <Label for="description3">Описание 3</Label>
                              <Input v-model="description3" id="description3" type="text" placeholder="Введите описание 3" />
                         </div>
                    
                         <div
                              class="flex flex-col items-center h-[400px] border-2 border-dashed justify-center rounded-md"
                              @dragover.prevent
                              @drop="handleImageDrop"
                         >
                              <Label for="imageUpload" class="cursor-pointer flex items-center justify-center w-full h-full">
                                   Перетащите изображение или кликните для загрузки
                              </Label>

                              <Input
                                   type="file"
                                   id="imageUpload"
                                   class="hidden"
                                   @change="handleImageUpload"
                                   accept="image/*"
                              />

                         </div>

                         <div v-if="images.length > 0"  class="flex gap-4">
                              <div v-for="(image, index) in images" :key="index" class="flex relative gap-4">
                                   <img class="rounded-lg w-[150px] h-[150px]" :src="image" alt="Uploaded Image" />

                                   <button class="absolute z-[10] top-[-10px] bg-white rounded-[100px] p-1 right-[-10px]" type="button" @click="deleteUploadedImage(index)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-xicon w-4 h-4 text-muted-foreground">
                                             <path d="M18 6 6 18"></path>
                                             <path d="m6 6 12 12"></path>
                                        </svg>
                                   </button>
                              </div>
                         </div>

                         <hr>

                         <Button type="button" :disabled="isLoading" @click="handleSubmit">
                              <svg viewBox="0 0 24 24" width="1.2em" height="1.2em" v-if="isLoading" class="mr-2 h-4 w-4 animate-spin">
                                   <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                              </svg>

                              Добавити
                         </Button>
                    </div>
               </div>
          </div>
     </div>
</template>
   
   <script setup lang="ts">
     import { ref } from 'vue';
     import { Button } from '@/components/ui/button';
     import { Input } from '@/components/ui/input';
     import { Label } from '@/components/ui/label';
     import { useToast } from '@/components/ui/toast/use-toast'

     import { useRouter } from 'vue-router';

     import blogsService from '@/services/blogsService';

     const isLoading = ref(false);
     
     const title1 = ref('');
     const title2 = ref('');
     const description1 = ref('');
     const description2 = ref('');
     const description3 = ref('');
     const images = ref<string[]>([]);

     const router = useRouter();
     const { toast } = useToast();
   
     const handleImageUpload = (event: Event) => {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (file) {
               showUploadedImage(file);
          };
     };
   
     const handleImageDrop = (event: DragEvent) => {
          event.preventDefault();
          const file = event.dataTransfer?.files?.[0];

          if (file) {
               showUploadedImage(file);
          };
     };
   
     const showUploadedImage = (file: File) => {
          const reader = new FileReader();
               reader.onload = () => {
               images.value.push(reader.result as string);
          };

          reader.readAsDataURL(file);
     };

     const deleteUploadedImage = (index: any) => {
          if (index >= 0 && index < images.value.length) {
               images.value.splice(index, 1);
          };
     };
   
     const handleSubmit = async () => {
          isLoading.value = true;

          try {
               

               const blogInfo = {
                    title: [title1.value, title2.value],
                    description: [description1.value, description2.value, description3.value],
                    images: [...images.value],
               };

               await blogsService.createBlog(blogInfo);

               toast({
                    title: "🚀 Блог успішно створено!",
                    description: "Ваш новий блог готовий до пригод.",
               });

               router.push({ name: "Blogs" })

          } catch (err: any) {

               toast({
                    title: "⚠️ Опачкии Ошибка!!",
                    description: err.response.data.message,
               });

          } finally {
               isLoading.value = false;
          }
     };

</script>
   