import React, { useContext, useState } from "react";
import Select from "../form/Select";
import SelectData from "../form/SelectData";
import { DatePicker } from "../Buttons/datePicker";
import ModalCloseButton from "../Buttons/ModalCloseButton";
import ModalHeading from "../headings/ModalHeading";
import SaveButton from "../Buttons/SaveButton";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../constants/constants";
import Input from "../form/Input";
import TableRow from "../TableRow";
import DeleteButton from "../Buttons/DeleteButton";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useAuth } from "../../hooks/useAuth";
import { ReloadDataContext } from "../../contexts/reloadDataContext";

export default function NewMoviment({ products: productsReceived, createModalToggle }) {
	const [date, setdate] = useState(new Date().toLocaleString("es-ar"));
	const { role } = useAuth();
	const [typeOfMoviment, settypeOfMoviment] = useState("");
	const [suplierName, setSuplierName] = useState("");
	const [responsable, setresponsable] = useState(role.name);
	const [products, setproducts] = useState([]);
	const [newProduct, setNewproduct] = useState("");
	const [description, setdescription] = useState("-");
	const [enterpryse, setenterpryse] = useState("ByDerm");
	const [quantity, setquantity] = useState("");
	const [lot, setlot] = useState("");
	const [expiration, setexpiration] = useState("");
	const [referNumber, setreferNumber] = useState("");
	const [typeOfProduct, setTypeOfProduct] = useState("");
	const [typeOfAdressee, setTypeOfAdressee] = useState("");
	const [adresseeName, setAdresseeName] = useState("");
	const [productionOrder, setProductionOrder] = useState("");

	const { setReloadMovement } = useContext(ReloadDataContext);

	const handleChangeNewProduct = (option) => {
		setNewproduct(option);
	};

	const handleClearProduct = () => {
		setNewproduct("");
	};

	const addNewMoviment = async (event) => {
		event.preventDefault();

		if (!typeOfMoviment) {
			toast.error("Debes cargar un tipo de movimiento 😢");
			return;
		}
		if (products.length == 0) {
			toast.error("Debes cargar productos antes de agregar un movimiento 😢");
			return;
		} else if (products.length > 0) {
			const requests = products.map((product) => {
				const productDetails = {
					date,
					typeOfMoviment,
					suplierName,
					responsable,
					product: product.product,
					description,
					enterpryse,
					quantity: typeOfMoviment === "SALIDA" ? `-${product.quantity}` : product.quantity,
					lot,
					expiration,
					referNumber,
					suplierName,
					adresseeName,
					productionOrder,
					typeOfProduct,
					typeOfAdressee,
				};

				return fetch(`${BACKEND_URL}/moviments/add`, {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify(productDetails),
				}).then((res) => {
					if (!res.ok) {
						throw new Error("Network response was not ok");
					}
					return res.json();
				});
			});

			try {
				await Promise.all(requests);
				toast.success("Movimiento cargado con éxito 💪");
				const quantityInput = document.getElementById("quantity");
				quantityInput.value = ""; // Clear the input
				handleClearProduct();
				setReloadMovement((prev) => !prev);
				createModalToggle();
			} catch (error) {
				toast.error("Hubo un error al agregar el movimiento 😢");
			}
		}
	};

	return (
		<div className="absolute w-full h-screen left-0 top-0 flex justify-center items-center">
			<div className="bg-[#00000070] w-full h-full fixed left-0 top-0 z-[1000]" onClick={() => createModalToggle()}></div>

			<label htmlFor="create-new-product" className=" cursor-pointer z-[100010] bg-[white] rounded-[4px] py-4">
				<label className=" lg:w-10/12 md:w-11/12 w-full max-w-5xl relative" htmlFor="">
					<ModalCloseButton modalId={"create-new-product"} onClick={createModalToggle} />

					<ModalHeading modalHeading={"CARGAR ENTRADA O SALIDA DE PRODUCTOS"} />

					<form onSubmit={(e) => addNewMoviment(e)} className="mx-8">
						<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 mb-2">
							<div className="col-span-3">
								<Select
									onchange={(e) => settypeOfMoviment(e.target.value)}
									title={"Tipo de Movimiento"}
									name="category"
									isRequired="required"
									options={["ENTRADA", "SALIDA", "ENTRADA S/ REMITO"]}
								/>
							</div>

							<div className="col-span-2">
								<SelectData
									onchange={handleChangeNewProduct}
									handleClear={handleClearProduct}
									title={"Nombre de articulo"}
									type="text"
									placeholder="26004 - Cleanser Aqua"
									name="aricleName"
									isRequired="required"
									value={newProduct}
									id={"product"}
									options={productsReceived
										.map((c) => c.name.toUpperCase())
										.sort((x, y) => {
											if (x > y) return 1;
											else return -1;
										})}
								/>
							</div>

							<Input
								onchange={(e) => setquantity(e.target.value)}
								title={"Cantidad"}
								type="number"
								placeholder="250"
								name="cantity"
								id={"quantity"}
							/>
							<button
								onClick={(e) => {
									e.preventDefault();
									setproducts([...products, { product: newProduct.value, quantity: quantity }]);
								}}
								className={`btn flex col-span-3 items-center gap-x-2 bg-[#D76611] border-white text-white hover:bg-[#c65500] hover:border-white`}>
								Añadir
							</button>
							<div className="col-span-3 max-h-[200px] overflow-y-scroll">
								<table className="table table-zebra table-compact col-span-3 z-0 w-full">
									<thead>
										<tr>
											{products &&
												products.length > 0 &&
												["Nombre de Articulo", "Cantidad", ""]?.map((tableHeadItem, index) => (
													<th key={index} className="text-xs md:text-2xs lg:text-md">
														{tableHeadItem}
													</th>
												))}
										</tr>
									</thead>
									<tbody className="">
										{products &&
											products.length > 0 &&
											products.map((moviment, index) => (
												<TableRow
													key={moviment._id}
													tableRowsData={[
														moviment.product,
														moviment.quantity,

														<span className="flex items-center gap-x-1 ">
															<button
																onClick={() => {
																	setproducts(products.filter((product) => product !== moviment));
																}}
																className="z-10 block p-1 text-red-700 transition-all bg-red-100 border-2 border-white rounded-full active:bg-red-50 hover:scale-110 focus:outline-none focus:ring"
																type="button">
																<RiDeleteBin6Fill />
															</button>
														</span>,
													]}
												/>
											))}
									</tbody>
								</table>
							</div>

							<Input
								onchange={(e) => setdescription(e.target.value)}
								title={"Información Adicional"}
								type="text"
								placeholder="Responsable por recibir la entrega: Fulano"
								name="pharmacyName"
							/>
							{typeOfMoviment === "ENTRADA S/ REMITO" && (
								<>
									<Input
										onClick={(e) => setSuplierName(e.target.checked)}
										title={"Nombre de Proveedor"}
										type="text"
										placeholder="Del Pueblo"
										name="pharmacyName"
										isRequired="required"
									/>
									<Select
										onchange={(e) => {
											setTypeOfProduct(e.target.value);
										}}
										type="checkbox"
										title="Tipo de articulo"
										options={["PRODUCTO FINAL", "Otro"]}
									/>
									{typeOfProduct === "PRODUCTO FINAL" && (
										<>
											<DatePicker
												onchange={(e) => {
													setexpiration(e.target.value);
												}}
												title={"Fecha de Vencimiento"}
												type="text"
												placeholder="dd/mm/aaaa"
												name="date"
												isRequired="required"
											/>
											<Input
												onchange={(e) => setlot(e.target.value)}
												title={"Producción"}
												type="text"
												name="category"
												placeholder="P25"
												isRequired="required"
											/>
										</>
									)}
								</>
							)}
							{typeOfMoviment === "ENTRADA" ? (
								<>
									<Input
										onClick={(e) => setSuplierName(e.target.checked)}
										title={"Nombre de Proveedor"}
										type="text"
										placeholder="Del Pueblo"
										name="pharmacyName"
										isRequired="required"
									/>
									<Select
										onchange={(e) => {
											setTypeOfProduct(e.target.value);
										}}
										type="checkbox"
										title="Tipo de articulo"
										options={["PRODUCTO FINAL", "Otro"]}
									/>
									{typeOfProduct === "PRODUCTO FINAL" && (
										<>
											<DatePicker
												onchange={(e) => {
													setexpiration(e.target.value);
												}}
												title={"Fecha de Vencimiento"}
												type="text"
												placeholder="dd/mm/aaaa"
												name="date"
												isRequired="required"
											/>
											<Input
												onchange={(e) => setlot(e.target.value)}
												title={"Producción"}
												type="text"
												name="category"
												placeholder="P25"
												isRequired="required"
											/>
										</>
									)}
									<Input
										onchange={(e) => setreferNumber(e.target.value)}
										title={"Nº de remito (últimos 4 digitos)"}
										type="number"
										name="category"
										placeholder="2501"
										isRequired="required"
										options={["ENTRADA", "SALIDA", "ENTRADA S/ REMITO"]}
									/>
								</>
							) : (
								typeOfMoviment === "SALIDA" && (
									<>
										<Input
											onchange={(e) => setreferNumber(e.target.value)}
											title={"Nº de remito (últimos 4 digitos)"}
											type="number"
											name="category"
											placeholder="2501"
											isRequired="required"
										/>
										<Input
											onchange={(e) => setAdresseeName(e.target.value)}
											title={"Nombre de destinatario"}
											type="text"
											placeholder="Del Pueblo"
											name="pharmacyName"
											isRequired="required"
										/>
										<Select
											onchange={(e) => setTypeOfAdressee(e.target.value)}
											title={"Tipo de destinatario"}
											type="text"
											placeholder="Del Pueblo"
											name="pharmacyName"
											isRequired="required"
											options={["FARMACIA", "MEDICO", "APM", "DROGUERIA", "LABORATORIO"]}
										/>
										{typeOfAdressee === "LABORATORIO" && (
											<Input
												onchange={(e) => setProductionOrder(e.target.value)}
												title={"Orden de producción"}
												type="text"
												placeholder="2024-152-001"
												name="pharmacyName"
												isRequired="required"
											/>
										)}
									</>
								)
							)}
						</div>
						<button
							className={`btn flex w-full col-span-3 items-center gap-x-2 bg-[#D76611] border-white text-white hover:bg-[#c65500] hover:border-white`}>
							Guardar
						</button>{" "}
					</form>
				</label>
			</label>
		</div>
	);
}
