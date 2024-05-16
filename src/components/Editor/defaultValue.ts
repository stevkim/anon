const defaultValue = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 1,
      },
      content: [
        {
          type: "text",
          text: "Writing on ",
        },
        {
          type: "text",
          marks: [
            {
              type: "italic",
            },
          ],
          text: "anon",
        },
        {
          type: "text",
          text: "...",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "underline",
            },
          ],
          text: "Rules to Contribute",
        },
      ],
    },
    {
      type: "orderedList",
      attrs: {
        tight: true,
        start: 1,
      },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "italic",
                    },
                  ],
                  text: "Respect",
                },
                {
                  type: "text",
                  text: ": Be kind and refrain from offensive language",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "italic",
                    },
                  ],
                  text: "Original Content",
                },
                {
                  type: "text",
                  text: ": Share your own writing; no plagiarism",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "italic",
                    },
                  ],
                  text: "Stay Appropriate",
                },
                {
                  type: "text",
                  text: ": Follow legal and community standards",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "italic",
                    },
                  ],
                  text: "No Spamming",
                },
                {
                  type: "text",
                  text: ": Keep posts relevant and avoid self-promotion",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "italic",
                    },
                  ],
                  text: "Honor Copyrights",
                },
                {
                  type: "text",
                  text: ": Respect others' creative work",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "italic",
                    },
                  ],
                  text: "Embrace Anonymity",
                },
                {
                  type: "text",
                  text: ": No names, no identities, ever",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "italic",
                    },
                  ],
                  text: "Enjoy Sharing",
                },
                {
                  type: "text",
                  text: ": Inspire and be inspired by the community!",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default defaultValue;
