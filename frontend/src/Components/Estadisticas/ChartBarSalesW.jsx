import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import axios from "axios";
import useSWR from "swr";
import { Spinner } from "@material-tailwind/react";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const host = process.env.REACT_APP_API_BASE_URL;

const ChartBarSalesW = () => {
  const {
    data: salesWeek,
    error: errorWeek,
    isLoading: loadingWeek,
  } = useSWR(host + "/stats/getWeekSales", fetcher, { refreshInterval: 1000 });

  const chartRef = useRef(null);

  useEffect(() => {
    if (!salesWeek) return;

    // Limpiar el chart
    echarts.dispose(chartRef.current);

    const chart = echarts.init(chartRef.current);

    const orderedDays = Object.keys(salesWeek.data).sort((a, b) => {
      // Asumo que estás trabajando con nombres de días en español
      const daysOfWeek = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
      ];
      return daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b);
    });

    const option = {
      title: {
        text: "Ingresos Semanales",
        top: "5%",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: orderedDays,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Ventas",
          type: "bar",
          barWidth: "50%",
          data: orderedDays.map((day) => salesWeek.data[day]),
        },
      ],
    };

    chart.setOption(option);
  }, [salesWeek]);

  if (loadingWeek) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner />
      </div>
    );
  }

  if (errorWeek) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>Ha ocurrido un error al cargar las ventas semanales</p>
      </div>
    );
  }

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
};

export default ChartBarSalesW;
