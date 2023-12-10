import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const ChartBarSalesW = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const chart = echarts.init(chartRef.current);

            const option = {
                title: {
                    text: "Ventas Mensuales",
                    top: "5%",
                    left: "center",
                },
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: 'category',
                    data: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar'
                    }
                ]
            };
            chart.setOption(option);
        }
    }, []);

    return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
}

export default ChartBarSalesW;
