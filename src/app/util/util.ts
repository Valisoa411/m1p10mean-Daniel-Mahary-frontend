import { NgForm } from "@angular/forms";

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

export const isFormValid = (form: NgForm, requiredInput: string[], inputErrors: any) : void => {
  requiredInput.forEach(key => {
    if (!form.value[key] || (typeof form.value[key] === "string" && form.value[key] === "")) {
      inputErrors[key] = `Le champ ${key} est requis`;
    } else {
      inputErrors[key] = null;
    }
  })
}

export const formatNumber = (num: number) => {
  const quant = typeof num === 'string' ? parseFloat(num) : num;
  const nombre = quant.toLocaleString('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
  });
  // console.log("formatNumber: ", nombre);
  return nombre
}

export const formatDate = (inputDate: any) => {
  if (!inputDate) return '';
  const date = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
  };

  return new Intl.DateTimeFormat('fr-FR', options).format(date);
};

export const formatSimpleDate = (inputDate: any) => {
  if (!inputDate) return '';
  const date = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
  };

  return new Intl.DateTimeFormat('fr-FR', options).format(date);
};
