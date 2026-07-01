// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const SAVE_PREFIXES = ["/user", "/mod", "/log", "/admin"];

// export const useSaveRoute = () => {
//     const location = useLocation();
//     useEffect(() => {
//         const shouldSave = SAVE_PREFIXES.some((prefix) =>
//             location.pathname.startsWith(prefix)
//         );
//         if (shouldSave) {
//             console.log("saving path:", location.pathname);
//             localStorage.setItem("lastPath", location.pathname);
//         }
//     }, [location.pathname]);
// };

// export const getLastPath = () => localStorage.getItem("lastPath");
// export const clearLastPath = () => localStorage.removeItem("lastPath");
