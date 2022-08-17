import { ChangeEvent, FormEvent } from "react";

export type InputChange = ChangeEvent<HTMLInputElement>;

export type FormSubmit = FormEvent<HTMLFormElement>;

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