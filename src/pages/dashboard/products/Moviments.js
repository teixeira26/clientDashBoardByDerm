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
import SelectDataPersonalized from "../../../components/molecules/filterSelect.js";



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

	const { reloadMovement } = useContext(ReloadDataContext);

	const createModalToggle = () => {
		setCreateModalState(!createModalState);
	};

	useEffect(() => {
		fetch(`${BACKEND_URL}/products/all`)
			.then((res) => res.json())
			.then((products) => {
				setProducts(products);
			});
	}, []);

	const [categoriesRemito, setCategoriesRemito] = useState([]);
	const [filtersRemito, setFiltersRemito] = useState([]);
	const [categoriesProduct, setCategoriesProduct] = useState([]);
	const [filtersProduct, setFiltersProduct] = useState([]);


	const setSelectedFiltersRemito = (selectedOptions) => {
		setFiltersRemito(selectedOptions);
	};


	const setSelectedFiltersProduct = (selectedOptions) => {
		setFiltersProduct(selectedOptions);
	};

	useEffect(() => {
		fetch(`${BACKEND_URL}/moviments/getAll`)
			.then((res) => res.json())
			.then((products) => {
				let set = new Set(products.map((product) => product.referNumber));
				let arraySinDuplicados = [...set];
				setCategoriesRemito(arraySinDuplicados);

				let set2 = new Set(products.map((product) => product.product));
				let arraySinDuplicados2 = [...set2];
				setCategoriesProduct(arraySinDuplicados2);

				setMoviments(products);
			});
			
	}, [reloadMovement]);

	console.log(moviments);

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
			<div className="grid grid-cols-2 gap-x-4 gap-y-2">
				<div className="mb-4 mt-[-16px] z-[100] flex flex-col gap-2">
					<p className="text-xl">Nombre producto</p>
					<SelectDataPersonalized options={categoriesProduct} setSelectedFilters={setSelectedFiltersProduct}/>
				</div>
				<div className="mb-4 mt-[-16px] z-[100] flex flex-col gap-2">
					<p className="text-xl">Numero remito</p>
					<SelectDataPersonalized options={categoriesRemito} setSelectedFilters={setSelectedFiltersRemito}/>
				</div>
			</div>

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
						{moviments.filter((x) => {
						if (filtersRemito.length > 0 && filtersProduct.length > 0) {
							return filtersRemito.includes(x.referNumber) && filtersProduct.includes(x.product);
						  } else if (filtersRemito.length > 0) {
							return filtersRemito.includes(x.referNumber);
						  } else if (filtersProduct.length > 0) {
							return filtersProduct.includes(x.product);
						  } else {
							return true; // Devuelve todos los movimientos si ambos filtros están vacíos
						  }
					})?.sort((a, b) => new Date(b.date) - new Date(a.date))
							.map((moviment, index) => (
								<TableRow
									key={index}
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
				<table className="table1">
					<tbody className="table-tbody">
						<tr>
							<td className="loading">
								<div className="bar"></div>
							</td>
						</tr>
					</tbody>
				</table>
			)}
		</section>
	);
};

export default Moviments;
