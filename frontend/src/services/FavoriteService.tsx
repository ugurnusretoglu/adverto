import type { ApiResponse, advertSummaryType } from "../types/Types";
import axios from "../config/AxiosConfig";
import type { AxiosResponse } from "axios";

class FavoriteService {

    addFavorite(advertId: number): Promise<ApiResponse<void>> {
        return new Promise((resolve, reject) => {
            axios.post(`/rest/api/favorite/${advertId}`)
                .then((response: AxiosResponse<any>) => resolve(response.data))
                .catch((error: any) => reject(error));
        });
    }

    removeFavorite(advertId: number): Promise<ApiResponse<void>> {
        return new Promise((resolve, reject) => {
            axios.delete(`/rest/api/favorite/${advertId}`)
                .then((response: AxiosResponse<any>) => resolve(response.data))
                .catch((error: any) => reject(error));
        });
    }

    getFavorites(): Promise<ApiResponse<advertSummaryType[]>> {
        return new Promise((resolve, reject) => {
            axios.get("/rest/api/favorite")
                .then((response: AxiosResponse<any>) => resolve(response.data))
                .catch((error: any) => reject(error));
        });
    }
}

export default new FavoriteService();