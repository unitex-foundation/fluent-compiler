// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) fluent-compiler contributors
// Licensed under the MIT License

import ftl from '@fluent/dedent';
import { defineMessage as dm } from 'src/define_message';
import type { FluentMessageList } from 'src/fluent_message_list';

export const exampleMessages = Object.freeze({
  // Hello World
  // https://projectfluent.org/fluent/guide/hello.html#hello-world
  'hello': 'Hello World!',
  // Placeables
  // https://projectfluent.org/fluent/guide/placeables.html#placeables
  // $title (String) - The title of the bookmark to remove.
  'remove-bookmark': 'Are you sure you want to remove {$title}?',
  // Using a term here indicates to tools and to the localization runtime
  // that -brand-name is not supposed to be used directly in the product
  // but rather should be referenced in other messages.
  '-brand-name': 'Firefox',
  'installing': 'Installing {-brand-name}.',
  // Special Characters
  // https://projectfluent.org/fluent/guide/special.html#special-characters
  // Quoted Text
  // https://projectfluent.org/fluent/guide/special.html#quoted-text
  'opening-brace': 'This message features an opening curly brace: {"{"}.',
  'closing-brace': 'This message features a closing curly brace: {"}"}.',
  'blank-is-removed': '    This message starts with no blanks.',
  'blank-is-preserved': '{"    "}This message starts with 4 spaces.',
  'leading-bracket': ftl`
    This message has an opening square bracket
    at the beginning of the third line:
    {"["}.
  `,
  'attribute-how-to': ftl`
    To add an attribute to this messages, write
    {".attr = Value"} on a new line.
  `,
  // Escape Sequences
  // https://projectfluent.org/fluent/guide/special.html#escape-sequences
  // This is OK, but cryptic and hard to read and edit.
  'literal-quote1': 'Text in {"\\""}double quotes{"\\""}.',
  // This is preferred. Just use the actual double quote character.
  'literal-quote2': 'Text in "double quotes".',
  'privacy-label': 'Privacy{"\\u00A0"}Policy',
  // The dash character is an EM DASH but depending on the font face,
  // it might look like an EN DASH.
  'which-dash1': "It's a dash—or is it?",
  // Using a Unicode escape sequence makes the intent clear.
  'which-dash2': 'It\'s a dash{"\\u2014"}or is it?',
  // This will work fine, but the codepoint can be considered
  // cryptic by other translators.
  'tears-of-joy1': '{"\\U01F602"}', // 😂
  // This is preferred. You can instantly see what the Unicode
  // character used here is.
  'tears-of-joy2': '\u{01F602}', // 😂
  // Multiline Text
  // https://projectfluent.org/fluent/guide/multiline.html#multiline-text
  'single': 'Text can be written in a single line.',
  'multi': ftl`
    Text can also span multiple lines as long as
    each new line is indented by at least one space.
    Because all lines in this message are indented
    by the same amount, all indentation will be
    removed from the final value.
  `,
  'indents': ftl`
    Indentation common to all indented lines is removed
    from the final text value.
      This line has 2 spaces in front of it.
  `,
  'leading-spaces': '    This message\'s value starts with the word "This".',
  'leading-lines': ftl`


    This message's value starts with the word "This".
    The blank lines under the identifier are ignored.
  `,
  'blank-lines': ftl`

    The blank line above this line is ignored.
    This is a second line of the value.

    The blank line above this line is preserved.
  `,
  'multiline1': ftl`
    This message has 4 spaces of indent
        on the second line of its value.
  `,
  'multiline5': `This message ends up having no indent
        on the second line of its value.
  `,
  // Variables
  // https://projectfluent.org/fluent/guide/variables.html#variables
  'welcome': 'Welcome, {$user}!',
  'unread-emails': '{$user} has {$email-count} unread emails.',
  // Implicit Formatting
  // https://projectfluent.org/fluent/guide/variables.html#implicit-formatting
  // $duration (Number) - The duration in seconds.
  'time-elapsed': 'Time elapsed: {$duration}s.',
  // Explicit Formatting
  // https://projectfluent.org/fluent/guide/variables.html#explicit-formatting
  // $duration (Number) - The duration in seconds.
  'time-elapsed1':
    'Time elapsed: {NUMBER($duration, maximumFractionDigits: 0)}s.',
  'time-elapsed1-compiled': dm('Time elapsed: {$duration:number}s.', {
    $duration: {
      params: {
        maximumFractionDigits: 0,
      },
    },
  }),
  // Message References
  // https://projectfluent.org/fluent/guide/references.html#message-references
  'menu-save': 'Save',
  'help-menu-save': 'Click {menu-save} to save the file.',
  // Selectors
  // https://projectfluent.org/fluent/guide/selectors.html#selectors
  'emails': ftl`
    {$unreadEmails ->
        [one] You have one unread email.
       *[other] You have {$unreadEmails} unread emails.
    }
  `,
  'emails-compiled': dm('{$unreadEmails:plural}', {
    $unreadEmails: {
      variants: {
        other: 'You have {$} unread emails.', // default
        one: 'You have one unread email.',
      },
      defaultVariant: 'other',
    },
  }),
  'your-score': ftl`
    {NUMBER($score, minimumFractionDigits: 1) ->
        [0.0]   You scored zero points. What happened?
       *[other] You scored {NUMBER($score, minimumFractionDigits: 1)} points.
    }
  `,
  'your-score-compiled': dm('{$score:number}', {
    $score: {
      params: {
        minimumFractionDigits: 1,
      },
      variants: {
        0.0: 'You scored zero points. What happened?',
        other: 'You scored {$} points',
      },
      defaultVariant: 'other',
    },
  }),
  'your-rank': ftl`
    {NUMBER($pos, type: "ordinal") ->
        [1] You finished first!
        [one] You finished {$pos}st
        [two] You finished {$pos}nd
        [few] You finished {$pos}rd
       *[other] You finished {$pos}th
    }
  `,
  'your-rank-compiled': dm('{$pos:number}', {
    $pos: {
      params: {
        type: 'cardinal',
      },
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
  // Attributes
  // https://projectfluent.org/fluent/guide/attributes.html#attributes
  'login-input': `Predefined value
    .placeholder = email@example.com
    .aria-label = Login input value
    .title = Type your login email
  `,
  // TODO: support attributes
  // 'login-input-compiled': dm('Predefined value', {
  //   attributes: {
  //     'placeholder': 'email@example.com',
  //     'aria-label': 'Login input value',
  //     'title': 'Type your login email',
  //   },
  // }),
  // Parameterized Terms
  // https://projectfluent.org/fluent/guide/terms.html#parameterized-terms
  '-https': 'https://{$host}',
  'visit': 'Visit {-https(host: "example.com")} for more information.',
  // TODO: add support
  // 'visit-compiled': dm('Visit {-https} for more information.', {
  //   https: {
  //     host: 'example.com',
  //  },
  //}),
  '-brand-name2': ftl`
    {$case ->
       *[nominative] Firefox
        [locative] Firefoksie
    }
  `,
  '-brand-name2-compiled': dm('{$case:enum}', {
    $case: {
      variants: {
        nominative: 'Файрфокс',
        locative: 'Файрфоксе',
      },
    },
  }),
  // "About Firefox."
  'about': 'Информация о {-brand-name2(case: "locative")}.',
  // Terms and Attributes
  // https://projectfluent.org/fluent/guide/terms.html#terms-and-attributes
  '-brand-name3': `Aurora
    .gender = feminine
  `,
  // TODO: support attributes
  // '-brand-name3-compiled': dm('Aurora', {
  //   attributes: {
  //     gender: 'feminine',
  //   },
  // }),
  'update-successful': ftl`
    {-brand-name.gender ->
        [masculine] {-brand-name} успешно обновлён.
        [feminine] {-brand-name} успешно обновлена.
       *[other] Программа {-brand-name} успешно обновлена.
    }
  `,
  'update-successful-compiled': dm('{-brand-name.gender:enum}', {
    '-brand-name.gender': {
      variants: {
        masculine: '{$} успешно обновлён.',
        feminine: '{$} успешно обновлена.',
        other: 'Программа {$} успешно обновлена.',
      },
      defaultVariant: 'other',
    },
  }),
} as const satisfies FluentMessageList);
