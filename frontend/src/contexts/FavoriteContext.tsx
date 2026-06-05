import { createContext, useContext, useEffect, useState } from "react";
import FavoriteService from "../services/FavoriteService";

interface FavoriteContextType {
    favoriteCount: number;
    favoriteIds: Set<number>;
    addFavorite: (advertId: number) => Promise<void>;
    removeFavorite: (advertId: number) => Promise<void>;
    clearFavorites: () => void;
    loadFavorites: () => Promise<void>;
}

const FavoriteContext = createContext<FavoriteContextType | null>(null);

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
    const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());

    const loadFavorites = async () => {
        try {
            const response = await FavoriteService.getFavorites();
            setFavoriteIds(new Set(response.payload.map((f) => f.id)));
        } catch {
            setFavoriteIds(new Set());
        }
    };

    const clearFavorites = () => {
        setFavoriteIds(new Set());
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            loadFavorites();
        }
    }, []);

    const addFavorite = async (advertId: number) => {
        await FavoriteService.addFavorite(advertId);
        setFavoriteIds((prev) => new Set(prev).add(advertId));
    };

    const removeFavorite = async (advertId: number) => {
        await FavoriteService.removeFavorite(advertId);
        setFavoriteIds((prev) => {
            const next = new Set(prev);
            next.delete(advertId);
            return next;
        });
    };

    return (
        <FavoriteContext.Provider value={{
            favoriteCount: favoriteIds.size,
            favoriteIds,
            addFavorite,
            removeFavorite,
            clearFavorites,
            loadFavorites,
        }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorite = () => {
    const context = useContext(FavoriteContext);
    if (!context) throw new Error("useFavorite must be used within FavoriteProvider");
    return context;
};