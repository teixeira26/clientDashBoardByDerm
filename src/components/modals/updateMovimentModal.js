import React from 'react'

export default function UpdateMovimentModal({id}) {
    const [typeOfMoviment, settypeOfMoviment] = useState('')
    const [pharmacy, setpharmacy] = useState('')
    const [responsable, setresponsable] = useState('')
    const [product, setproduct] = useState('')
    const [description, setdescription] = useState('-')
    const [enterpryse, setenterpryse] = useState('ByDerm')
    const [quantity, setquantity] = useState('')
    const [lot, setlot] = useState('')
    const [expiration, setexpiration] = useState('')
    const [referNumber, setreferNumber] = useState('') 


    const updateMoviment = event => {
        event.preventDefault();

        console.log({ typeOfMoviment, pharmacy, responsable, product, description, enterpryse, quantity, lot, expiration, referNumber })
        const productDetails = { date, typeOfMoviment, pharmacy, responsable, product, description, enterpryse, quantity: typeOfMoviment === "SALIDA" ? `-${quantity}` : quantity, lot, expiration, referNumber }       // send data to server
        fetch(`${BACKEND_URL}/moviments/update/${id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(productDetails)
        })
            .then(res => {
                toast.success('Movimiento cargado con exito 💪');
                res.json()}).catch(
                    ()=>toast.error('Hubo un error al agregar el movimiento 😢')
                )
           

        event.target.reset();
    };
  return (
    <div>
         <label className="modal-box lg:w-7/12 md:w-10/12 w-11/12 max-w-4xl relative" htmlFor="">
                <ModalCloseButton modalId={'update-pharmacy-product'} />

                <ModalHeading modalHeading={'Actualizar un Movimiento'} />

                
                <form onSubmit={((e)=>updateMoviment(e))}>
                        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 mb-2'>
                            <Select onchange={(e)=>setproduct(e.target.value)} title={'Nombre de articulo'} type='text' placeholder='26004 - Cleanser Aqua' name='aricleName' isRequired='required' options={products.map(c => c.name.toUpperCase())}/>
                            <Select onchange={(e)=>settypeOfMoviment(e.target.value)} title={'Tipo de Movimiento'} name='category' isRequired='required' options={['ENTRADA', 'SALIDA']} />
                            <Input onchange={(e)=>setquantity(e.target.value)} title={'Cantidad'} type='number' placeholder='250' name='cantity' isRequired='required' />
                            <Input onchange={(e)=>setdescription(e.target.value)} title={'Comentários'} type='text' placeholder='Responsable por recibir la entrega: Fulano' name='pharmacyName' isRequired='required' />
                            <Select onchange={(e)=>setresponsable(e.target.value)} title={'Nombre del responsable'} type='text' placeholder='Juan Perez' name='name' options={['Veronica', 'Viviana', 'Valeria'].map(c => c)} />
                           <Input onchange={(e)=>setpharmacy(e.target.value)} title={'Nombre de la farmacia'} type='text' placeholder='Del Pueblo' name='pharmacyName' isRequired='required' />
                           <Input onchange={(e)=>setreferNumber(e.target.value)} title={'Nº de remito (últimos 4 digitos)'}  type='number' name='category' placeholder='2501' isRequired='required' options={['ENTRADA', 'SALIDA']} />
                            <DatePicker onchange={(e)=>{
                                console.log(e.target.value, typeof e.target.value)
                                setexpiration(e.target.value)}} title={'Fecha de Vencimiento'} type='text' placeholder='dd/mm/aaaa' name='date' isRequired='required' />
                            <Input onchange={(e)=>setlot(e.target.value)}  title={'Lote'}  type='text' name='category' placeholder='P25' isRequired='required' options={['ENTRADA', 'SALIDA']} />


                        </div>
                        <SaveButton extraClass={'mt-4 w-full'} />

                    </form>
            </label>
    </div>
  )
}
