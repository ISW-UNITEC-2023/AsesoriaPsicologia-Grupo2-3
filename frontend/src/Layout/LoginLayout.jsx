import {ToastContainer} from "react-toastify";
import {Helmet} from "react-helmet-async";
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

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

LoginLayout.propTypes = {
    children: PropTypes.node, 
    pagina: PropTypes.string,
};