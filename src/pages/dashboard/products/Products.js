import React from 'react';
import SaveButton from '../../../components/Buttons/SaveButton';
import PrintButton from '../../../components/Buttons/PrintButton';
import NewButton from '../../../components/Buttons/NewButton';
import Input from '../../../components/form/Input';
import ModalCloseButton from '../../../components/Buttons/ModalCloseButton';
import ModalHeading from '../../../components/headings/ModalHeading';
import { useState } from 'react';
import { useEffect } from 'react';
import RefreshButton from '../../../components/Buttons/RefreshButton';
import TableRow from '../../../components/TableRow';
import EditButton from '../../../components/Buttons/EditButton';
import DeleteButton from '../../../components/Buttons/DeleteButton';
import { toast } from 'react-toastify';
import DashboardPageHeading from '../../../components/headings/DashboardPageHeading';
import AddModal from '../../../components/modals/AddModal';
import { BACKEND_URL } from '../../../constants/constants';
import { createExcel } from '../../../hooks/useCreateExcel';
import { BiEdit } from 'react-icons/bi';
import SelectData from '../../../components/form/SelectData';
import SelectDataPersonalized from '../../../components/molecules/filterSelect.js';


const Products = () => {
    const tableHeadItems = ['Nº de Artículo' ,'Nombre de Producto', 'Descripción', 'Cantidad Mínima en stock', 'Cantidad'];

    const tableHead = <tr>
        {
            tableHeadItems?.map((tableHeadItem, index) => <th key={index} className='text-xs md:text-2xs lg:text-md' >{tableHeadItem}</th>)
        }
    </tr>;

    const addNewProduct = event => {
        event.preventDefault();


        const productDetails = { name: name.toUpperCase(), description, minimunQuantityOnStock, quantity: 0 };

        // send data to server
        fetch(`${BACKEND_URL}/products/add`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(productDetails)
        })
            .then(res => {
                toast.success(
                    <AddModal name={'Producto'} />
                );
                res.json()}).catch(
                    ()=>toast.error('Hubo un error al agregar el producto 😢')
                )
           
        event.target.reset();
    };
    const [name, setName] = useState('');
    const [updateModal, setUpdateModal] = useState(false)
    const [description, setDescription] = useState('-');
    const [minimunQuantityOnStock, setMinimunQuantityOnStock] = useState('')
    const [filters, setFilters] = useState([])
    const [categories, setcategories] = useState([])


    const [products, setProducts] = useState([]);


    useEffect(() => {
        fetch(`${BACKEND_URL}/products/getAll`)
            .then(res => res.json())
            .then(products => {
           
                let set = new Set(products);
                let arraySinDuplicados = [...set];
                console.log(arraySinDuplicados)
                setProducts(products)});
              
    }, []);

    

    return (
        <section className='p-4 mt-16'>
            <SelectDataPersonalized options={[]}/>
            
         
            {updateModal && <EditButton id={updateModal} setModal={setUpdateModal}/>}
            <DashboardPageHeading
                name='Productos'
                value={products.length}
                buttons={[
                    <NewButton title={'Crear'} modalId='create-new-product' />,
                    <RefreshButton />,
                    <div onClick={()=>createExcel(products, `stock valorizado a fecha ${new Date().getDate()}_${new Date().getMonth() + 1}_${new Date().getFullYear()}`)}>
                        <PrintButton />
                    </div>,
                ]}
            />

            <input type="checkbox" id="create-new-product" className="modal-toggle" />
            <label htmlFor="create-new-product" className="modal cursor-pointer">
                <label className="modal-box lg:w-7/12 md:w-10/12 w-11/12 max-w-4xl relative" htmlFor="">
                    <ModalCloseButton modalId={'create-new-product'} />

                    <ModalHeading modalHeading={'Crear Nuevo Producto'} />

                    <form onSubmit={addNewProduct}>
                        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 mb-2'>
                            <Input onchange={(e)=>{setName(e.target.value)}} title={'Nombre'} type='text' placeholder='Cleanser Aqua 150ml' name='aricleName' isRequired='required'/>
                            <Input onchange={(e)=>{setDescription(e.target.value)}} title={'Descripción'} type='text' placeholder='-' name='description' />
                            <Input onchange={(e)=>{setMinimunQuantityOnStock(e.target.value)}} title={'Cantidad Mínima en Stock'} type='number' placeholder='250' name='quantity' isRequired='required' />


                        </div>
                        <SaveButton extraClass={'mt-4 w-full'} />

                    </form>
                </label>
            </label>


            <table className="table table-zebra table-compact">
                <thead>
                    {
                        tableHead
                    }
                </thead>
                <tbody>
                    {
                        products.map((product, index) =>
                            <TableRow
                                key={product.id}
                                tableRowsData={
                                    [
                                        index + 1,
                                        product.name.toUpperCase(),
                                        product.description,
                                        product.minimunQuantityOnStock,
                                        product.quantity,
                                        '',
                                        <span className='flex items-center gap-x-1'>
                                            <label onClick={()=>{
                                                setUpdateModal(product.id)}} htmlFor='update-pharmacy-product' className={`gap-x-2 cursor-pointer modal-button z-10 block p-1 text-blue-700 transition-all bg-blue-100 border-2 border-white rounded-full active:bg-blue-50 hover:scale-110 focus:outline-none focus:ring`}>
                                                <BiEdit />
                                             </label>
                                            <DeleteButton
                                            deleteURL={'/products/delete/'}
                                                itemId={product.id}
                                                 />
                                        </span>
                                    ]
                                } />)
                    }
                </tbody>
            </table>
        </section >
    );
};

export default Products;