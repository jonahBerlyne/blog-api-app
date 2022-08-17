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

export interface UserInt extends UserLoginInt {
 avatar: string;
 createdAt: string;
 name: string;
 role: string;
 type: string;
 updatedAt: string;
 _id: string;
}

export interface AlertInt {
 loading?: boolean;
 success?: string | string[],
 errors?: string | string[]
}