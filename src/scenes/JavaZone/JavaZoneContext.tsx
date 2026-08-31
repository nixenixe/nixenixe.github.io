import { createContext, useState, useEffect } from "react";
import { getFavorites, removeFavorite, saveFavorite } from "./utils";

interface JavaZoneContextType {
    favorites: string[];
    toggleFavorite: (sessionId: string) => void;
    isFavorite: (sessionId: string) => boolean;
}

export const JavaZoneContext = createContext<JavaZoneContextType>({
    favorites: [] as string[],
    toggleFavorite: (sessionId: string) => { },
    isFavorite: (sessionId: string) => false
});

export const JavaZoneContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [favorites, setFavorites] = useState<string[]>([]);

    const toggleFavorite = (sessionId: string) => {
        if (isFavorite(sessionId)) {
            removeFavorite(sessionId);
        } else {
            saveFavorite(sessionId);
        }
        setFavorites(getFavorites());
    };

    const isFavorite = (sessionId: string) => favorites.includes(sessionId);

    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    return (
        <JavaZoneContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </JavaZoneContext.Provider>
    );
};
