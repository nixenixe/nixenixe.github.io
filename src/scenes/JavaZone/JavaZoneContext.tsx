import { createContext, useState, useEffect, useContext } from "react";
import { getFavorites, removeFavorite, saveFavorite } from "./utils";
import { UserContext } from "@/types";
import { toaster, Toaster } from "@/components/ui/toaster";

interface JavaZoneContextType {
    favorites: string[];
    toggleFavorite: (sessionId: string) => Promise<"SUCCESS" | "ERROR">;
    isFavorite: (sessionId: string) => boolean;
}

export const JavaZoneContext = createContext<JavaZoneContextType>({
    favorites: [] as string[],
    toggleFavorite: (_: string) => Promise.resolve("ERROR"),
    isFavorite: (_: string) => false
});

export const JavaZoneContextProvider = ({ children }: { children: React.ReactNode }) => {
    const userContext = useContext(UserContext);
    const isLoggedIn = Boolean(userContext && userContext.user && userContext.user !== "ERROR");
    const [favorites, setFavorites] = useState<string[]>([]);

    const toggleFavorite = async (sessionId: string): Promise<"SUCCESS" | "ERROR"> => {
        if (isFavorite(sessionId)) {
            const result = await removeFavorite(sessionId, isLoggedIn);
            if (result === "SUCCESS") {
                setFavorites(favorites.filter(fav => fav !== sessionId));
            } else {
                toaster.create({
                    description: "Couldn't remove favorite",
                    type: "error",
                    closable: true,
                });
            }
            return result;
        } else {
            const result = await saveFavorite(sessionId, isLoggedIn);
            if (result === "SUCCESS") {
                setFavorites([...favorites, sessionId]);
            } else {
                toaster.create({
                    description: "Couldn't save favorite",
                    type: "error",
                    closable: true,
                });
            }
            return result;
        }
    };

    const isFavorite = (sessionId: string) => favorites.includes(sessionId);

    useEffect(() => {
        (async () => {
            const result = await getFavorites(isLoggedIn);
            if (result !== "ERROR") {
                setFavorites(result);
            } else {
                toaster.create({
                    description: "Failed to load favorites",
                    type: "error",
                    closable: true,
                });
            }
        })();
    }, [isLoggedIn]);

    return (
        <JavaZoneContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            <Toaster />
            {children}
        </JavaZoneContext.Provider>
    );
};
