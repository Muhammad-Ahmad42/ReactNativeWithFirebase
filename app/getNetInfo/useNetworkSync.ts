import NetInfo from "@react-native-community/netinfo";
import { useEffect } from "react";
import useOfflineStore from "../store/useOfflineStore";
import addToFirebase from "../utils/firebaseHelper";

export const useNetworkSync = () => {
    const { pending, removePending } = useOfflineStore();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            if (state.isConnected) {
                pending.forEach(async (item) => {
                    try {
                        addToFirebase(item.payload);
                        removePending(item.id);
                        console.log(item.id, " has been Synced with database")
                    }
                    catch (error) {
                        console.log("Not able to sync with database ", error);
                    }
                })
            }
            else {
                alert("You are currently offline");
            }
        });

        return () => unsubscribe();
    }, [pending, removePending]);
};
export default useNetworkSync;