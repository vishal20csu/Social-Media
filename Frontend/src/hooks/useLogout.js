import { useState } from "react";
import { useAuthContext } from "../context/authContext";
import { toast } from "react-hot-toast";

const useLogout =() =>{
    const[loading, setLoading] = useState(false);
    const {setAuthUser}= useAuthContext();

    const logout = async ()=>{
        setLoading(true)
        try {
            const res= await fetch("/api/auth/logout",{
                method: "POST",
                headers: {"Content-Type" : "applications/json"}
            })

            const data= await res.json();
            localStorage.removeItem("user-credentials")
            setAuthUser(null)


            
        } catch (error) {
 
            toast.error(error.message);
            
        }finally{
            setLoading(false)
        }
    }
    return {loading, logout};
}

export default useLogout;