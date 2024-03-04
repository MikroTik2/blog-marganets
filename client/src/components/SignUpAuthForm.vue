<script setup lang="ts">
     import { ref } from 'vue';
     import { useRouter } from 'vue-router';
     import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

     import { useToast } from '@/components/ui/toast/use-toast'
     import { Button } from './ui/button';
     import { Input } from './ui/input';
     import { Label } from './ui/label';
     import { cn } from '@/lib/utils';
     import authService from '@/services/authService';

     const { toast } = useToast();

     const router = useRouter();

     const isLoading = ref(false);

     const name = ref('');
     const email = ref('');
     const password = ref('');

     async function onSubmit(event: Event): Promise<void> {
          event.preventDefault();
          isLoading.value = true;

          try {

               const userInfo = {
                    name: name.value,
                    email: email.value,
                    password: password.value,
               };

               await authService.register(userInfo);

               toast({
                    title: `${localStorage.getItem("name")} - Автентифікація успішна 🎉`,
                    description: "Щиро вітаю! Ви успішно пройшли автентифікацію та отримали доступ до свого облікового запису. Насолоджуйтесь вивченням нашої платформи!",
               });

               router.push("/");

          } catch (err: any) {

               toast({
                    title: "⚠️ Опачкии Ошибка!!",
                    description: err.response.data.message,
               });

          } finally {
               isLoading.value = false;
          };
     };

     async function onSubmitGoogle(event:Event) {
          event.preventDefault();
          isLoading.value = true;

          try {

               const auth = getAuth();
               const provider = new GoogleAuthProvider();

               const result = await signInWithPopup(auth, provider);
               const user = result.user;

               const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    avatar: user.photoURL,
                    googleId: user.uid,
               };

               await authService.googleSignUp(userInfo);

               toast({
                    title: `${user.displayName || user.email} - Автентифікація через Google успішна 🎉`,
                    description: 'Ви успішно увійшли за допомогою облікового запису Google.',
               });

               router.push('/');

          } catch (err) {
               throw err;
          } finally {
               isLoading.value = false;
          };
     };

</script>

<template>
     <div :class="cn('grid gap-6', $attrs.class ?? '')">
          <form @submit.prevent="onSubmit">
               <div class="grid gap-2">
                    <div class="grid gap-1">
                         <Label class="sr-only" for="email">
                              Email
                         </Label>
                         <Input
                              v-model="name"
                              id="name"
                              placeholder="Ваше ім'я"
                              type="text"
                              auto-capitalize="none"
                              autocomplete="given-name"
                              auto-correct="off"
                              :disabled="isLoading"
                         />
                         <Input
                              v-model="email"
                              id="email"
                              placeholder="Ваша Ел.пошта"
                              type="email"
                              auto-capitalize="none"
                              auto-complete="email"
                              auto-correct="off"
                              :disabled="isLoading"
                         />
                         <Input
                              v-model="password"
                              id="password"
                              placeholder="Ваш пароль"
                              type="password"
                              auto-capitalize="none"
                              auto-correct="off"
                              :disabled="isLoading"
                         />
                    </div>


                    <Button type="submit" :disabled="isLoading">
                         <svg viewBox="0 0 24 24" width="1.2em" height="1.2em" v-if="isLoading" class="mr-2 h-4 w-4 animate-spin">
                              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                         </svg>

                         Увійдіть за допомогою ел.пошти
                    </Button>
               </div>
          </form>

          <div class="relative">
               <div class="absolute inset-0 flex items-center">
                    <span class="w-full border-t" />
               </div>
               <div class="relative flex justify-center text-xs uppercase">
                    <span class="bg-background px-2 text-muted-foreground">
                         АБО ПРОДОВЖИТИ З
                    </span>
               </div>
          </div>
          
          <Button variant="outline" type="button" :disabled="isLoading" @click="onSubmitGoogle">
               <svg viewBox="0 0 24 24" width="1.2em" height="1.2em" v-if="isLoading" class="mr-2 h-4 w-4 animate-spin">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 1 1-6.219-8.56"></path>
               </svg>

               <img class="w-4 h-4 mr-2" width="16" height="16" src="/svg/google.svg" v-else>
               
               Google
          </Button>
     </div>
</template>