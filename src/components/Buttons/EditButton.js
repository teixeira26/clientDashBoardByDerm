import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { BiEdit } from 'react-icons/bi';
import Input from '../form/Input';
import ModalHeading from '../headings/ModalHeading';
import ModalCloseButton from './ModalCloseButton';
import SaveButton from './SaveButton';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../constants/constants';

const EditButton = ({ id }) => {
    const [product, setProduct] = useState();
    const [isProductCharged, setProductCharged] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [minimunQuantityOnStock, setMinimunQuantityOnStock] = useState('')

    const [active, setActive] = useState(false);
    const toggleModal =()=>{
        setActive(!active)
    }



    useEffect(() => {
        if(active){
            fetch(`${BACKEND_URL}/products/${id}`)
            .then(async (res) => {
                const response = await res.json()
                setName(response.name);
                setDescription(response.description);
                setMinimunQuantityOnStock(response.minimunQuantityOnStock);
                                console.log(response)
                setProductCharged(true)
            }).catch((err)=>{
                console.log(err)
            })
           
        }
       

    }, [active]);

   
    const updateProduct = event => {
        event.preventDefault();

       const body = {
        description: description.length > 0 ? description : product.description,
        minimunQuantityOnStock: minimunQuantityOnStock.length > 0 ? minimunQuantityOnStock : product.minimunQuantityOnStock,
        name: name.length > 0 ? name : product.name,
        quantity: product.quantity,
        active: product.active
       }


        // send data to server
        fetch(`${BACKEND_URL}/products/update/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => {
                toast.success(
              
                            <span>Producto actualizado 🚀.</span>
                );
                res.json()}).catch(
                    ()=>toast.error('Hubo un error al intentar actualizar el producto 😢')
                )

        event.target.reset();
    };

    return (
        <div>
            {/* update a pharmacy product */}
            <input type="checkbox" id="update-pharmacy-product" className="modal-toggle" />

            <label htmlFor="" className="modal cursor-pointer">
                <label className="modal-box lg:w-7/12 md:w-10/12 w-11/12 max-w-4xl relative" htmlFor="">
                    <ModalCloseButton modalId={'update-pharmacy-product'} />

                    <ModalHeading modalHeading={'Actualizar Producto'} />

                    <form onSubmit={updateProduct}>
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-1 mb-2'>
                        <Input value={name} onchange={(e)=>{setName(e.target.value)}} title={'Nombre'} type='text' placeholder='Cleanser Aqua 150ml' name='aricleName' isRequired='required'/>
                            <Input value={description} onchange={(e)=>{setDescription(e.target.value)}} title={'Descripción'} type='text' placeholder='-' name='description' isRequired='required' />
                            <Input value={minimunQuantityOnStock} onchange={(e)=>{setMinimunQuantityOnStock(e.target.value)}} title={'Cantidad Mínima en Stock'} type='number' placeholder='250' name='quantity' isRequired='required' />


                        </div>
               
                        <SaveButton extraClass={'mt-4 w-full'} />

                    </form>
                </label>
            </label>

            <label onClick={()=>toggleModal()} htmlFor='update-pharmacy-product' className={`gap-x-2 modal-button z-10 block p-1 text-blue-700 transition-all bg-blue-100 border-2 border-white rounded-full active:bg-blue-50 hover:scale-110 focus:outline-none focus:ring`}>
                <BiEdit />
            </label>
        </div>
    );
};

export default EditButton;