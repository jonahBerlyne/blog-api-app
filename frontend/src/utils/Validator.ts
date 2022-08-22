import { BlogInt, UserRegisterInt } from "./tsDefs";

export const validRegister = (userRegister: UserRegisterInt) => {

 const { name, account, password, confirmPassword } = userRegister;

 let errors: string[] = [];

 if (!name) errors.push("Please add your name" );
 else if (name.length > 20) errors.push("Your name can only be 20 characters max");

 if (!account) errors.push("Please add your email or phone number");
 else if (!validPhone(account) && !validEmail(account)) errors.push("Please enter a valid email or phone number");

 const msg = checkPassword(password, confirmPassword);

 if (msg) errors.push(msg);

 return {
  errMsg: errors,
  errLength: errors.length
 };
}

export function validPhone(phone: string) {
  const regExp = /^[+]/g;
  return regExp.test(phone);
}

export function validEmail(email: string) {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(String(email).toLowerCase());
}

export const checkPassword = (password: string, confirmPassword: string) => {
 if (password.length < 5) return ("Password must be at least 5 characters");

 if (password !== confirmPassword) return ("Password fields do not match");
}

export const validCreateBlog = ({ title, content, description, thumbnail, category }: BlogInt) => {
  let err: string[] = [];

  if (title.trim().length < 10) {
    err.push("Title has at least 10 characters");
  } else if (title.trim().length > 50) {
    err.push("Title has at most 50 characters");
  }

  if (content.trim().length < 2000) {
    err.push("Content has at least 2000 characters");
  }

  if (description.trim().length < 50) {
    err.push("Description has at least 50 characters");
  } else if (title.trim().length > 200) {
    err.push("Description has at most 200 characters");
  }

  if (!thumbnail) {
    err.push("Thumbnail can't be left empty");
  }

  if (!category) {
    err.push("Category can't be left empty");
  }

  return {
    errMsg: err,
    errLength: err.length
  };
}