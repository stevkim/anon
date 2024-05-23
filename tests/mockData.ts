const contentOne = {
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
          text: "Mock Data",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This is a part of the mock data",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This is for testing only.",
        },
      ],
    },
  ],
};

const contentTwo = {
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
          text: "Mock Data 2",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Second dataset for mock - testing only.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This is for testing only.",
        },
      ],
    },
  ],
};

export const mockPostsData = {
  data: [
    {
      id: "test1",
      createdAt: "2024-05-03 22:38:42.36",
      content: contentOne,
      likes: 10,
      reports: 2,
      authorId: "tester",
    },
    {
      id: "test2",
      createdAt: "2024-05-03 22:40:42.36",
      content: contentTwo,
      likes: 0,
      reports: 0,
      authorId: "tester",
    },
  ],
};

// {
//    id: string,
//    createdAt: Date,
//    content: JsonValue(object),
//    likes: number,
//    reports: number,
//    authorId: string,
//    liked?: string | null,
//    saved?: string | null
// }[]
