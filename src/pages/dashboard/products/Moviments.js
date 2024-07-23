import React, { useContext } from "react";
import PrintButton from "../../../components/Buttons/PrintButton";
import NewButton from "../../../components/Buttons/NewButton";
import { useState } from "react";
import { useEffect } from "react";
import RefreshButton from "../../../components/Buttons/RefreshButton";
import TableRow from "../../../components/TableRow";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import DashboardPageHeading from "../../../components/headings/DashboardPageHeading";
import { BACKEND_URL } from "../../../constants/constants";
import NewMoviment from "../../../components/modals/newMoviment";
import { createExcel } from "../../../hooks/useCreateExcel";
import { ReloadDataContext } from "../../../contexts/reloadDataContext";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
	const getPageNumbers = () => {
		const delta = 2; // Número de páginas a mostrar alrededor de la página actual
		let pages = [];

		// Mostrar las primeras dos páginas
		if (totalPages <= 5) {
			pages = Array.from({ length: totalPages }, (_, i) => i + 1);
		} else {
			if (currentPage > 4) {
				pages.push(1);
				if (currentPage > 5) pages.push("...");
			}
			const start = Math.max(2, currentPage - delta);
			const end = Math.min(totalPages - 1, currentPage + delta);
			pages.push(...Array.from({ length: end - start + 1 }, (_, i) => start + i));
			if (currentPage < totalPages - 3) {
				if (currentPage < totalPages - 4) pages.push("...");
				pages.push(totalPages);
			}
		}
		return pages;
	};

	const handlePageChange = (page) => {
		if (page !== currentPage && page > 0 && page <= totalPages) {
			onPageChange(page);
		}
	};

	return (
		<div className="flex gap-2 items-center justify-center my-5">
			<button
				className={`py-1 px-3 hover:bg-gray-200 rounded-md ${
					currentPage === 1 ? "cursor-not-allowed hover:bg-white bg-gray-200 opacity-50" : ""
				}`}
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}>
				<span className="font-semibold">{`< `}</span>
			</button>

			{getPageNumbers().map((page, index) => (
				<button
					key={index}
					className={`py-1 px-3 rounded-md font-semibold ${
						page === currentPage ? "border-black border-[1px]" : "hover:bg-gray-200"
					}`}
					onClick={() => page !== "..." && handlePageChange(page)}>
					{page}
				</button>
			))}

			<button
				className={`py-1 px-3 hover:bg-gray-200 rounded-md ${
					currentPage === totalPages ? "cursor-not-allowed hover:bg-white bg-gray-200 opacity-50" : ""
				}`}
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}>
				<span className="font-semibold">{`> `}</span>
			</button>
		</div>
	);
};

