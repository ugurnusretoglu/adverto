import type { ApiResponse, houseType, houseTypeIU, landType, landTypeIU } from "../types/Types";
import axios from "../config/AxiosConfig";
import type { AxiosResponse } from "axios";

class EstateService {

    saveHouse(houseData: houseTypeIU, images: File[]): Promise<ApiResponse<houseType>> {
        const formData = new FormData();
        formData.append("house", new Blob([JSON.stringify(houseData)], {
            type: "application/json"
        }));
        images.forEach(image => formData.append("images", image));

        return new Promise((resolve, reject) => {
            axios.post("/rest/api/house/save", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
                .then((response: AxiosResponse<any>) => resolve(response.data))
                .catch((error: any) => reject(error));
        });
    }

    saveLand(landData: landTypeIU, images: File[]): Promise<ApiResponse<landType>> {
        const formData = new FormData();
        formData.append("land", new Blob([JSON.stringify(landData)], {
            type: "application/json"
        }));
        images.forEach(image => formData.append("images", image));

        return new Promise((resolve, reject) => {
            axios.post("/rest/api/land/save", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
                .then((response: AxiosResponse<any>) => resolve(response.data))
                .catch((error: any) => reject(error));
        });
    }
}

export default new EstateService();