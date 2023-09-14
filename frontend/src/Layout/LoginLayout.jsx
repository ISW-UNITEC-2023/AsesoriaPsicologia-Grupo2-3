import {ToastContainer} from "react-toastify";
import {Helmet} from "react-helmet-async";
import 'react-toastify/dist/ReactToastify.css';

export default function LoginLayout({children, pagina}) {
    return (
        <>
            <Helmet>
                <title>{`Unitec - ${pagina}`}</title>
            </Helmet>

            <main>
                {children}
            </main>
            <ToastContainer/>
        </>
    )
}