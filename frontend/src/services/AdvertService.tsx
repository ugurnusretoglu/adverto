import type { ApiResponse, advertSummaryType, vehicleType, houseType, landType } from "../types/Types";
import axios from "../config/AxiosConfig";
import type { AxiosResponse } from "axios";

class AdvertService {

    getAllAdverts(): Promise<ApiResponse<advertSummaryType[]>> {
        return new Promise((resolve, reject) => {
            axios.get("/rest/api/advert/list")
                .then((response: AxiosResponse<any>) => resolve(response.data))
                .catch((error: any) => reject(error));
        });
    }

    getVehicleById(id: number): Promise<ApiResponse<vehicleType>> {
        return new Promise((resolve, reject) => {
            axios.get(`/rest/api/vehicle/${id}`)
                .then((response: AxiosResponse<any>) => resolve(response.data))
                .catch((error: any) => reject(error));
        });
    }

    getHouseById(id: number): Promise<ApiResponse<houseType>> {
        return new Promise((resolve, reject) => {
            axios.get(`/rest/api/house/${id}`)
                .then((response: AxiosResponse<any>) => resolve(response.data))
                .catch((error: any) => reject(error));
        });
    }

    getLandById(id: number): Promise<ApiResponse<landType>> {
        return new Promise((resolve, reject) => {
            axios.get(`/rest/api/land/${id}`)
                .then((response: AxiosResponse<any>) => resolve(response.data))
                .catch((error: any) => reject(error));
        });
    }
}

export default new AdvertService();