import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import { AxiosError } from "axios";
import axios from "axios";
import { AuthResponse } from "../models/response/Auth-Response";
import { API_URL } from "../http";

export default class Store {
    user = {} as IUser
    isAuth = false;
    isLoading = false;

    constructor(){
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login (email: string, password: string){
        try{
            const response = await AuthService.login(email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch(e){
            let errorMessage = "Failed to do something exceptional";
            if (e instanceof Error) {
                if (e instanceof AxiosError) {
              errorMessage = e.response?.data?.message;
                }
            }
            console.log(errorMessage);
        }
    }

    async registration (email: string, password: string){
        try{
            const response = await AuthService.registration(email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch(e){
            let errorMessage = "Failed to do something exceptional";
            if (e instanceof Error) {
                if (e instanceof AxiosError) {
              errorMessage = e.response?.data?.message;
                }
            }
            console.log(errorMessage);
        }
    }

    async logout (){
        try{
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch(e){
            let errorMessage = "Failed to do something exceptional";
            if (e instanceof Error) {
                if (e instanceof AxiosError) {
              errorMessage = e.response?.data?.message;
                }
            }
            console.log(errorMessage);
        }
    }
    async checkAuth (){
        this.setLoading(true);
        try{
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch(e){
            let errorMessage = "Failed to do something exceptional";
            if (e instanceof Error) {
                if (e instanceof AxiosError) {
              errorMessage = e.response?.data?.message;
                }
            }
            console.log(errorMessage);
        }finally{
            this.setLoading(false);
        }
    }
}