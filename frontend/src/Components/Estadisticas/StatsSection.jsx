import axios from "axios";
import useSWR from "swr";
import {Spinner} from "@material-tailwind/react";
import {formatMoney} from "../../Helpers";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const StatsSection = () => {
    const {
        data: salesWeek,
        error: errorWeek,
        isLoading: loadingWeek
    } = useSWR('http://localhost:8000/stats/getStatsWeek', fetcher, {refreshInterval: 1000});

    const {
        data: salesDay,
        error: errorDay,
        isLoading: loadingDay
    } = useSWR('http://localhost:8000/stats/getStatsDay', fetcher, {refreshInterval: 1000});

    const {
        data: salesMonth,
        error: errorMonth,
        isLoading: loadingMonth
    } = useSWR('http://localhost:8000/stats/getStatsMonth', fetcher, {refreshInterval: 1000});

    if (loadingWeek || loadingDay || loadingMonth) {
        return (
            <div className="flex justify-center items-center mt-10">
                <Spinner/>
            </div>
        );
    }

    if (errorWeek || errorDay || errorMonth) {
        return (
            <div className="flex justify-center items-center">
                <p className="text-red-500">Error al cargar las estadísticas</p>
            </div>
        );
    }


    return (
        <div className="container my-6 mx-auto md:px-6">
            <section className="mb-10 text-center">
                <p className="mb-10 text-2xl font-bold" style={{color: "#26586c"}}>
                    Estadísticas de Ingresos
                </p>
                <div className="grid lg:grid-cols-3 lg:gap-x-12">
                    <div className="mb-16 lg:mb-0">
                        <div
                            className="block h-auto rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                            <div className="flex justify-center">
                                <div
                                    className="-mt-8 inline-block rounded-full bg-primary-100 p-4 text-primary shadow-md"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="mb-4 text-2xl font-bold" style={{color: "#26586c"}}>
                                    {salesWeek ? formatMoney(salesWeek.data) : formatMoney(0)}
                                </h3>
                                <h5 className="mb-4 text-lg font-medium">Ingreso de la Semana</h5>
                            </div>
                        </div>
                    </div>

                    <div className="mb-16 lg:mb-0">
                        <div
                            className="block h-auto rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                            <div className="flex justify-center">
                                <div
                                    className="-mt-8 inline-block rounded-full bg-primary-100 p-4 text-primary shadow-md"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="mb-4 text-2xl font-bold" style={{color: "#26586c"}}>
                                    {salesDay ? formatMoney(salesDay.data) : formatMoney(0)}
                                </h3>
                                <h5 className="mb-4 text-lg font-medium">Ingreso del Día</h5>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div
                            className="block h-auto rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                            <div className="flex justify-center">
                                <div
                                    className="-mt-8 inline-block rounded-full bg-primary-100 p-4 text-primary shadow-md"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="mb-4 text-2xl font-bold" style={{color: "#26586c"}}>
                                    {salesMonth ? formatMoney(salesMonth.data) : formatMoney(0)}
                                </h3>
                                <h5 className="mb-4 text-lg font-medium">Ingreso del Mes</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default StatsSection;
