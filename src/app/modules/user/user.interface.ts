type TUserProfile = {
    bio?: string;
    age: number;
}

export type TUser = {
    name: string;
    email: string;
    password: string;
    profile: TUserProfile;
}

export type TUpdateUser={
    name:string,
    email:string,
    bio?: string;
    age: number;
}
