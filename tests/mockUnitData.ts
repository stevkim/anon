export const shortReports = ["test", "one", "", "aaa", " ".repeat(50)];

export const longReports = [
  "test".repeat(20),
  "one".repeat(20),
  "a".repeat(51),
];

export const validReports = [
  "Testing a successful report",
  "Another success",
  "Last test",
];

export const mockBadEmail = [
  { email: "test.com@", password: "testing" },
  { email: "test@", password: "testing" },
  { email: "test.com", password: "testing" },
  { email: "test", password: "testing" },
];

export const mockBadPassword = [
  { email: "test@email.com", password: "test" },
  { email: "test@email.com", password: "short" },
  { email: "test@email.com", password: "" },
];

export const mockLoginData = [
  { email: "test@email.com", password: "testing" },
  { email: "test@email.com", password: "validpassword123" },
];

export const mockBadSignup = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const mockValidSignup = {
  firstName: "Unit",
  lastName: "Tester",
  email: "test@email.com",
  password: "testingpassword",
  confirmPassword: "testingpassword",
};

export const mockBadContent = {
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
  ],
};

export const mockBadContentLength = {
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
          text: "Testing",
        },
      ],
    },
  ],
};

export const mockValidContent = {
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
          text: "Testing",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "A different type",
        },
      ],
    },
  ],
};
