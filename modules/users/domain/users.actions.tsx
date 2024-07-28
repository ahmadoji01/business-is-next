import { directusClient } from "@/utils/request-handler";
import { aggregate, createUser, readItems, readMe, readRoles, readUser, readUsers, updateMe, uploadFiles, withToken } from "@directus/sdk";
import { UserCreator } from "./user";
import { LIMIT_PER_PAGE } from "@/constants/request";

export const signIn = (email:string, password:string) => directusClient.login(email, password);
export const getUserMe = (token:string, fields?:string[]) => directusClient.request( withToken(token, readMe({ fields: fields? fields : ['*.*'] })) );
export const uploadAvatar = (token:string, data:FormData) => directusClient.request(withToken(token, uploadFiles(data)));
export const updateUserMe = (token:string, data:object) => directusClient.request( withToken(token, updateMe(data)));
export const getAllUsers = (token:string, page:number) => directusClient.request( withToken(token, readUsers({ fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const getAllRoles = (token:string) => directusClient.request( withToken(token, readRoles({ fields: ['*.*'] })) );
export const createAUser = (user:UserCreator) => directusClient.request( createUser({ first_name: user.first_name, last_name: user.last_name, email: user.email, password: user.password, role: user.role, organization: user.organization }) )