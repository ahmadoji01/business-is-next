interface Avatar {
	id: string,
	filename_download: string,
}

export interface User {
	id: string,
	first_name: string,
	last_name: string,
	avatar: Avatar|null,
	email: string,
	username: string,
	password: string,
	role_name: string,
}

export interface UserRole {
	id: string,
	name: string,
}

export const defaultUser:User = {
    id: "",
	first_name: "",
	last_name: "",
	avatar: null,
	email: "",
	username: "",
	password: "",
	role_name: "",
}

export const defaultRole:UserRole = {
	id: "",
	name: "",
}

export function userMapper(res:Record<string,any>) {
    let user = defaultUser;
    user = { 
        id: res.id, 
        first_name: res.first_name, 
        last_name: res.last_name, 
        avatar: res.avatar? res.avatar : null,
        username: res.username? res.username : '',
		email: res.email,
		password: "",
        role_name: res.role? res.role.name : "",
    }
    return user;
}

export function roleMapper(res:Record<string,any>) {
	let role = defaultRole;
	role = {
		id: res.id,
		name: res.name,
	}
	return role;
}

export type UserCreator = Omit<User, 'id'|'role_name'> & { role:string, organization:number }
export function userCreatorMapper(user:User, role: string, orgID:number) {
	let userCreator:UserCreator = {
		first_name: user.first_name, 
        last_name: user.last_name, 
        avatar: user.avatar? user.avatar : null,
        username: user.username,
		email: user.email,
		password: user.password,
        role: role,
		organization: orgID,
	}
	return userCreator;
}