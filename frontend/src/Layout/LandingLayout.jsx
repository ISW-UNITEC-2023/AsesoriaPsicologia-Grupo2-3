import {ToastContainer} from "react-toastify";
import {Helmet} from "react-helmet-async";

export default function LandingLayout({children, pagina}) {
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
