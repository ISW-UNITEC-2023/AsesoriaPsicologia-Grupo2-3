import { useRef, useEffect } from "react";
import * as echarts from "echarts";

const ChartBarSalesM = () => {
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
                    data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130, /* ... */],
                        type: 'bar'
                    }
                ]
            };
            chart.setOption(option);
        }
    }, []);

    return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
};

export default ChartBarSalesM;
