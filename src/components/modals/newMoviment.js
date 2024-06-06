import React, { useState } from 'react'
import Select from '../form/Select';
import SelectData from '../form/SelectData';
import { DatePicker } from '../Buttons/datePicker';
import ModalCloseButton from '../Buttons/ModalCloseButton';
import ModalHeading from '../headings/ModalHeading';
import SaveButton from '../Buttons/SaveButton';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../constants/constants';
import Input from '../form/Input';

export default function NewMoviment({products, createModalToggle}) {
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
  
  
    const handleChangeProduct = (option) => {
      setproduct(option);
      console.log(option)
    };
  
    const handleClearProduct = () => {
      setproduct(null);
    };


    const addNewMoviment = (event) => {
        event.preventDefault();
        console.log(product)
        const productDetails = {
          date,
          typeOfMoviment,
          suplierName,
          responsable,
          product: product.value,
          description,
          enterpryse,
          quantity: typeOfMoviment === "SALIDA" ? `-${quantity}` : quantity,
          lot,
          expiration,
          referNumber,
          suplierName,
          adresseeName,
          productionOrder,
          typeOfProduct,
          typeOfAdressee,
        }; // send data to server
        fetch(`${BACKEND_URL}/moviments/add`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(productDetails),
        })
          .then((res) => {
            toast.success("Movimiento cargado con exito 💪");
            const quantityInput = document.getElementById('quantity'); 
            quantityInput.value = ''; // Clear the input
            handleClearProduct();
            res.json();
          })
          .catch(() => toast.error("Hubo un error al agregar el movimiento 😢"));
    
      };


  return (
    <div className="absolute w-full h-full left-0 top-0 flex justify-center items-center">
    <div className='bg-[#00000070] w-full h-full absolute left-0 top-0 z-[1000]' onClick={()=>createModalToggle()}></div>


      <label htmlFor="create-new-product" className=" cursor-pointer z-[100010] bg-[white] rounded-[4px] py-4">
        <label
          className=" lg:w-10/12 md:w-11/12 w-full max-w-5xl relative"
          htmlFor=""
        >
          <ModalCloseButton modalId={"create-new-product"} onClick={createModalToggle}/>

          <ModalHeading modalHeading={"CARGAR ENTRADA O SALIDA DE PRODUCTOS"} />

          <form onSubmit={(e) => addNewMoviment(e)} className="mx-8">
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
                options={["ENTRADA", "SALIDA", "ENTRADA S/ REMITO"]}
              />
<div className='col-span-2'>
<SelectData
                onchange={handleChangeProduct}
                handleClear={handleClearProduct}
                title={"Nombre de articulo"}
                type="text"
                placeholder="26004 - Cleanser Aqua"
                name="aricleName"
                isRequired="required"
                value={product}
                id={'product'}
                options={
                products    
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
                isRequired="required"
                id={'quantity'}
              />
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
                      console.log(e.target.value);
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
                      console.log(e.target.value);
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
                      options={['FARMACIA', 'MEDICO', 'APM', 'DROGUERIA', 'LABORATORIO']}
                    />
                    {typeOfAdressee === 'LABORATORIO' && <Input
                      onchange={(e) => setProductionOrder(e.target.value)}
                      title={"Orden de producción"}
                      type="text"
                      placeholder="2024-152-001"
                      name="pharmacyName"
                      isRequired="required"
                    />}
                  </>
                )
              )}
            </div>
            <SaveButton extraClass={"mt-4 w-full"} />
          </form>
        </label>
      </label>

    </div>
  )
}
