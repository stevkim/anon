<h1 align='center'>Anon</h1>

## Table of Contents
<details>
   <summary>Table of Contents</summary>
   <ol>
      <li>
         <a href='#about'>about</a>
      </li>
      <li>
         <a href='#tech'>tech stack</a>
      </li>
      <li>
         <a href='#features'>features</a>
      </li>
      <li>
         <a href='#endpoints'>endpoint design</a>
      </li>
   </ol>
</details>


## About
<div id='about'></div>
Anon is a platform designed for anonymous sharing of literature. It allows users to share their work without revealing their identity, creating a safe and open environment for writers to express themselves freely.

Anon is a platform that provides features similar to those of social media platforms. It allows its users to like, save, and share posts, just like they can on other social media platforms.

## Tech Stack
<div id='tech'></div>

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Context-API](https://img.shields.io/badge/Context--Api-000000?style=for-the-badge&logo=react)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Other tech
- <a href='https://lucide.dev/' target='_blank' >Lucide</a> for icons
- <a href='https://tiptap.dev/' target='_blank'>Tiptap</a> & <a href='https://novel.sh/' target='_blank'>Novel</a> for Notion-style WYSIWYG text editor and content display
- <a href='https://ui.shadcn.com/' target='_blank'>Shadcn</a> as a component library and theme creator
   - Shadcn uses <a href='https://react-hook-form.com/' target='_blank'>React-hook-form</a> and <a href='https://www.radix-ui.com/' target='_blank'>Radix-UI</a> under the hood
- <a href='https://tanstack.com/' target='_blank'>Tanstack</a> for React-Query (infinite query)

## Features
<div id='features'></div>
TODO

## Endpoint Design
<div id='endpoints'></div>

### Legend
- Types of endpoints: <a href='#'><img align='center' src='https://img.shields.io/badge/GET-green' alt='GET request badge'/></a>
                      <a href='#'><img align='center' src='https://img.shields.io/badge/POST-blue' alt='POST request badge'/></a>
                      <a href='#'><img align='center' src='https://img.shields.io/badge/DEL-red' alt='DEL request badge'/></a>
- <a href='#'><img align='center' src='https://img.shields.io/badge/Liked-orange'/></a> - flag for post if the user has liked this post
- <a href='#'><img align='center' src='https://img.shields.io/badge/Saved-purple'/></a> - flag for post if the user has saved this post
- <a href='#'><img align='center' src='https://img.shields.io/badge/Author-teal'/></a> - authorId is set to 'author' if the user is the author

### Endpoints

<details>
   <summary>
      <a href='#'><img align='center' src='https://img.shields.io/badge/GET-green' alt='GET request badge'/></a>
      - <code>/api/auth/callback</code>
   </summary>
   <p>
      Callback endpoint to authenticate user from an external provider (Google OAuth) <br/>
      Redirects the user to <code>/</code>
   </p>
</details>

<details>
   <summary>
      <a href='#'><img align='center' src='https://img.shields.io/badge/GET-green' alt='GET request badge'/></a>
      - <code>/api/post?page={page}</code>
   </summary>
   <br/>
   <code>params: { page: number }</code>
   <p>
      Returns the page of posts, each page is limited to 50 posts <br/>
      Page is defaulted to 0 if param doesn't exist <br/>
      <a href='#'><img align='center' src='https://img.shields.io/badge/Liked-orange'/></a>
      <a href='#'><img align='center' src='https://img.shields.io/badge/Saved-purple'/></a>
      <a href='#'><img align='center' src='https://img.shields.io/badge/Author-teal'/></a>
      <br/>
      Return data:
   
      {
         id: string,
         createdAt: Date,
         content: JsonValue(object),
         likes: number,
         reports: number,
         authorId: string,
         liked?: string | null,
         saved?: string | null
      }[]
   </p>
</details>

--- Below endpoints are only accessible to authenticated users --- Request will error if authenticated user does not exist ---

<details>
   <summary>/api/post</summary>
   <details>
   <summary>
      <a href='#'><img align='center' src='https://img.shields.io/badge/POST-blue' alt='POST request badge'/></a>
      - <code>/api/post</code>
   </summary>
   <p>
      Creates a post <br/>
      Req.body:
      
      {
         content: JsonValue(object)
      }
      
      # JsonValue is the content value derived from tiptap/novel.sh - expected format: { type: 'doc', content: [] }

   The other fields are defaulted by the database.
   </p>
   </details>
   
   <details>
      <summary>
         <a href='#'><img align='center' src='https://img.shields.io/badge/DEL-red' alt='DEL request badge'/></a>
         - <code>/api/post?id={postId}</code>
      </summary>
      <br/>
      <code>params: { id: string }</code>
      <p>
         Deletes a post, must be the author of the post to delete. <br/>
         Params must contain the id of the post to delete, the author and params is validated on the client-side.
      </p>
   </details>
</details>

<details>
   <summary>/api/post/like</summary>
   <details>
   <summary>
      <a href='#'><img align='center' src='https://img.shields.io/badge/POST-blue' alt='POST request badge'/></a>
      - <code>/api/post/like/[id]</code>
   </summary>
   <p>
      Creates a like record and increments the <i>likes</i> field for post with <strong>postId</strong>
      <br/>
      Return data:

      {
         id: string,
         userId: string,
         postId: string,
         createdAt: Date
      }
      
      # will revalidatePath('/', 'layout') to refetch on next reload
   </p>
   </details>
   
   <details>
   <summary>
      <a href='#'><img align='center' src='https://img.shields.io/badge/DEL-red' alt='DEL request badge'/></a>
      - <code>/api/post/like/[id]?record={recordId}</code>
   </summary>
   <br/>
   <code>params: { record: string }</code>
   <p>
      Deletes the record of the like and decrements the <i>likes</i> field for post with <strong>postId</strong>

      # recordId is the id of the record when a user 'likes' a post
         
   </p>
   </details>
</details>

<details>
   <summary>/api/post/report</summary>
   <details>
   <summary>
      <a href='#'><img align='center' src='https://img.shields.io/badge/POST-blue' alt='POST request badge'/></a>
      - <code>/api/post/report/[id]</code>
   </summary>
   <p>
      Creates a record of a report for a post <br/>
      Req.body:

      {
         reason: string
      }
      
      # Reports are unique, a user may only report a unique post once. @@unique [userId, postId]
      # will revalidatePath('/', 'layout') to refetch on next reload
      
   </p>
   </details>
</details>

<details>
   <summary>/api/user</summary>
   <details>
   <summary>
      <a href='#'><img align='center' src='https://img.shields.io/badge/GET-green' alt='GET request badge'/></a>
      - <code>/api/user?page={page}</code>
   </summary>
   <br/>
   <code>params: { page: number }</code>
   <p>
      Returns the page of posts that the user has created, each page is limited to 50 posts <br/>
      Page is defaulted to 0 if param doesn't exist <br/>
      <a href='#'><img align='center' src='https://img.shields.io/badge/Liked-orange'/></a>
      <a href='#'><img align='center' src='https://img.shields.io/badge/Saved-purple'/></a>
      <a href='#'><img align='center' src='https://img.shields.io/badge/Author-teal'/></a>
      <br/>
      Return data:
   
      {
         id: string,
         createdAt: Date,
         content: JsonValue(object),
         likes: number,
         reports: number,
         authorId: 'author',
         liked?: string | null,
         saved?: string | null
      }[] 
      # authorId is defaulted here to 'author' because all posts are expected to be the user's
   </p>
   </details>
</details>

<details>
   <summary>/api/user/saved</summary>
   <details>
   <summary>
      <a href='#'><img align='center' src='https://img.shields.io/badge/GET-green' alt='GET request badge'/></a>
      - <code>/api/user/saved?page={page}</code>
   </summary>
   <br/>
   <code>params: { page: number }</code>
    <p>
      Returns the page of posts that the user has saved, each page is limited to 50 posts <br/>
      Page is defaulted to 0 if param doesn't exist <br/>
      <a href='#'><img align='center' src='https://img.shields.io/badge/Liked-orange'/></a>
      <a href='#'><img align='center' src='https://img.shields.io/badge/Saved-purple'/></a>
      <a href='#'><img align='center' src='https://img.shields.io/badge/Author-teal'/></a>
      <br/>
      Return data:
   
      {
         id: string,
         createdAt: Date,
         content: JsonValue(object),
         likes: number,
         reports: number,
         authorId: string,
         liked?: string | null,
         saved?: string | null
      }[]         
   </p>
   </details>
   <details>
   <summary>
      <a href='#'><img align='center' src='https://img.shields.io/badge/POST-blue' alt='POST request badge'/></a>
      - <code>/api/user/saved/[id]</code>
   </summary>
   <p>
      Creates a record for a saved post <br/>
      Return data: 

      {
         id: string,
         userId: string,
         postId: string,
         createdAt: Date
      }
      # saved records are unique, a user may only save a post once. @@unique [userId, postId]
   </p>
   </details>
   <details>
   <summary>
      <a href='#'><img align='center' src='https://img.shields.io/badge/DEL-red' alt='DEL request badge'/></a>
      - <code>/api/user/saved/[id]?record={recordId}</code>
   </summary> 
   <br/>
   <code>params: { record: string }</code>
   <p>
      Deletes the record of the saved post

      # recordId is the id of the record when a user 'saves' a post
   </p>
   </details>
</details>
