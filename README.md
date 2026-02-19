# Fluent Compiler

Compiler from TypeScript to Fluent Translation List (FTL)

# Usage

Example how to use localization in your project:

1. Replace base message list types by declaring a module which
   will override internal empty `FluentLocalizationBase` interface:
   ```ts
   declare module 'fluent-compiler/dist/fluent_localization_base' {
     interface FluentLocalizationBase {
       messageList: typeof YourFluentMessageList;
     }
   }
   ```
1. Implement the `t` functions:
   ```ts
   export function t<
     K extends FluentBaseMessageKeyWitoutVariables
   >(key: K): string;
   export function t<
     K extends FluentBaseMessageKeyWithVariables,
     A extends FluentBaseMessageArgsAtKey<K>,
   >(key: K, args: A): string;
   export function t<
     K extends FluentBaseMessageKey,
     A extends FluentBaseMessageArgsAtKey<K>,
   >(key: K, args?: A): string {
     return ...
   }
   ```

# Third-Party Licenses

[Read Here](/third_party_licenses.md)

# Contributors

[Read Here](/CONTRIBUTORS.md)

# Copyrights

- Copyright (c) 2025 Grigorii Lutkov \<friend.lga@gmail.com\>
- Copyright (c) [Fluent Compiler Contributors](/CONTRIBUTORS.md)

# License

Licensed under the [MIT License](/LICENSE.md)

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
