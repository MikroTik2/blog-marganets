<template>
     <div class="border-b">
          <div class="flex h-16 items-center justify-between">
               <MainNav class="mx-6 hidden sm:flex"/>

               <Sheet>
                    <SheetTrigger as-child class="block ml-6 cursor-pointer sm:hidden">
                         <svg viewBox="0 0 15 15" width="1.2em" height="1.2em" class="h-5 w-5">
                              <path fill="currentColor" fill-rule="evenodd" d="M8 2h5.5a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H8zM7 2H1.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5H7zm-7 .5A1.5 1.5 0 0 1 1.5 1h12A1.5 1.5 0 0 1 15 2.5v10a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 0 12.5z" clip-rule="evenodd"></path>
                         </svg>
                    </SheetTrigger>
                    
                    <SheetContent class="overflow-auto">

                         <SheetHeader>
                              <a href="/" class="mb-5 w-fit">
                                   <img class="rounded-lg" src="/img/branding-school.png" alt="branding-logo">
                              </a>
                         </SheetHeader>
                         <Accordion type="single" collapsible>
                              <AccordionItem value="item-1">
                                   <AccordionTrigger>Головна сторінка</AccordionTrigger>
                                   <AccordionContent>
                                        <ul class="grid gap-3">
                                             <a v-for="component in homeItem" :key="component.title" :href="component.href" class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                  <div class="text-sm font-medium leading-none">{{ component.title }}</div>
                                                  <p class="line-clamp-2 text-sm mt-[5px]  leading-snug text-muted-foreground">{{ component.description }}</p>
                                             </a>
                                        </ul>
                                   </AccordionContent>
                              </AccordionItem>

                              <AccordionItem value="item-2">
                                   <AccordionTrigger>Діяльність</AccordionTrigger>
                                   <AccordionContent>
                                        <ul class="grid gap-3">
                                             <a v-for="component in activityItem" :key="component.title" :href="component.href" class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                  <div class="text-sm font-medium leading-none">{{ component.title }}</div>
                                                  <p class="line-clamp-2 text-sm mt-[5px]  leading-snug text-muted-foreground">{{ component.description }}</p>
                                             </a>
                                        </ul>
                                   </AccordionContent>
                              </AccordionItem>
                         </Accordion>

                         <button type="button" class="w-full text-start">
                              <a class="py-4 block border-b font-medium hover:underline" href="/contacts">Контакти</a>
                         </button>
                         <button type="button" class="w-full text-start">
                              <a class="py-4 block border-b font-medium hover:underline" href="/category/news">Новини</a>
                         </button>
                    </SheetContent>
               </Sheet>

               <div class="ml-auto flex items-center mr-6 space-x-4">
                    <UserNav />
               </div>


          </div>
     </div>
</template>

<script setup lang="ts">
     import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
     import {
          Sheet,
          SheetContent,
          SheetHeader,
          SheetTrigger,
     } from '@/components/ui/sheet'

     import MainNav from '@/components/MainNav.vue';
     import UserNav from '@/components/UserNav.vue';

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