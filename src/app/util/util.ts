const TOKEN_KEY = 'token';

export const getHeaders = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    'Authorization': `${token}`
  }
}

export const addDuree=(date: Date, dureeEnMinutes: number): Date =>{
  const result = new Date(date);
  result.setMinutes(result.getMinutes() + dureeEnMinutes);
  return result;
}
