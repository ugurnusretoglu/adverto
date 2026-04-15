import type { AxiosResponse } from "axios";
import axios from "../config/AxiosConfig";
import type { registerType } from "../types/Types";


class RegisterPageService {

    register(newUser: registerType): Promise<registerType> {
        return new Promise((resolve: any, reject: any) => {
            axios.post("/register", newUser)
                .then((response: AxiosResponse<any, any>) => resolve(response.data))
                .catch((error: any) => reject(error));
        })
    }
}

export default new RegisterPageService();