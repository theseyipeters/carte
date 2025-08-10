import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import { store } from "./redux/store/store";

function App() {
	return (
		<Provider store={store}>
			<AppRoutes />
		</Provider>
	);
}

export default App;

const AppRoutes = () => {
	return (
		<Routes>
			<Route
				path="/"
				index
				element={<Homepage />}
			/>
		</Routes>
	);
};
