import { ChangeEvent, FormEvent } from "react";
import { rootReducer } from "../redux/reducers/rootReducer";

export type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

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

export interface BlogInt {
 _id?: string;
 user: string | UserInt;
 title: string;
 content: string;
 description: string;
 thumbnail: string | File;
 category: string;
 createdAt: string;
}

export interface CommentInt {
 _id?: string;
 user: UserInt;
 blog_id: string;
 blog_user_id: string;
 content: string;
 reply_comment: CommentInt[];
 reply_user?: UserInt;
 comment_root?: string;
 createdAt: string;
}