import type { AxiosResponse } from "axios";
import axios from "../config/AxiosConfig";
import type { authenticateResponse, loginType, logoutType } from "../types/Types";

class AuthenticationService {

    login(currentUser: loginType): Promise<authenticateResponse> {
        return new Promise((resolve: any, reject: any) => {
            axios.post("/authenticate", currentUser)
                .then((response: AxiosResponse<any, any>) => resolve(response.data))
                .catch((error: any) => reject(error));
        })
    }

    logout(payload: logoutType): Promise<void> {
        return new Promise((resolve: any, reject: any) => {
            axios.post("/logout", payload)
                .then((response: AxiosResponse<any, any>) => resolve(response.data))
                .catch((error: any) => reject(error));
        })
    }

    refreshToken(payload: logoutType): Promise<authenticateResponse> {
        return new Promise((resolve: any, reject: any) => {
            axios.post("/refreshToken", payload)
                .then((response: AxiosResponse<any, any>) => resolve(response.data))
                .catch((error: any) => reject(error));
        })
    }
}

export default new AuthenticationService();