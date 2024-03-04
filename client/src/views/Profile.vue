<template>
     <main class="flex-1 container flex justify-center items-center">
          <Tabs default-value="account" class="w-[400px]">
               <TabsList class="grid w-full grid-cols-2">
                    <TabsTrigger value="account">
                         Обліковий запис
                    </TabsTrigger>
                    <TabsTrigger value="password">
                         Пароль
                    </TabsTrigger>
               </TabsList>
               <TabsContent value="account">
                    <Card>
                         <CardHeader class="flex gap-4 flex-row">
                              
                              <div>
                                   <Avatar class="cursor-pointer" @click="handleAvatarClick">
                                        <AvatarImage :src="avatar" v-if="avatar"/>
                                        <AvatarImage :src="avatarImage" v-else/>
                                        <AvatarFallback>{{ getShortName() }}</AvatarFallback>
                                   </Avatar>


                                   <input type="file" required style="display: none;" id="avatarInput" @change="handleFileChange" />
                              </div>

                              <div>
                                   <CardTitle>Обліковий запис</CardTitle>
                                   <CardDescription>
                                        Внесіть зміни до свого облікового запису тут. Натисніть «Зберегти», коли закінчите.
                                   </CardDescription>
                              </div>
                         </CardHeader>
                         <CardContent class="space-y-2">
                              <div class="space-y-1">
                                   <Label for="name">Ім'я</Label>
                                   <Input v-model.trim="name" id="name" required/>
                              </div>
                         </CardContent>

                         <CardFooter>
                              <Button @click="updateUser">Зберегти зміни</Button>
                         </CardFooter>
                    </Card>
               </TabsContent>

               <TabsContent value="password">
                    <Card>
                         <CardHeader>
                              <CardTitle>Пароль</CardTitle>
                              <CardDescription>
                                   Змініть пароль тут. Після збереження ви вийдете з системи.
                              </CardDescription>
                         </CardHeader>
                         <CardContent class="space-y-2">
                              <div class="space-y-1">
                                   <Label for="current">Cтарий пароль</Label>
                                   <Input v-model.trim="oldPassword" id="current" type="password" />
                              </div>
                              <div class="space-y-1">
                                   <Label for="new">Новий пароль</Label>
                                   <Input v-model.trim="newPassword" id="new" type="password" />
                              </div>
                         </CardContent>
                         <CardFooter>
                              <Button @click="updatePassword">Зберегти зміни</Button>
                         </CardFooter>
                    </Card>
               </TabsContent>
          </Tabs>
     </main>
</template>

<script setup lang="ts">
     import { ref, onMounted } from 'vue';
     import { useToast } from '@/components/ui/toast/use-toast'
     import { Button } from '@/components/ui/button'
     import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
     import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
     import { Input } from '@/components/ui/input'
     import { Label } from '@/components/ui/label'
     import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
     import userService from '@/services/userService';

     const { toast } = useToast();

     const userInfo = ref<UserInfo | null>();
          const avatarImage = ref<string>('');
     const avatar = ref('');
     const name = ref('');

     const oldPassword = ref('');
     const newPassword = ref('');

     interface UserInfo {
          user: {
               name: string;
               avatar: {
                    public_id: string;
                    url: string;
               };
          };
     };

     const handleAvatarClick = () => {
          const input = document.getElementById('avatarInput');
          input?.click();
     };

     const handleFileChange = (event: Event) => {
          const target = event.target as HTMLInputElement;
          const file = target.files?.[0];

          if (file) {
               const reader = new FileReader();
               reader.onload = () => {
               avatar.value = reader.result as string;
               };

               reader.readAsDataURL(file);
          } else {
               console.warn('No file selected');
          };
     };

     const updateUser = async () => {
          const newAvatar = avatar.value !== '' ? avatar.value : avatarImage.value;

          if (newAvatar !== '') {
               await userService.updateUser(name.value, newAvatar as string);

               toast({
                    title: `🎉 Профіль оновлено!`,
                    description: "Ваші зміни успішно збережено. Тепер ваш профіль актуальний.",
               });

               setTimeout(() => {
                    window.location.reload();
               }, 2000);
          } else {
               toast({
                    title: `⚠️ Виберіть аватарку!`,
                    description: "Ви не вибрали нову аватарку для оновлення профілю.",
               });
          };
     };

     const updatePassword = async () => {
          
          try {

               const user = {
                    oldPassword: oldPassword.value,
                    newPassword: newPassword.value,
               };

               await userService.updatePassword(user);

               toast({
                    title: "Пароль успішно оновлено",
                    description: "Ваш пароль було успішно змінено.",
               })

          } catch (err: any) {

               toast({
                    title: "Помилка при оновленні пароля",
                    description: err.response.data.message
               })

          } finally {

          }
     };

     const getShortName = () => {
        let fullName = localStorage.getItem("name");
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
          userInfo.value = await userService.getMeAccount();
          avatarImage.value = userInfo.value!.user?.avatar?.url!;
          name.value = userInfo.value?.user.name as string;
     });
</script>