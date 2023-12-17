import { useContext } from "react";
import { SnackbarContext } from "@contexts/snackbar.context";

const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};

export default useSnackbar;