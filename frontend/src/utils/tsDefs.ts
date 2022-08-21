import { ChangeEvent, FormEvent } from "react";
import { rootReducer } from "../redux/reducers/rootReducer";

export type InputChange = ChangeEvent<HTMLInputElement>;

export type FormSubmit = FormEvent<HTMLFormElement>;

export type RootStore = ReturnType<typeof rootReducer>;

export interface ParamsInt {
 page?: string;
 slug?: string;
}

export interface UserLoginInt {
 account: string;
 password: string;
}

export interface UserRegisterInt extends UserLoginInt {
 name: string;
 confirmPassword: string;
}

export interface UserInt extends UserLoginInt {
 avatar: string;
 createdAt: string;
 name: string;
 role: string;
 type: string;
 updatedAt: string;
 _id: string;
}

export interface UserProfileInt extends UserRegisterInt {
 avatar: any;
}

export interface AlertInt {
 loading?: boolean;
 success?: string | string[],
 errors?: string | string[]
}

export interface CategoryInt {
 name: string;
 createdAt: string;
 updatedAt: string;
 _id: string;
}