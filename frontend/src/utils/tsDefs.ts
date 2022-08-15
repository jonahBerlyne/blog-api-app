import { ChangeEvent } from "react";

export type InputChange = ChangeEvent<HTMLInputElement>;

export interface ParamsInt {
 page?: string;
 slug?: string;
}