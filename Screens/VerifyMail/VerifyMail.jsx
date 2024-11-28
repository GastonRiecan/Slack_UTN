import recat from "react";
import { useParams } from "react-router-dom";
import { GET, getUnnauthenticatedHeaders } from "../../fetching/http.fetching";

export const VerifyMail = () => {
    const { verificationToken } = useParams()

    const response = GET(`http://localhost:3000/api/auth/verify/${verificationToken}`, {
        headers: getUnnauthenticatedHeaders(),
    })
    console.log(response);
    
    return (

        <div>
            {
                response.ok
                ?
                <h2>
                    Verificado
                </h2>
                :
                <h2>
                    No se logro verificar el mail
                </h2>
            }
        </div>
    )
}