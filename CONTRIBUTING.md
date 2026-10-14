# Contributing

Thank you for your interest in contributing to this project!

This document explains the terms and conditions for making a contribution.

## Definitions

For the purposes of this document:

- **"Project Owner"**: Grigorii Andreevich Lutkov (DOB: September 18, 1990) and any entities controlled by Grigorii Andreevich Lutkov, as well as any Maintainers, successors, assignees, licensees and recipients of the Project.
- **"Project"**: this and other versions of the project, as well as other derivative work including, but not limited to, copies, forks, mirrors, compiled/built/bundled/packaged/archived software and subprojects separated or created in the course of development under open-source or any other license.
- **"Submit"**: transfer of a Contribution via any form of electronic, verbal, or written communication between Contributor and Project Owner or its representatives, including, but not limited to, communication on source code control systems, issue/task tracking systems, electronic mailing lists, forums and chats.
- **"Contribution"**: any text, code, commits, merge requests, pull requests, patches, files, documentation, additions, modifications, or other work intentionally Submitted to the Project for inclusion.
- **"You" or "Contributor"**: any individual or entity that is Submitting a Contribution to the Project personally or on behalf of an employer or another third-party, or by using assisting tools, including, but not limited to, AI assistance.
- **"Maintainer"**: any individual or entity responsible for providing maintenance work to the Project, including, but not limited to, reviewing, merging and managing Contributions, as well as the authority to accept, reject and modify Contributions, enforce contribution rules and apply licenses.
- **CLA**: Contributor License Agreement.

## Summary

By Submitting a Contribution, You agree to the terms and conditions described in this document, including the CLA, Code of Conduct, signing commits, attributing AI-generated content, using header notice and being added into contributors list.

## Contributor License Agreement (CLA)

All Contributors must agree to the "Contributor License Agreement" located in the file:

- [`contributor_license_agreement.md`](./docs/legal/contributor_license_agreement)

By Submitting a Contribution to the Project, You confirm that You have read, understand, accept, agree and comply to the terms and conditions of the CLA.

You must not Submit Contributions that include content You do not have the legal right to use and distribute.

You must not Submit Contributions under incompatible licenses.

## Code of Conduct

By participating in this project, you agree to abide by our "Code of Conduct" located in the file:

- [`CODE_OF_CONDUCT.md`](./docs/CODE_OF_CONDUCT.md).

## Signing Commits

Each commit must include a `Signed-off-by` tag with the Contributor's name and email address.

You can add this automatically by using:

```
git commit -s
```

Example commit message:

```
feat: new great feature description

Signed-off-by: John Smit <john.smith@example.com>
```

## AI-Generated Content

If any AI tools have been used to generate all or part of a Contribution, each commit containing such changes should include an `Assisted-by` tag in the following format:

```
Assisted-by: LLM (version), LLM (version), tool (version), tool (version)
```

Where:

- `version` - version of used LLM / tool, including model name if available.
- `tool` - optional specialized analysis tools used (tools for pattern matching and text transformation, etc.).\
  Basic development tools (git, package managers, editors, etc.) should not be listed.

Example:

```
Assisted-by: LLM (model-1.0.0), tool (1.0.0)
```

If the exact model version is unknown, provide the most accurate description available.

## File Header Notice

If You add new files, each file must include special header notice comment at the very top with the following information:

1. Project License in "SPDX-License-Identifier" format:
   ```
   SPDX-License-Identifier: MIT
   ```
2. If you are making Contribution as an individual:
   ```
   Copyright (c) <current year> <Your name> <Your email address>
   ```
   Example in the TypeScript file:
   ```ts
   // Copyright (c) 2023 John Smit <john.smith@example.com>
   ```
3. Or if you are making Contribution on behalf of your employer:
   ```
   Author: <Your name> <Your email address>
   Copyright (c) <current year> <Your employer name> <Your employer web address>
   ```
   Example in the TypeScript file:
   ```ts
   // Author: John Smit <john.smith@example.com>
   // Copyright (c) 2023 Example LLC <example.com>
   ```
4. Project contributors copyright:
   ```
   Copyright (c) UNITEX Fluent Compiler Contributors
   ```
5. Instructions and details:
   ```
   See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details
   ```

Example of the full header notice in the TypeScript file:

```ts
// SPDX-License-Identifier: MIT
// Copyright (c) 2023 John Smit <john.smith@example.com>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details
```

File Header Notices can later be modified by another Contributor or Maintainer.

## Contributors List

By making a Contribution You become a Contributor to the Project and must be added to the contributors list, located in the file:

- [`CONTRIBUTORS.md`](./CONTRIBUTORS.md)

If You Submit a Contribution on behalf of your employer, its public information must also be added into the list.

If You Submit a Contribution that was fully or partially generated by AI tools, this information must also be added into the list.
