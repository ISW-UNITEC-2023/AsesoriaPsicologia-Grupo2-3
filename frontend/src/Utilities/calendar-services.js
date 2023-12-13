import axios from "axios";

export async function createEvent(title, url, start, end,)
{
  let data = JSON.stringify({
    
    "title": title, 
    }
  );

  console.log(data);
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:8000/api/meetings/6KUo64WFSiOt8Xhltqol-w',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });

    
}


export async function getEvents(userId) {
  try {
    const response = await axios.get('http://localhost:8000/api/users/6KUo64WFSiOt8Xhltqol-w/meetings');
    return response.data;
  } catch (error) {
    console.error("Error al obtener reuniones:", error);
    throw error;
  }
}
