import {ToastContainer} from "react-toastify";
import {Helmet} from "react-helmet-async";
import 'react-toastify/dist/ReactToastify.css';

export default function CitasLayout({children, pagina}) {
    return (
        <>
            <Helmet>
                <title>{`Clínica - ${pagina}`}</title>
            </Helmet>

            <main>
                {children}
            </main>
            <ToastContainer/>
        </>
    )
}
