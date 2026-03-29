# UNITEX Fluent Compiler

Compiler from TypeScript to Fluent Translation List (FTL)

# Usage

Example how to use localization in your project:

1. Replace base message list types by declaring a module which
   will override internal empty `FluentSchema` interface:
   ```ts
   declare module '@unitex/fluent-compiler/dist/fluent_schema' {
     interface FluentSchema {
       messageList: typeof YOUR_FLUENT_MESSAGE_LIST;
     }
   }
   ```
1. Implement the `t` functions:

   ```ts
   const localeCodes = ['en', 'ru'];
   const translationLists = localeCodes.map((localeCode) =>
     fs.readFileSync(`/path/to/${localeCode}_translations.ftl`, 'utf8'),
   );
   const resources = translationLists.map(
     (translations) => new FluentResource(translations),
   );
   const [enBundle, ruBundle] = resources.map((resource) => {
     const bundle = new FluentBundle(locale);
     bundle.addResource(resource);
   });
   const bundles = {
     en: enBundle,
     ru: ruBundle,
   };

   export function t<K extends FluentSchemaKeyWitoutVariables>(key: K): string;
   export function t<
     K extends FluentSchemaKeyWithVariables,
     A extends FluentSchemaArgsAtKey<K>,
   >(key: K, args: A): string;
   export function t<
     K extends FluentSchemaKey,
     A extends FluentSchemaArgsAtKey<K>,
   >(key: K, args?: A): string {
     const bundle = bundles[currentLocaleCode];
     const message = bundle.getMessage(key);
     return bundle.formatPattern(message.value, args);
   }
   ```

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
