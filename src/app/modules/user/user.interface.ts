type TUserProfile = {
    bio?: string;
    age: number;
    location?: string;
    profilePhoto?:string;
    profileDescription?:string;

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
    location?: string;
    age: number;
    profilePhoto?:string;
    profileDescription?:string;

}
