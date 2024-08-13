import { workSpaces } from "../data/data.js"

export const getData = () => {
	const dataGuardada = localStorage.getItem('data')
	if (dataGuardada) {
		return JSON.parse(dataGuardada)
	} else {
		setData(workSpaces)
		return workSpaces;
	}
}

export const setData = (data) => {
	const data_JSON = JSON.stringify(data)
	localStorage.setItem("data", data_JSON)
}