const Moviments = () => {
	const tableHeadItems = [
		"Producto",
		"Cantidad",
		"Nº de remito",
		"Fecha",
		"Tipo de Movimiento",
		"Responsable Interno",
		"Tipo de proveedor",
		"Nombre de proveedor",
		"Comentários",
		"Nombre de Destinatario",
		"Orden de producción",
		"Tipo de Producto",
		"Producción",
		"Fecha de Vencimiento",
	];

	const [page, setPage] = useState(1);

	const [createModalState, setCreateModalState] = useState(false);

	const tableHead = (
		<tr>
			{tableHeadItems?.map((tableHeadItem, index) => (
				<th key={index} className="text-xs md:text-2xs lg:text-md">
					{tableHeadItem}
				</th>
			))}
		</tr>
	);

	useEffect(() => {
		if (createModalState) {
			document.getElementsByClassName("drawer-content")[0].style.overflow = "hidden"; // Para asegurar que el scrollbar desaparezca
		} else {
			document.getElementsByClassName("drawer-content")[0].style.overflow = ""; // Restaurar el scrollbar
		}

		/*     return () => {
      document.getElementsByClassName('drawer-content')[0].style.overflow = '';  // Asegurar restauración al desmontar el componente
    }; */
	}, [createModalState]);

	const [moviments, setMoviments] = useState([]);
	const [products, setProducts] = useState([]);
	const [totalPages, setTotalPages] = useState(0);

	const { reloadMovement } = useContext(ReloadDataContext);

	const createModalToggle = () => {
		setCreateModalState(!createModalState);
	};

	useEffect(() => {
		fetch(`${BACKEND_URL}/products/getAll`)
			.then((res) => res.json())
			.then((products) => setProducts(products));
	}, []);

	useEffect(() => {
		if (page) {
			fetch(`${BACKEND_URL}/moviments/getAll?page=${page}`)
				.then((res) => res.json())
				.then((products) => {
					setMoviments(products.data);
				});
		} else {
			fetch(`${BACKEND_URL}/moviments/getAll?page=${page}`)
				.then((res) => res.json())
				.then((products) => setMoviments(products.moviments));
		}
	}, [page, reloadMovement]);

	useEffect(() => {
		fetch(`${BACKEND_URL}/moviments/getAll?page=${page}`)
			.then((res) => res.json())
			.then((data) => setTotalPages(data.pagination.totalPages));
	}, []);

	return (
		<section className="p-4 mt-16">
			<DashboardPageHeading
				name="Últimos Movimientos"
				value={moviments.length}
				buttons={[
					<NewButton title={"Cargar nuevo"} modalId="create-new-product" onClick={createModalToggle} />,
					<div
						onClick={() =>
							createExcel(
								moviments,
								`Movimientos a fecha ${new Date().getDate()} ${new Date().getMonth() + 1} ${new Date().getFullYear()}`
							)
						}>
						<PrintButton />
					</div>,
				]}
			/>

			{/* create new pharmacy product purchase */}
			{createModalState && (
				<>
					<NewMoviment products={products} createModalToggle={createModalToggle} />
				</>
			)}
			{/* update a pharmacy product */}
			{/* <input
        type="checkbox"
        id="update-pharmacy-product"
        className="modal-toggle"
      />
      <label htmlFor="update-pharmacy-product" className="modal cursor-pointer">
        <label
          className="modal-box lg:w-10/12 md:w-11/12 w-full max-w-5xl relative"
          htmlFor=""
        >
          <form onSubmit={(e) => addNewMoviment(e)}>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 mb-2">
              <Select
                onchange={(e) => setresponsable(e.target.value)}
                title={"Nombre del responsable"}
                type="text"
                placeholder="Juan Perez"
                name="name"
                options={["Veronica", "Viviana", "Valeria"].map((c) => c)}
                
              />

              <Select
                onchange={(e) => settypeOfMoviment(e.target.value)}
                title={"Tipo de Movimiento"}
                name="category"
                isRequired="required"
                options={["ENTRADA", "SALIDA"]}
              />

              <Select
                onchange={(e) => setproduct(e.target.value)}
                title={"Nombre de articulo"}
                type="text"
                placeholder="26004 - Cleanser Aqua"
                name="aricleName"
                isRequired="required"
                options={products
                  .map((c) => c.name.toUpperCase())
                  .sort((x, y) => {
                    if (x > y) return 1;
                    else return -1;
                  })}
                  
              />
              <Input
                onchange={(e) => setquantity(e.target.value)}
                title={"Cantidad"}
                type="number"
                placeholder="250"
                name="cantity"
                isRequired="required"
              />
              <Input
                onchange={(e) => setdescription(e.target.value)}
                title={"Información Adicional"}
                type="text"
                placeholder="Responsable por recibir la entrega: Fulano"
                name="pharmacyName"
              />
              <Input
                onchange={(e) => setSuplierName(e.target.value)}
                title={"Nombre de la farmacia"}
                type="text"
                placeholder="Del Pueblo"
                name="pharmacyName"
                isRequired="required"
              />
              <Input
                onchange={(e) => setreferNumber(e.target.value)}
                title={"Nº de remito (últimos 4 digitos)"}
                type="number"
                name="category"
                placeholder="2501"
                isRequired="required"
              />
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
                options={["ENTRADA", "SALIDA"]}
              />
            </div>
            <SaveButton extraClass={"mt-4 w-full"} />
          </form>
        </label>
      </label> */}

			{/* Purchased Table */}

			{moviments.length > 0 ? (
				<table className="table table-zebra table-compact">
					<thead>{tableHead}</thead>
					<tbody>
						{moviments
							?.sort((a, b) => new Date(b.date) - new Date(a.date))
							.map((moviment, index) => (
								<TableRow
									key={moviment._id}
									tableRowsData={[
										moviment.product,
										moviment.quantity,
										`X-0001-0000${moviment.referNumber}`,
										moviment.date,
										moviment.typeOfMoviment,
										moviment.responsable,
										moviment.typeOfAdressee,
										moviment.suplierName,
										moviment.description,

										moviment.adresseeName,
										moviment.productionOrder,
										moviment.setTypeOfProduct,

										moviment.lot,
										moviment.expiration,

										<span className="flex items-center gap-x-1">
											{/* <EditButton /> */}
											<DeleteButton
												deleteApiLink="https://stringlab-ims-server.herokuapp.com/api/purchases/pharmacy/"
												deleteURL={"/moviments/delete/"}
												itemId={moviment.id}
												name={moviment.tradeName}
											/>
										</span>,
									]}
								/>
							))}
					</tbody>
				</table>
			) : (
				<table class="table1">
					<tbody className="table-tbody">
						<tr>
							<td class="loading">
								<div class="bar"></div>
							</td>
						</tr>
					</tbody>
				</table>
			)}

			{moviments.length > 0 && <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />}
		</section>
	);
};

export default Moviments;
