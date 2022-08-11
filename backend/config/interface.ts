export interface NewUserInt {
 name: string;
 account: string;
 password: string;
}

export interface DecodedTokenInt {
 newUser?: NewUserInt;
 iat: number;
 exp: number;
}