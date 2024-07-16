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

const EditButton = ({ id, setModal }) => {
    const [isProductCharged, setProductCharged] = useState(false);
    const [product, setProduct] = useState(null)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [minimunQuantityOnStock, setMinimunQuantityOnStock] = useState('')

    const toggleModal =()=>{
        setModal(false)
    }



    useEffect(() => {
       
            fetch(`${BACKEND_URL}/products/${id}`)
            .then(async (res) => {
                const response = await res.json()
                setName(response.name);
                console.log(response)
                setDescription(response.description);
                setMinimunQuantityOnStock(response.minimunQuantityOnStock);
                setProduct(response)
                setProductCharged(true)
            }).catch((err)=>{
                console.log(err)
            })
           
        
       

    }, []);

   
    const updateProduct = event => {
        event.preventDefault();
        alert('ooooooo')

        console.log(product, description)

       const body = {
        description: description && description.length > 0 ? description : product.description,
        minimunQuantityOnStock: minimunQuantityOnStock.length > 0 ? minimunQuantityOnStock : product.minimunQuantityOnStock,
        name: name.length > 0 ? name : product.name,
        quantity: product.quantity,
        active: product.active
       }
       console.log(body)


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

    };

    return (
        <>
        <div  className='w-[100%] h-[100vh] fixed  left-0 top-0 flex  z-[100000000] justify-center items-center '>
  
        <div onClick={toggleModal} className='w-[100%] h-[100vh] fixed  z-[1] bg-[#00000070] left-0 top-0 flex justify-center items-center '></div>

<label className="lg:w-7/12 md:w-10/12 w-11/12 max-w-4xl absolute z-[2] bg-[#ffffff] rounded-lg p-4" htmlFor="">
                    <div onClick={toggleModal}>
                    <ModalCloseButton />

                    </div>

                    <ModalHeading />

                    <form onSubmit={updateProduct}>
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-4 gap-y-1 mb-2'>
                        <Input value={name} onchange={(e)=>{setName(e.target.value)}} title={'Nombre'} type='text' placeholder='Cleanser Aqua 150ml' name='aricleName' isRequired='required'/>
                            <Input value={description} onchange={(e)=>{setDescription(e.target.value)}} title={'Descripción'} type='text' placeholder='-' name='description'/>
                            <Input value={minimunQuantityOnStock} onchange={(e)=>{setMinimunQuantityOnStock(e.target.value)}} title={'Cantidad Mínima en Stock'} type='number' placeholder='250' name='quantity' isRequired='required' />


                        </div>
               <div onClick={(e)=>updateProduct(e)}>
               <SaveButton extraClass={'mt-4 w-full'} />

               </div>

                    </form>
                </label>



               

           
        </div>
        </>
    );
};

export default EditButton;