import type { ApiResponse, engineType, fuelConsumptionType, vehicleType, vehicleTypeIU } from "../types/Types";
import axios from "../config/AxiosConfig";
import type { AxiosResponse } from "axios";

class VehicleService {

    saveVehicle(vehicleData: vehicleTypeIU, images: File[]): Promise<ApiResponse<vehicleType>> {
        const formData = new FormData();
        formData.append("vehicle", new Blob([JSON.stringify(vehicleData)], {
            type: "application/json"
        }));
        images.forEach(image => formData.append("images", image));

        return new Promise((resolve, reject) => {
            axios.post("/rest/api/vehicle/save", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
                .then((response: AxiosResponse<any>) => resolve(response.data))
                .catch((error: any) => reject(error));
        });
    }

    saveEngine(vehicleId: number, payload: engineType): Promise<ApiResponse<vehicleType>> {
        return new Promise((resolve, reject) => {
            axios.post(`/rest/api/vehicle/${vehicleId}/engine`, payload)
                .then((response: AxiosResponse<any>) => resolve(response.data))
                .catch((error: any) => reject(error));
        });
    }

    saveFuelConsumption(vehicleId: number, payload: fuelConsumptionType): Promise<ApiResponse<vehicleType>> {
        return new Promise((resolve, reject) => {
            axios.post(`/rest/api/vehicle/${vehicleId}/fuel`, payload)
                .then((response: AxiosResponse<any>) => resolve(response.data))
                .catch((error: any) => reject(error));
        });
    }
}

export default new VehicleService();