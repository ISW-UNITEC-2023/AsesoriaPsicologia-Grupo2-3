import { useRef, useEffect } from "react";
import * as echarts from "echarts";
import axios from "axios";
import useSWR from "swr";
import { Spinner } from "@material-tailwind/react";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const host = process.env.REACT_APP_API_BASE_URL;

export const ChartBarSalesM = () => {
  const {
    data: salesMonth,
    error: errorMonth,
    isLoading: loadingMonth,
  } = useSWR(host + "/stats/getMonthSales", fetcher, { refreshInterval: 1000 });

  const chartRef = useRef(null);

  useEffect(() => {
    if (!salesMonth) return;

    // Limpiar el chart
    echarts.dispose(chartRef.current);

    const chart = echarts.init(chartRef.current);

    const orderedMonths = Object.keys(salesMonth.data).sort((a, b) => {
      // Asumo que estás trabajando con nombres de meses en español
      const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      return months.indexOf(a) - months.indexOf(b);
    });

    const option = {
      title: {
        text: "Ingresos Mensuales",
        top: "5%",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: orderedMonths,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Ventas",
          type: "bar",
          barWidth: "50%",
          data: orderedMonths.map((month) => salesMonth.data[month]),
        },
      ],
    };

    chart.setOption(option);
  }, [salesMonth]);

  if (loadingMonth) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner />
      </div>
    );
  }

  if (errorMonth) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>Ha ocurrido un error al cargar las ventas mensuales</p>
      </div>
    );
  }

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
};

export default ChartBarSalesM;
