interface Post {
  id: number;
  title: string;
}

interface PostsResponse {
  posts: Post[];
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://dummyjson.com/posts?limit=3");

  if (!res.ok) {
    throw new Error("Request failed: " + res.status);
  }

  const data: PostsResponse = await res.json();
  return data.posts;
}

async function main(): Promise<void> {
  try {
    const posts = await getPosts();
    console.log(posts.length);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

main();