const TOKEN_KEY = 'token';

export const getHeaders = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    'Authorization': `${token}`
  }
}
