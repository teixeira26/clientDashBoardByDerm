import React from 'react';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../constants/constants';

const DeleteButton = ({ deleteURL, itemId }) => {
    const deleteItem = _id => {
        fetch(`${BACKEND_URL}${deleteURL}${_id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => {
                toast.success(
                            <span>Producto Borrado con éxito 🗑.</span>
                );
                res.json()}).catch(
                    ()=>toast.error('Hubo un error al intentar borrar el producto 😢')
                )    
    };

    return (
        <button onClick={() => deleteItem(itemId)}
            className="z-10 block p-1 text-red-700 transition-all bg-red-100 border-2 border-white rounded-full active:bg-red-50 hover:scale-110 focus:outline-none focus:ring"
            type="button"
        >
            <RiDeleteBin6Fill />
        </button>
    );
};

export default DeleteButton;