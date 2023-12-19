import {ToastContainer} from "react-toastify";
import {Helmet} from "react-helmet-async";
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotLayout({children, pagina}) {
    return (
        <>
            <Helmet>
                <title>{`Clinica - ${pagina}`}</title>
            </Helmet>

            <main>
                {children}
            </main>
            <ToastContainer/>
        </>
    )
}