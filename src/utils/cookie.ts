export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  return cookie ? cookie.split('=')[1] : null;
};

export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; path=/; max-age=0;`;
};
