import { BACKEND_URL } from "../../constants/constants";

export const createUserRole =async (id)=>{
    fetch(`${BACKEND_URL}/users/add`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({id, role:'initial'})
    })
    .then(async (res) => {
        const response = await res.json()
        return response;
    }).catch((err)=>{
        console.log(err)
    })
}