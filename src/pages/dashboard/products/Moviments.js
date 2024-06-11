import React from "react";
import SaveButton from "../../../components/Buttons/SaveButton";
import PrintButton from "../../../components/Buttons/PrintButton";
import NewButton from "../../../components/Buttons/NewButton";
import Input from "../../../components/form/Input";
import Select from "../../../components/form/Select";
import ModalCloseButton from "../../../components/Buttons/ModalCloseButton";
import ModalHeading from "../../../components/headings/ModalHeading";
import { useState } from "react";
import { useEffect } from "react";
import RefreshButton from "../../../components/Buttons/RefreshButton";
import TableRow from "../../../components/TableRow";
import EditButton from "../../../components/Buttons/EditButton";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import { toast } from "react-toastify";
import DashboardPageHeading from "../../../components/headings/DashboardPageHeading";
import { DatePicker } from "../../../components/Buttons/datePicker";
import { BACKEND_URL } from "../../../constants/constants";
import SelectData from "../../../components/form/SelectData";
import NewMoviment from "../../../components/modals/newMoviment";
import { createExcel } from "../../../hooks/useCreateExcel";

const Moviments = () => {
  const tableHeadItems = [
    "Nº",
    "Responsable Interno",
    "Tipo de proveedor",
    "Nombre de proveedor",
    "Producto",
    "Comentários",
    "Tipo de Movimiento",
    "Nombre de Destinatario",
    "Orden de producción",
    "Tipo de Producto",
    "Cantidad",
    "Producción",
    "Fecha de Vencimiento",
    "Nº de remito",
  ];

  const [date, setdate] = useState(new Date().toLocaleDateString("en-CA"));
  const [typeOfMoviment, settypeOfMoviment] = useState("");
  const [suplierName, setSuplierName] = useState("");
  const [responsable, setresponsable] = useState("");
  const [product, setproduct] = useState("");
  const [description, setdescription] = useState("-");
  const [enterpryse, setenterpryse] = useState("ByDerm");
  const [quantity, setquantity] = useState("");
  const [lot, setlot] = useState("");
  const [expiration, setexpiration] = useState("");
  const [referNumber, setreferNumber] = useState("");
  const [typeOfProduct, setTypeOfProduct] = useState("");
  const [typeOfAdressee, setTypeOfAdressee] = useState("");
  const [adresseeName, setAdresseeName] = useState('');
  const [productionOrder, setProductionOrder] = useState('');


  const [createModalState, setCreateModalState] = useState(false)

  const tableHead = (
    <tr>
      {tableHeadItems?.map((tableHeadItem, index) => (
        <th key={index} className="text-xs md:text-2xs lg:text-md">
          {tableHeadItem}
        </th>
      ))}
    </tr>
  );

  useEffect(()=>{
    if (createModalState) {
      document.getElementsByClassName('drawer-content')[0].style.overflow = 'hidden';  // Para asegurar que el scrollbar desaparezca
    } else {
      document.getElementsByClassName('drawer-content')[0].style.overflow = '';  // Restaurar el scrollbar
    }
  
    return () => {
      document.getElementsByClassName('drawer-content')[0].style.overflow = '';  // Asegurar restauración al desmontar el componente
    };
    
  }, [createModalState])
  



  const [moviments, setMoviments] = useState([]);
  const [products, setProducts] = useState([]);

  const createModalToggle = ()=>{
    setCreateModalState(!createModalState)
  }

  useEffect(() => {
    fetch(`${BACKEND_URL}/products/getAll`)
      .then((res) => res.json())
      .then((products) => setProducts(products));
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_URL}/moviments/getAll`)
      .then((res) => res.json())
      .then((products) => setMoviments(products));
  }, []);

  return (
    <section className="p-4 mt-16">
      <DashboardPageHeading
        name="Últimos Movimientos"
        value={moviments.length}
        buttons={[
          <NewButton title={"Cargar nuevo"} modalId="create-new-product" onClick={createModalToggle}/>,
          <RefreshButton />,
          <div onClick={()=>createExcel(moviments, `Movimientos a fecha ${new Date().getDate()} ${new Date().getMonth() + 1} ${new Date().getFullYear()}`)}>
            <PrintButton />
          </div>,

        ]}
      />

      {/* create new pharmacy product purchase */}
      {createModalState && 
      <>
      <NewMoviment products={products} createModalToggle={createModalToggle}/>
      </>
      }
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
                  console.log(e.target.value, typeof e.target.value);
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
      <table className="table table-zebra table-compact">
        <thead>{tableHead}</thead>
        <tbody>
          {moviments.sort((a, b) => new Date(b.date) - new Date(a.date) ).map((moviment, index) => (
            <TableRow
              key={moviment._id}
              tableRowsData={[
                index + 1,
                moviment.responsable,
                moviment.typeOfAdressee,
                moviment.suplierName,
                moviment.product,
                moviment.description,
                moviment.typeOfMoviment,
                moviment.adresseeName,
                moviment.productionOrder,
                moviment.setTypeOfProduct,
                moviment.quantity,
                moviment.lot,
                moviment.expiration,
                `X-0001-0000${moviment.referNumber}`,
                <span className="flex items-center gap-x-1">
                  <EditButton />
                  <DeleteButton
                    deleteApiLink="https://stringlab-ims-server.herokuapp.com/api/purchases/pharmacy/"
                    itemId={moviment._id}
                    name={moviment.tradeName}
                  />
                </span>,
              ]}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Moviments;
