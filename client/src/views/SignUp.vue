<template>
     <div class="min-h-screen">
          <div class="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
               <Button as-child class="absolute font-medium text-sm right-8 top-8" variant="ghost">
                    <router-link to="/login">Увійти</router-link>
               </Button>
               
               <div class="hidden h-full bg-muted lg:block">
                    <router-link to="/">
                         <img class="absolute rounded-lg font-medium text-sm left-8 top-8" width="40" height="40" loading="lazy" src="/img/branding-school.png" alt="logo">
                    </router-link>
               </div>

               <div class="lg:p-8">
                    <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                         <div class="flex flex-col space-y-2 text-center">
                              <h1 class="text-2xl font-semibold tracking-tighter">Створити аккаунт</h1>

                              <p class="text-sm text-muted-foreground">Введіть свою електронну адресу нижче, щоб створити обліковий запис</p>
                         </div>

                         <SignUpAuthForm />
                    </div>
               </div>
          </div>
     </div>
</template>

<script setup lang="ts">
     import { Button } from '@/components/ui/button';
     import SignUpAuthForm from '@/components/SignUpAuthForm.vue';

</script>