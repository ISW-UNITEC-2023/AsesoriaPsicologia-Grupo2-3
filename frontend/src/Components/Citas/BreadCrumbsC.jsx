import {Breadcrumbs} from "@material-tailwind/react";

const BreadCrumbsC = ({nombrePaciente}) => {
    return (
        <Breadcrumbs>
            <a href="/pacientes" className="opacity-60">
                Pacientes
            </a>
            <a href="#" className="opacity-60">
                {nombrePaciente}
            </a>
            <a href="/citas" className="opacity-60">
                Agendar Cita
            </a>
        </Breadcrumbs>
    )
}

export default BreadCrumbsC;
