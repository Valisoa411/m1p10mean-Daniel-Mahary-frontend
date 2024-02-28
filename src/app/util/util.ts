import { NgForm } from "@angular/forms";

const TOKEN_KEY = 'token';

export const getHeaders = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    'Authorization': `${token}`
  }
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
