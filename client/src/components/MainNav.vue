<script setup lang="ts">
     import {
          NavigationMenu,
          NavigationMenuContent,
          NavigationMenuItem,
          NavigationMenuList,
          NavigationMenuTrigger,
     } from '@/components/ui/navigation-menu'
     import { cn } from '@/lib/utils';

     const links = [
          { href: "/category/news", text: "Новини" },
          { href: "/contacts", text: "Контакти" },
     ];

     const activityItem: { title: string; href: string; description: string }[] = [
          {
               title: 'Томаківська Січ',
               href: '/docs/primitives/alert-dialog',
               description: 'звіт за 2022-2023 н.р. про роботу Рою Всеукраїнської дитячо-юнацької військово-патріотичної гри «Сокіл» («Джура»)',
          },
          {
               title: 'eTwinning ',
               href: '/docs/primitives/hover-card',
               description: 'Блог учителя англійської мови/координатора міжнародних проєктів Яни Цикункової Марганецького ліцею № 10" Марганецької міської ради Нікопольського району Дніпропетровської області. jana1325@gmail.com',
          },
          {
               title: 'Healthy schools',
               href: '/docs/primitives/progress',
               description: '«Healthy Schools: заради здорових і радісних школярів»',
          },
          {
               title: 'STEM- секрет успіху',
               href: '/docs/primitives/scroll-area',
               description: 'На проведення дослідно-експериментольной роботи за темою «Розроблення та впровадження навчального-метидичного забеспечення STEAM-освіти',
          },
          {
               title: 'Zero waste school',
               href: '/docs/primitives/tabs',
               description: 'Проект Zero Waste School, який навчить школярів та вчителів через неформальне навчання впровадити культуру сортування відходів у своїй школі, громаді, а згодом і  у світі. ',
          },
          {
               title: '«Сокіл» («Джура»)',
               href: '/docs/primitives/tooltip',
               description: 'Всеукраїнська дитячо-юнацька військово-патріотична гра «Сокіл» («Джура»).',
          },
     ];

     const homeItem: { title: string; href: string; description: string }[] = [
          {
               title: 'Про Марганецький ліцей № 10',
               href: '/history-lichey',
               description: '1976 рік… У мальовничому мікрорайоні міста серед багатоповерхівок «виросла» новобудова',
          },
          {
               title: 'Академічна доброчесність',
               href: '/docs/primitives/hover-card',
               description: 'держава забезпечує доступність і безоплатність дошкільної, повної загальної середньої, професійно-технічної,',
          },
          {
               title: 'Внутрішня система забезпечення якості освіти',
               href: '/docs/primitives/progress',
               description:'Положення про внутрішню систему забезпечення якості освіти',
          },
          {
               title: 'Керівництво ліцею № 10',
               href: '/docs/primitives/scroll-area',
               description: 'В даному розділі наведено інформацію та матеріали, повязані з керівництвом ліцею № 10.',
          },
          {
               title: 'Сторінка Facebook',
               href: '/docs/primitives/tabs',
               description: 'Тут ми найбільше викладаємо наші фотографії',
          },
          {
               title: 'Впровадження Державного стандарту базової середньої освіти',
               href: '/docs/primitives/tooltip',
               description: 'Цей розділ присвячений впровадженню Державного стандарту базової середньої освіти.',
          },
     ];
</script>

<template>
     <nav :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')">
          <router-link to="/">
               <img class="rounded-[10px]" width="25" height="25" src="/img/branding-school.png" alt="logo">
          </router-link>
          <NavigationMenu>
               <NavigationMenuList>
                    <NavigationMenuItem>

                    <NavigationMenuTrigger>Головна сторінка</NavigationMenuTrigger>
                    <NavigationMenuContent>
                         <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                              <a v-for="component in homeItem" :key="component.title" :href="component.href" class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                   <div class="text-sm font-medium leading-none">{{ component.title }}</div>
                                   <p class="line-clamp-2 text-sm mt-[5px]  leading-snug text-muted-foreground">{{ component.description }}</p>
                              </a>
                         </ul>
                    </NavigationMenuContent>

                    </NavigationMenuItem>

                    <NavigationMenuItem>
                         <NavigationMenuTrigger>Діяльність</NavigationMenuTrigger>
                         <NavigationMenuContent>
                              <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                   <a v-for="component in activityItem" :key="component.title" :href="component.href" class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                        <div class="text-sm font-medium leading-none">{{ component.title }}</div>
                                        <p class="line-clamp-2 text-sm mt-[5px]  leading-snug text-muted-foreground">{{ component.description }}</p>
                                   </a>
                              </ul>
                         </NavigationMenuContent>
                    </NavigationMenuItem>

               </NavigationMenuList>
          </NavigationMenu>

          <router-link v-for="(link, index) in links" :key="index" :to="link.href" class="text-sm first:text-foreground font-medium text-muted-foreground transition-colors hover:text-primary">{{ link.text }}</router-link>

     </nav>
</template>