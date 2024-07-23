import { createContext, useState } from "react";

const ReloadDataContext = createContext();

const ReloadDataContextProvider = ({ children }) => {
	const [reloadMovement, setReloadMovement] = useState(false);
	const [reloadProduct, setReloadProduct] = useState(false);
	return (
		<ReloadDataContext.Provider value={{ reloadMovement, setReloadMovement, reloadProduct, setReloadProduct }}>
			{children}
		</ReloadDataContext.Provider>
	);
};
export { ReloadDataContext, ReloadDataContextProvider };
