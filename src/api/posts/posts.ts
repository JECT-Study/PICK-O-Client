import { CreatePost, Post, VoteInfo } from '../../types/post';

const URL = process.env.API_URL;

export const fetchPostsData = async (): Promise<Post[]> => {
  const response = await fetch(`${URL}/posts`);
  const result = (await response.json()) as Post[];
  return result;
};

export const fetchVoteCount = async (postId: number): Promise<VoteInfo[]> => {
  const response = await fetch(`${URL}/post/${postId}/vote`);
  const result = (await response.json()) as VoteInfo[];
  return result;
};

export const fetchPost = async (postForm: CreatePost) => {
  const response = await fetch(`${URL}/posts`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(postForm),
  });

  return response.status;
};

export const fetchPostById = async (postId: number): Promise<Post> => {
  const response = await fetch(`${URL}/posts/${postId}`);
  const result = (await response.json()) as Post;
  return result;
};

export const fetchAddLike = async (postId: number) => {
  const response = await fetch(`${URL}/posts/${postId}/likes`, {
    method: 'POST',
    credentials: 'include',
  });

  return response.body;
};

export const fetchDeleteLike = async (postId: number) => {
  const response = await fetch(`${URL}/posts/${postId}/likes`, {
    method: 'DELETE',
    credentials: 'include',
  });

  return response.body;
};