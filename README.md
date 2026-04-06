# UNITEX Fluent Compiler

Compiler from TypeScript to Fluent Translation List (FTL)

# Usage

1. Define your message lists in default locale:

   ```ts
   import {
     type FluentMessageList,
     defineFluentMessage as dm,
     defineFluentMessageListWithPrefix,
   } from '@unitex/fluent-compiler';

   // Message list can be a simple dictionary of strings

   const messagesEn = {
     hello: 'Hello World!',
     welcome: 'Welcome, {$user}!',
     unreadEmails: dm('{$unreadEmails:plural}', {
       $unreadEmails: {
         variants: {
           other: 'You have {$} unread emails.', // default
           one: 'You have one unread email.',
         },
       },
     }),
   } as const satisfies FluentMessageList;

   // Or can have a prefix to make navigation easier

   const exampleNamespace = 'example_';
   const namespacedMessagesEn = defineFluentMessageListWithPrefix(
     {
       'hello': 'Hello Namespace!',
       '-brand-name': 'My Brand',
       'welcome': `Welcome to {${exampleNamespace}-brand-name}.`,
       'your-rank': dm('{$pos:number}', {
         $pos: {
           params: { type: 'cardinal' },
           variants: {
             1: 'You finished first!',
             one: 'You finished {$}st',
             two: 'You finished {$}nd',
             few: 'You finished {$}rd',
             other: 'You finished {$}th',
           },
           defaultVariant: 'other',
         },
       }),
     } as const satisfies FluentMessageList,
     exampleNamespace,
   );
   ```

1. Define message lists in the translation locale:

   ```ts
   import type { FluentMessageListBasedOn } from '@unitex/fluent-compiler';

   const messagesRu = castToReadonly({
     hello: 'Привет мир!',
     welcome: 'Добро пожаловать, {$user}!',
     unreadEmails: dm('{$unreadEmails:plural}', {
       $unreadEmails: {
         variants: {
           other: 'У вас {$} непрочитанных сообщений.', // default
           one: 'У вас одно непрочитанное сообщение.',
         },
       },
     }),
   } as const satisfies FluentMessageListBasedOn<typeof messagesEn>);
   ```

1. To enable autocompletion you need to provide a message schema by redeclaring
   `FluentSchema` interface with your defined message lists
   (only in default locale):

   ```ts
   declare module '@unitex/fluent-compiler/fluent_schema' {
     type CustomMessages = typeof messagesEn & typeof namespacedMessagesEn;
     interface FluentSchema extends CustomMessages {}
   }
   ```

1. Compile message lists into `.ftl` translation files:

   ```ts
   import { compile } from '@unitex/fluent-compiler';

   const compiledMessagesEn = compile(messagesEn);
   fs.writeFileSync('locales/en/messages.ftl', compiledMessagesEn);
   ```

1. Use `FluentReader` to get translated messages
   (it provides simple barebone functionality):

   ```ts
   // in the Node environment
   import { FluentReaderBack } from '@unitex/fluent-compiler/back/fluent_reader_back';

   // or in the Browser environment
   import { FluentReaderFront } from '@unitex/fluent-compiler/front/fluent_reader_front';

   const reader = new FluentReaderBack({
     currentLocaleCode: 'en-GB',
     defaultLocaleCode: 'en-GB',
     fallbackLocaleCodes: ['en-US']
     supportedLocaleCodes: new Set(['en-GB', 'en-US', 'ru']),
     translations: new Map([
       ['en-GB', ['locales/en-GB/messages.ftl', 'locales/en-GB/namespaced_messages.ftl']],
       ['en-US', ['locales/en-US/messages.ftl', 'locales/en-US/namespaced_messages.ftl']],
       ['ru',    ['locales/ru/messages.ftl',    'locales/ru/namespaced_messages.ftl']],
     ]),
   });

   reader.getLocalizedString('welcome', { user: 'John Smith' });

   reader.setCurrentLocaleCode('ru');
   reader.setFallbackLocaleCodes(undefined);

   reader.getLocalizedString('welcome', { user: 'Иван Кузнецов' });
   ```

1. Optional: write your own `t` function inspired by `FluentReader`. See implementation in the [`src/fluent_reader.ts`](src/fluent_reader.ts) file

1. Optional: take a look at more example messages at [`resources/example_messages.ts`](resources/example_messages.ts) file

1. Optional: learn more about [`Project Fluent`](projectfluent.org)

# Code of Conduct

[Read Here](./docs/CODE_OF_CONDUCT.md)

# Contributing

[Read Here](./CONTRIBUTING.md)

# Contributors

[Read Here](./CONTRIBUTORS.md)

# Maintainers

[Read Here](./MAINTAINERS.md)

# Credits

Inspired by WebDevSimplified
[`intl-crash-course`](github.com/WebDevSimplified/intl-crash-course)

# Copyright

[Read Here](./COPYRIGHT.md)

# Third-Party Licenses

[Read Here](./third_party_licenses.md)

# License

[Read Here](./LICENSE.md)

# Copying

[Read Here](./COPYING.md)

<!----------------------------------------------------------------------------->

<!-- <style>
p:has(+ ul),
p:has(+ ol) {
  margin-bottom: 0;
}
p + ul,
p + ol {
  margin-top: 0;
}
ul,
ol {
  list-style-position: inside;
}
ul:not(ul ul):not(ol ul),
ol:not(ol ol):not(ul ol) {
  padding-left: 0;
}
ul ul,
ul ol,
ol ol,
ol ul {
  margin: 0;
  padding-left: 1.5rem;
}
</style> -->
