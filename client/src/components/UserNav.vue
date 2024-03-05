<template>
  <DropdownMenu v-if="hidden()">
    <DropdownMenuTrigger>
      <Button variant="ghost" class="relative h-8 w-8 rounded-full">
        <Avatar class="h-8 w-8">
          <AvatarImage :src="avatar" alt="avatar" />
          <AvatarFallback>{{ getShortName() }}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
   
    <DropdownMenuContent class="w-56" align="end">
        <DropdownMenuLabel class="font-normal flex">
          <div class="flex flex-col space-y-1">
            <p class="text-sm font-medium leading-none">{{ name }}</p>
            <p class="text-sm leading-none text-muted-foreground">{{ email }}</p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
    
        <DropdownMenuGroup>
          <DropdownMenuItem @click="pushProfile">Профіль</DropdownMenuItem>
          <DropdownMenuItem @click="pushCreateBlog">Створити блог</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
   
      <DropdownMenuItem @click="logoutUser">Вийти</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
   
  <Button @click="pushLogin" v-else>
    Увійти
  </Button>
</template>
   

<script setup lang="ts">
    import { ref, onMounted } from 'vue';  
    import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
    import { Button } from '@/components/ui/button';
    import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
    import { useRouter } from 'vue-router';
    import { useToast } from '@/components/ui/toast/use-toast'

    const { toast } = useToast();

    import userService from '@/services/userService';
    import authService from '@/services/authService';

    const router = useRouter(); 

    const name = ref('');
    const email = ref('');
    const role = ref('');
    const avatar = ref<string>('');

    const pushLogin = () => {
        router.push({ name: "SignIn" });
    };

    const pushProfile = () => {
        router.push({ name: "Profile" });
    };

    const pushCreateBlog = () => {
      const admin = role.value;
      
      if (admin !== 'admin') {

        toast({
          title: "На жаль, ви не адміністратор",
          description: "Напишіть нам у службу підтримки для отримання доступу до створення блогу",
        });

      } else {

        router.push('/add/blog');

      };
    }

    const hidden = (): boolean => {
      const authValue = localStorage.getItem("auth");
      return authValue === "true" || authValue === null;
    };

    const logoutUser = async () => {
      try {
        await authService.signOut();
        
        toast({
          title: "Выход",
          duration: 500,
          description: "Вы успешно вышли из своего профиля.",
        });
        
        router.push({ name: "Index" });
        
        setTimeout(() => {
          window.location.reload();
        }, 2000);

      } catch (error) {
        toast({
          title: "Ошибка",
          duration: 500,
          description: "Произошла ошибка при выходе. Пожалуйста, повторите попытку.",
        });

      };
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
        const response = await userService.getMeAccount();
        
        email.value = response.user.email;
        name.value = response.user.name
        avatar.value = response!.user?.avatar?.url ?? '';
        role.value = response.user.role;

    });

</script>