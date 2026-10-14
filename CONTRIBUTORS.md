# Contributors

## Author

- **Grigorii Lutkov** (ru: Григорий Лутков)
- id: **grigorii-lutkov**, grigory-lutkov, grigori-lutkov, grigoriy-lutkov, glutkov, lutkov, friend-lga
- email: **grigorii@lutkov.dev**, grigorii.lutkov@unitex.foundation, grigorii.lutkov@trutex.ru, friend.lga@gmail.com
- social: [telegram](https://t.me/grigorii_lutkov), [discord](https://discordapp.com/users/grigorii_lutkov), [trulab](https://trulab.ru/grigorii-lutkov), [github](https://github.com/grigorii-lutkov), [gitlab](https://gitlab.com/grigorii-lutkov), [gitea](https://gitea.com/grigorii-lutkov), [gravatar](https://gravatar.com/grigoriilutkov)

## Individuals

- empty

## Companies

- empty

## Tools

- empty

<br/>
<br/>
<br/>

# Info

This is a partial list of people, companies and tools that have contributed to this project.\
It is sorted alphabetically by name.

If you are making a contribution, then:

1. add yourself
2. add your employer, if it holds a copyright to your contribution
3. add tools, if any have been used to generate all or part of your contribution
4. follow described format and order (see [Description](./##Description) below for details)

### As an Individual

```
- **Name in English**
- id: **unique-id**
- email: **main@email.address**
- web: [homepage](https://example.com)   // optional
- social: [network](https://example.com) // optional
```

### As a Company

```
- **Short Name in English** (Long Name in English)
- id: **unique-id**
- email: **main@email.address**
- web: [homepage](https://example.com)
- social: [network](https://example.com) // optional
- phone: +XXXXXXXXXXX                    // optional
- address: legal address                 // optional
- authors: list of author-ids (from individuals section)
```

### As a Tool

```
- **Tool Name in English**
- id: **unique-id**
- versions:
  - list of used tool versions
- web: [homepage](https://example.com) // optional
- users: list of user-ids (from individuals section)
```

## Description

### As an Individual

1. `Name`
   - **Required**
   - This is your name in English language
   - Font must be bold: `**Your Name**`
   - Optionally: you can add translations in the `()` separated by `,` following this pattern `locale: Your Name`, where:
     - [`locale`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument) - language code in the format `language[-script][-region]`\
       examples: `en`, `ru`, `en-US`, `en-GB`, `zh-Hans-CN`
     - `Your Name` - your name in the specified language
   - Format: `**Name** (locale: Name, ...)`
   - Example: `**John Smith** (ru: Иван Кузнецов)`
2. `id`
   - **Required at least one**
   - This is your unique identifier in the context of the current project
   - Font must be bold: `**your-id**` (for main id)
   - Pattern: `[a-z0-9-]` - only lowercase English letters, numbers and `-` are allowed, must not start or end with `-`\
     Separator `-` provides only visual hint and technically doesn't differ from the same id without separator, which means that `your-id` **==** `yourid`
   - Optionally: you can add a list of other id spellings and previously used ids, separated by `,`
   - Format: `id: **main-id**, other-id, ...`
   - Example: `id: **john-smith**, jsmith`
3. `email`
   - **Required at least one**
   - This is your email address
   - Font must be bold: `**email@example.com**` (for main address)
   - Must match your `git` email credentials, which means that `this email address` **==** `git config user.email` **==** `commit Signed-off-by tag`
   - If you have multiple email address which can be used to make a commit (for example home and work), than all of them must be specified, separated by `,`
   - Format: `email: **main@example.com**, other@example.com, ...`
   - Example: `email: **john.smith@example.com**, john.smith@work.example.com`
4. `web`
   - **Optional**
   - This is your personal web address
   - Must be written as Markdown link
   - Format: `web: [name](https://address)`, where:
     - `name` - only lowercase English letters, numbers and `-` are allowed
   - Example: `web: [homepage](https://example.com)`
5. `social`
   - **Optional**
   - List of your social links separated by `,`
   - Each address must be written as Markdown link
   - Format: `social: [name](https://address), ...`, where:
     - `name` - only lowercase English letters, numbers and `-` are allowed
   - Example: `social: [network1](https://example.com), [network2](https://example.com)`

### As a Company

1. `Name`
   - **Required**
   - This is a legal company name in English language
   - Must specify short name first and long name in `()`
   - Font must be bold: `**Short Name**` (for short name in English)
   - Optionally: you can add translations as nested list items following this pattern `locale: Short Name (Long Name)`, where:
     - [`locale`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument) - language code in the format `language[-script][-region]`\
       examples: `en`, `ru`, `en-US`, `en-GB`, `zh-Hans-CN`
     - `Short Name` - short company name in specified language
     - `Long Name` - long company name in specified language
   - Format:
     ```
     **Short Name** (Long Name)
     - locale: Short Name (Long Name)
     - locale: Short Name (Long Name)
     ```
   - Example:
     ```
     **Example LLC** (Example Limited Liability Company)
     - ru: ООО «Пример» (Общество с ограниченной ответственностью «Пример»)
     ```
2. `id`
   - **Required at least one**
   - This is company unique identifier in the context of the current project
   - Font must be bold: `**company-id**` (for main id)
   - Pattern: `[a-z0-9-]` - only lowercase English letters, numbers and `-` are allowed, must not start or end with `-`\
     Separator `-` provides only visual hint and technically doesn't differ from the same id without separator, which means that `company-id` **==** `companyid`
   - Optionally: you can add a list of other id spellings and previously used ids, separated by `,`
   - Format: `id: **main-id**, other-id, ...`
   - Example: `id: **example-llc**, example-com`
3. `email`
   - **Required at least one**
   - This is company email address
   - Font must be bold: `**email@example.com**` (for main address)
   - Optionally: you can add a list of other addresses separated by `,`
   - Format: `email: **main@example.com**, other@example.com, ...`
   - Example: `email: **contact@example.com**, bugreport@example.com`
4. `web`
   - **Required**
   - This is company web address
   - Must be written as Markdown link
   - Format: `web: [name](https://address)`, where:
     - `name` - only lowercase English letters, numbers and `-` are allowed
   - Example: `web: [homepage](https://example.com)`
5. `social`
   - **Optional**
   - List of company social links separated by `,`
   - Each address must be written as Markdown link
   - Format: `social: [name](https://address), ...`, where:
     - `name` - only lowercase English letters, numbers and `-` are allowed
   - Example: `social: [network1](https://example.com), [network2](https://example.com)`
6. `phone`
   - **Optional**
   - This is company phone number
   - Must start with `+` and contain only numbers
   - Optionally: you can add a list of other numbers separated by `,`
   - Format: `phone: +number, ...`
   - Example: `phone: +00000000000, +00000000000`
7. `address`
   - **Optional**
   - This is a legal company address
   - Format: `address: country, postcode, state, city, street, building, office`
   - If company has many addresses in different countries, than specify as a list:
     ```
     addresses:
     - country, postcode, state, city, street, building, office
     - country, postcode, state, city, street, building, office
     ```
8. `authors`
   - **Required at least one**
   - This is a list of authors, who has made a contribution on behalf of this company
   - Each author must be included in the `Individuals` section above and specified by `id`
   - Format: `authors: author1-id, ...`
   - Example: `authors: john-smith`

### As a Tool

1. `Name`
   - **Required**
   - This is the name of the tool in English language
   - Font must be bold: `**Tool Name**`
   - Format: `**Tool Name**`
   - Example: `**Example AI**`
2. `id`
   - **Required at least one**
   - This is unique identifier of the tool in the context of the current project
   - Font must be bold: `**tool-id**`
   - Pattern: `[a-z0-9-]` - only lowercase English letters, numbers and `-` are allowed, must not start or end with `-`\
     Separator `-` provides only visual hint and technically doesn't differ from the same id without separator, which means that `tool-id` **==** `toolid`
   - Optionally: you can add a list of other id spellings and previously used ids, separated by `,`
   - Format: `id: **tool-id**, other-id`
   - Example: `id: **example-ai**, example-gpt`
3. `versions`
   - **Required at least one**
   - Markdown list of used tool versions
   - If tool is an AI-generative tool, then version must include model name
   - Must be sorted alphabetically
   - Format:
     ```
     versions:
     - version1
     - version2
     ```
   - Example:
     ```
     versions:
     - Example LLM v1
     - Example LLM v2
     ```
4. `web`
   - **Optional**
   - This is the tool's web address
   - Must be written as Markdown link
   - Format: `web: [name](https://address)`, where:
     - `name` - only lowercase English letters, numbers and `-` are allowed
   - Example: `web: [homepage](https://example.com)`
5. `users`
   - **Required at least one**
   - This is a list of users, who has made a contribution fully or partially generated by this tool
   - Each user must be included in the `Individuals` section above and specified by `id`
   - Format: `users: user1-id, ...`
   - Example: `users: john-smith`

## Example

### As an Individual

- **John Smith** (ru: Иван Кузнецов)
- id: **john-smith**, jsmith
- email: **john.smith@example.com**
- web: [homepage](https://jsmith.example.com)
- social: [telegram](https://example.com), [discord](https://example.com), [github](https://example.com)

### As a Company

- **Example LLC** (Example Limited Liability Company)
  - ru: ООО «Пример» (Общество с ограниченной ответственностью «Пример»)
- id: **example-llc**
- email: **contact@example.com**
- web: [example.com](https://example.com)
- social: [telegram](https://example.com), [discord](https://example.com), [github](https://example.com)
- phone: +XXXXXXXXXXX
- address: country, postcode, state, city, street, building, office
- authors: john-smith

### As a Tool

- **Example AI**
- id: example-ai
- versions:
  - Example LLM v1
  - Example LLM v2
- web: [example.com](https://example.com)
- users: john-smith

This list may also be populated later automatically based on the accepted contributions.
