import axios from "axios";

import {  startOfWeek, endOfWeek, startOfMonth, endOfMonth, format, parseISO} from 'date-fns';


//obtener reportes
async function getReport(startDate, endDate){
    let data = JSON.stringify({
        "startDate": startDate,
        "endDate": endDate
    });
      
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:8000/reports/getReport',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
    };
      
    let response =  await axios.request(config)
    console.log(response);
    return response.data;
      
}


//estadisticas del dia
async function getStatsDay(){

    const today = new Date();
    const todayformat = format(today, 'yyyy-MM-dd')
    
    console.log("Today: ",todayformat);


    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:8000/reports/getReport?startDate=${todayformat}&endDate=${todayformat}`,
        headers: { },
      };
    
      let response = await axios.request(config)
      

      
    let totalSales = 0;
  
    console.log(response.data);
    
    response.data.forEach(venta => {
        if(venta.state_appointment ==  "COMPLETA")
        {
            totalSales = totalSales + parseInt(venta.payment_amount,10);
        }
    });
    
    console.log("Total: ", totalSales);
    return totalSales;
      
}



//estadistica de la semana
async function getStatsWeek(){

    const today = new Date();
    const startDate = startOfWeek(today) 
    const stardateformt = format(startDate, 'yyyy-MM-dd')
    const endDate = endOfWeek(today) 
    const enddateformt = format(endDate, 'yyyy-MM-dd')
    

   
      
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:8000/reports/getReport?startDate=${stardateformt}&endDate=${enddateformt}`,
        headers: { },
      };
    
      let response = await axios.request(config)
      

      
    let totalSales = 0;
  
    console.log(response.data);
    
    response.data.forEach(venta => {
        if(venta.state_appointment ==  "COMPLETA")
        {
            totalSales = totalSales + parseInt(venta.payment_amount,10);
        }
    });
    
    console.log("Total: ", totalSales);
    return totalSales;
      
}

//estadisticas del mes
async function getStatsMonth(){

    const today = new Date();
    const startDate = startOfMonth(today) 
    const stardateformt = format(startDate, 'yyyy-MM-dd')
    const endDate = endOfMonth(today) 
    const enddateformt = format(endDate, 'yyyy-MM-dd')

    console.log("Incio: ", stardateformt);
    console.log("Final: ", enddateformt);
    

   
      
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:8000/reports/getReport?startDate=${stardateformt}&endDate=${enddateformt}`,
        headers: { },
      };
    
      let response = await axios.request(config)
      

      
    let totalSales = 0;
  
    console.log(response.data);
    
    response.data.forEach(venta => {
        if(venta.state_appointment ==  "COMPLETA")
        {
            totalSales = totalSales + parseInt(venta.payment_amount,10);
        }
    });
    
    console.log("Total: ", totalSales);
    return totalSales;
      
}



//ESTADISTICAS PARA LA GRAFICA POR MESES

async function getStatsMonthGrafic(){

    //No seria mejor que obtuviera desde todo el a;o asi si te tomaria los demas meses y no solo el de la fecha
    const today = new Date();
    // const startDate = startOfMonth(today) 
    // const stardateformt = format(startDate, 'yyyy-MM-dd')
    // const endDate = endOfMonth(today) 
    // const enddateformt = format(endDate, 'yyyy-MM-dd')


    const stardateformt =  `${today.getFullYear()}:01:1`
    const enddateformt =  `${today.getFullYear()}:12:31`
    console.log("Incio: ", stardateformt);
    console.log("Final: ", enddateformt);
    

   
      
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:8000/reports/getReport?startDate=${stardateformt}&endDate=${enddateformt}`,
        headers: { },
      };
    
      let response = await axios.request(config)
      

      
    const ventasPorMes = {};
  
    console.log(response.data);
    
    response.data.forEach(venta => {
        const nombreMes = format(parseISO(venta.appointment_date), 'MMMM');
        
        //const nombreMesCapitalizado = nombreMes.charAt(0).toUpperCase + nombreMes.slice(1);
        
        if(!ventasPorMes[nombreMes])
        {
            ventasPorMes[nombreMes] = 0;
        }

        if(venta.state_appointment ==  "COMPLETA")
        {
            ventasPorMes[nombreMes] += parseInt(venta.payment_amount,10);
        }
    });

    for(const key in ventasPorMes)
    {
        ventasPorMes[key]= parseFloat(ventasPorMes[key].toFixed(2));
    }
    
    console.log("Total: ", ventasPorMes);
    return ventasPorMes;
      
}

//estadisitica de ventas de lso dias de la semana para la grafica

async function getStatsWeekGrafic(){

    //No seria mejor que obtuviera desde todo el a;o asi si te tomaria los demas meses y no solo el de la fecha
    const today = new Date();
    const startDate = startOfWeek(today) 
    const stardateformt = format(startDate, 'yyyy-MM-dd')
    const endDate = endOfWeek(today) 
    const enddateformt = format(endDate, 'yyyy-MM-dd')

    console.log("Incio: ", stardateformt);
    console.log("Final: ", enddateformt);
    

   
      
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:8000/reports/getReport?startDate=${stardateformt}&endDate=${enddateformt}`,
        headers: { },
      };
    
      let response = await axios.request(config)
      

      
    const ventasPorDias = {};
  
    console.log(response.data);
    
    response.data.forEach(venta => {
        const nombreDia = format(parseISO(venta.appointment_date), 'EEEE');
        console.log("dia: ", nombreDia);
        //const nombreMesCapitalizado = nombreMes.charAt(0).toUpperCase + nombreMes.slice(1);
        
        if(!ventasPorDias[nombreDia])
        {
            ventasPorDias[nombreDia] = 0;
        }

        if(venta.state_appointment ==  "COMPLETA")
        {
            ventasPorDias[nombreDia] += parseInt(venta.payment_amount,10);
        }
    });

    for(const key in ventasPorDias)
    {
        ventasPorDias[key]= parseFloat(ventasPorDias[key].toFixed(2));
    }
    
    console.log("Total: ", ventasPorDias);
    return ventasPorDias;
      
}

export default {
    getReport,
    getStatsDay,
    getStatsWeek,
    getStatsMonth,
    getStatsMonthGrafic,
    getStatsWeekGrafic,
}
