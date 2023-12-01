import axios from "axios";


export async function cMeeting(topic,description, estarttime,duration,videohost,participanvideo, meetingshost, mute, recording, registration, waiting, passcode, athud, audio , upid,alterH)
{
    
  let data = JSON.stringify({
    "topic": topic,
    "type": 2,
    "agenda":description,
    "start_time": estarttime,
    "duration": duration,
    "password":passcode,
    "settings": {
        "host_video": videohost,
        "participant_video": participanvideo,
        "join_before_host": meetingshost,
        "meeting_authentication": athud,
        "mute_upon_entry": mute,
        "watermark": "true",
        "use_pmi": upid,
        "waiting_room": waiting,
        "audio": audio,
        "alternative_hosts": alterH,
        "auto_recording": recording,
        "approval_type":registration,
    
    }
  });
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



export async function gMeeting(userId) {
  try {
    const response = await axios.get('http://localhost:8000/api/users/6KUo64WFSiOt8Xhltqol-w/meetings');
    return response.data;
  } catch (error) {
    console.error("Error al obtener reuniones:", error);
    throw error;
  }
}
