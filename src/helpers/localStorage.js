import { GET, getAuthenticatedHeaders, POST } from "../../fetching/http.fetching";


export const getData = async () => {
	try {
		const response = await GET(`https://back-drab-three.vercel.app/api/workspaces/get`, {
			headers: getAuthenticatedHeaders(),
		});

		console.log("Response recibido:", response);

		if (!response.ok) {
			throw new Error("Error al obtener los datos de los workspaces");
		}
		const data = await response.payload.workspaces;

		console.log('en getData---->', data);


		return data

	} catch (error) {
		console.error("Error al obtener los datos de la API:", error);
		return [];
	}
};

export const setData = async (data) => {
	try {
		const response = await POST("https://back-drab-three.vercel.app/api/workspaces/create", {
			headers: getAuthenticatedHeaders(),
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error("Error al guardar el workspace en la base de datos");
		}

		const result = await response.json();
		console.log("Workspace guardado correctamente:", result);
		return result;
	} catch (error) {
		console.error("Error al guardar el workspace:", error);
		throw error;
	}
};
