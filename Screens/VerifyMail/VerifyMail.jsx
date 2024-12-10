import { useParams } from "react-router-dom";
import { GET, getUnnauthenticatedHeaders } from "../../fetching/http.fetching";

export const VerifyMail = () => {
    const { verificationToken } = useParams()

    const response = GET(`https://back-drab-three.vercel.app/api/auth/verify/${verificationToken}`, {
        headers: getUnnauthenticatedHeaders(),
    })
    console.log(response);
    
    return (

        <div>
            {
                response.ok
                ?
                <h2>
                    Verificado!!!
                </h2>
                :
                <h2>
                    Tu email se verifico con exito!!! Anda a loguearte!!!👍😊👌🙌
                </h2>
            }
        </div>
    )
}