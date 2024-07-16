import AirDatepicker from 'air-datepicker';
import localeEs from 'air-datepicker/locale/es';
import "air-datepicker/air-datepicker.css";


export const DatePicker =({ title = 'Input Field', type = 'text', placeholder = 'Type Here', name, onchange, isRequired, value })=>{

    new AirDatepicker('#es', {
        locale: localeEs
    })

    return(
        <div>
        <label className="label">
            <span className="label-text">{title}</span>
        </label>
        <input onChange={onchange} type={'date'} placeholder={placeholder} className="input h-[38px] rounded-[4px] input-xs input-bordered w-full max-w-xs z-50" name={name} required={isRequired} defaultValue={value}/>
    </div>
    )

}


