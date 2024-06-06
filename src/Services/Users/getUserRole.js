import { BACKEND_URL } from "../../constants/constants";

export const getUserRole =async (id)=>{
try {

    const request = await fetch(`${BACKEND_URL}/users/get/${id}`)
    const response = await request.json();
    return response

}
catch(err){
        console.log(err)
}}