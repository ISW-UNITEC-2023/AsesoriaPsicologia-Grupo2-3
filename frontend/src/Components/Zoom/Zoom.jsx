import "./zoom.css"
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavigationB from "../Navbar";
import {cMeeting} from "../../Utilities/zoom-services";

function MyZoom()
{
    const [topic , setTopic] = useState("");
    const [description, setdescription] = useState("");
    const [fechaHora, setFechaHora] = useState("");
    const [duracionHour, setDuracionHour] = useState("");
    const [duracionMin, setDuracionMin] = useState("");
    // eslint-disable-next-line
    const [timeZone, setTimeZone] = useState("");
    // eslint-disable-next-line
    const [recurring, setRecurring] = useState("");
    const [registration, setRegistration] = useState("false");
    const [securityPasscode, setSecurityPasscode] = useState("289399");
    const [securityWaitroom, setSecurityWaitroom] = useState("false");
    const [securityUserAuth, setSecurityUserAuth] = useState("false");
    const [videoHost, setVideoHost] = useState("false");
    const [videoPaticipant, setVideoPaticipant] = useState("false");
    const [meetingHost, setMeetingHost] = useState("false");
    const [meetingMute, setMeetingMute] = useState("false");
    // eslint-disable-next-line
    const [meetingAllow, setMeetingAllow] = useState("");
    const [meetingPersonalId, setMeetingPersonalId] = useState("false");
    const [meetingRecord, setMeetingRecord] = useState("false");
    const [audio, setAudio] = useState("both");
    const [alternative, setAlternative] = useState("");


    const CreateMeet = async (topic, description, fecha, duracion, hostvideo, participantvideo,hostmeeting, mutemeeting, recordmeeting, registration, waiting, passcode , auth,audi, upid,alterhost)=>{
        let recordingss = "local";
        if(recordmeeting === "false")
        {
            recordingss ="cloud";
        }
        let registration2 = 1;
        if(registration === "false")
        {
            registration2 = 0;
        }

        console.log(registration2);
        await cMeeting(topic, description, fecha, duracion, hostvideo, participantvideo,hostmeeting, `${mutemeeting}`, recordingss,registration2,waiting, passcode, auth, audi,upid,alterhost);
        //console.log(response);
        //console.log(response.data);
    }
    return(
        <>
            <div className="dashboard-container">
                <NavigationB/>
                <div style={{ width: "90%" }}>
                    
                    <div className="container-header">
                        <h1 className="title-pacientes">Zoom</h1>

                    </div>
                    <div className="container-controls">
                    
                        <Container fluid="md">
                            <Row>
                                <Col style={{display:"flex", alignItems:"flex-end", borderBottom: "1px solid #360404d5" , padding:"15px"}} xs="4">
                                    <Form.Label>Tema</Form.Label>
                                </Col>

                                <Col style={{display:"flex", alignItems:"flex-end", borderBottom: "1px solid #360404d5", padding:"15px"}} >
                                    <Form.Control type="Topic" placeholder="Insertar Tema" value={topic} onChange={ev=> setTopic(ev.target.value)} />
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{display:"flex", alignItems:"flex-start", borderBottom: "1px solid #360404d5" , padding:"15px"}} xs="4">
                                    <Form.Label>Descripción(opcional)</Form.Label>
                                </Col>

                                <Col style={{borderBottom: "1px solid #360404d5" , padding:"15px"}} >
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" placeholder="Insertar Descripción" rows={3} value={description} onChange={ev=> setdescription(ev.target.value)}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{display:"flex", alignItems:"flex-start", borderBottom: "1px solid #360404d5" , padding:"15px"}} xs="4">
                                    <Form.Label>Cuando</Form.Label>
                                </Col>

                                <Col style={{display:"flex", alignItems:"flex-start",flexDirection:"row", borderBottom: "1px solid #360404d5" , padding:"15px"}} >
                                    <Form.Control
                                    type="datetime-local" 
                                    placeholder="" 
                                    
                                    onChange={ev=> setFechaHora(ev.target.value)}
                                    style={{ width: "34%", marginRight: "10px" }}/>

                                
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{display:"flex", alignItems:"flex-start", borderBottom: "1px solid #360404d5" , padding:"15px"}} xs="4">
                                    <Form.Label>Duración</Form.Label>
                                </Col>

                                <Col style={{display:"flex", alignItems:"flex-start",flexDirection:"row", borderBottom: "1px solid #360404d5" , padding:"15px"}} >
                                    <Form.Control
                                    required
                                    type="number"
                                    placeholder="cantidad"
                                    defaultValue="0"
                                    min={0}
                                    max={5}
                                    onChange={ev=> setDuracionHour(ev.target.value)}
                                    style={{ width: "8%", marginRight: "10px" }}
                                    />
                                    <p style={{paddingTop:"6px"}}>hr</p>

                                    <Form.Control
                                    required
                                    type="number"
                                    placeholder="cantidad"
                                    defaultValue="0"
                                    min={0}
                                    max={59}
                                    onChange={ev=> setDuracionMin( ev.target.value)}
                                    
                                    style={{ width:"10%", marginRight: "10px", marginLeft:"10px" }}
                                    />
                                    <p style={{paddingTop:"6px"}}>min</p>
                                </Col>

                            
                            </Row>
                            <Row>
                                <Col style={{display:"flex", alignItems:"flex-start", borderBottom: "1px solid #360404d5" , padding:"15px"}} xs="4">
                                    <Form.Label>Zona Horaria</Form.Label>
                                </Col>

                                <Col style={{display:"flex", alignItems:"flex-start",flexDirection:"column", borderBottom: "1px solid #360404d5" , padding:"15px"}} >
                                    <Form.Select aria-label="Default select example" onChange={ev=> setTimeZone( ev.target.value)} >
                                        <option value="na">Open this select menu</option>
                                        <option value="Z">(GMT-7:00)Pacific Time (US and Canada)</option>
                                        <option value="2">(GMT-7:00)Pacific Time (US and Canada)</option>
                                        <option value="3">(GMT-7:00)Pacific Time (US and Canada)</option>
                                    </Form.Select>

                                    <Form>
                                        {['checkbox'].map((type) => (
                                            <div key={`default-${type}`} className="mb-3">
                                            <Form.Check onChange={ev=> setRecurring( ev.target.checked)}// prettier-ignore
                                                type={type}
                                                id={`default-${type}`}

                                                label={"Reunión recurrente"}
                                            />
                                            </div>
                                        ))}
                                    </Form>

                                </Col>
                            </Row>
                            <Row>
                                <Col style={{display:"flex", alignItems:"flex-start", borderBottom: "1px solid #360404d5" , padding:"15px"}} xs="4">
                                    <Form.Label>Registro</Form.Label>
                                </Col>

                                <Col style={{display:"flex", alignItems:"flex-start", borderBottom: "1px solid #360404d5" , padding:"15px"}} >
                                    <Form >
                                        {['checkbox'].map((type) => (
                                            <div key={`default-${type}`} className="mb-3">
                                            <Form.Check onChange={ev=> setRegistration( ev.target.checked)}
                                                type={type}
                                                id={`default-${type}`}
                                                label={"Requerido"}
                                            />

                                        
                                            </div>
                                        ))}
                                    </Form>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{display:"flex", alignItems:"flex-start", borderBottom: "1px solid #360404d5" , padding:"15px"}} xs="4">
                                    <Form.Label>Seguridad</Form.Label>
                                </Col>

                                <Col style={{display:"flex", alignItems:"flex-start",flexDirection:"column", borderBottom: "1px solid #360404d5" , padding:"15px"}} >
                                        <div style={{ display:"flex",alignItems:"flex-start"}}>
                                            <Form >
                                            {['checkbox'].map((type) => (
                                                <div key={`default-${type}`} className="mb-3">
                                                <Form.Check 
                                                    
                                                    disabled
                                                    checked
                                                    type={type}
                                                    label={"Passcode"}
                                                    id={`disabled-default-${type}`}
                                                    style={{marginTop:"5px"}}
                                                />
                                                
                                                
                                                </div>
                                                
                                            ))}
                                            </Form>
                                            <Form.Control  style={{marginLeft:"10px", width: "100px", marginBottom:"0px"}} onChange={ev=> setSecurityPasscode( ev.target.value)} type="email" defaultValue="289399" />
                                    </div>
                                    <Form.Text className="text-muted" >
                                        Solo los usuarios con el link de invitacion o el passcode podran entrar a la reunion
                                    </Form.Text>
                                    
                                    <Form style={{marginTop:"35px", marginBottom:"0px"}}>
                                        {['checkbox'].map((type) => (
                                            <div key={`default-${type}`} className="mb-3">
                                            <Form.Check onChange={ev=> setSecurityWaitroom( ev.target.checked)}
                                                type={type}
                                                id={`default-${type}`}
                                                label={"Sala de espera"}
                                            />

                                        
                                            </div>
                                        ))}

                                        <Form.Text className="text-muted" >
                                        Solo los usuarios que el host permita podran entrar a la reunion
                                        </Form.Text>
                                    </Form>

                                    

                                    <Form style={{marginTop:"35px"}}>
                                        {['checkbox'].map((type) => (
                                            <div key={`default-${type}`} className="mb-3">
                                            <Form.Check // prettier-ignore
                                                type={type}
                                                onChange={ev=> setSecurityUserAuth( ev.target.checked)}
                                                id={`default-${type}`}
                                                label={"Solo usuarios autenticados pueden entrar a la reunión "}
                                            />

                                        
                                            </div>
                                        ))}
                                    </Form>
                                        
                                </Col>
                                
                            </Row>
                            <Row>
                                <Col style={{display:"flex", alignItems:"flex-start", borderBottom: "1px solid #360404d5" , padding:"15px"}} xs="4">
                                    <Form.Label>Video</Form.Label>
                                </Col>
                                <Col style={{display:"flex", alignItems:"flex-start",flexDirection:"column", borderBottom: "1px solid #360404d5" , padding:"15px"}} xs="1">
                                    <div >
                                    <Form.Label style={{ marginBottom:"26px"}}>Host</Form.Label>
                                    <Form.Label >Paticipante</Form.Label>
                                    </div>
                                </Col>
                                <Col style={{display:"flex", alignItems:"flex-start",flexDirection:"column", borderBottom: "1px solid #360404d5" , padding:"15px"}} >
                                
                                        <Form >
                                        {['checkbox'].map((type) => (
                                            <div key={`default-${type}`} className="mb-3" style={{marginLeft:"10%"}}>
                                            <Form.Check 
                                                
                                                style={{marginRight:"20px"}}
                                                type={type}
                                                onChange={ev=> setVideoHost( ev.target.checked)}
                                                id={`default-${type}`}
                                                
                                            />

                                            
                                            </div>
                                        ))}
                                        </Form>
                                    
                                    
                                        
                                        <Form >
                                        {['checkbox'].map((type) => (
                                            <div key={`default-${type}`} className="mb-3" style={{marginLeft:"10%"}}>
                                            <Form.Check 
                                                style={{marginRight:"20px"}}
                                                type={type}
                                                id={`default-${type}`}
                                                onChange={ev=> setVideoPaticipant( ev.target.checked) }
                                                
                                            />

                                            
                                            </div>
                                        ))}
                                    </Form>
                                    
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{display:"flex", alignItems:"flex-start", borderBottom: "1px solid #360404d5" , padding:"15px"}} xs="4">
                                    <Form.Label>Audio</Form.Label>
                                </Col>
                                
                                <Col style={{display:"flex", alignItems:"flex-start", borderBottom: "1px solid #360404d5" , padding:"15px"}} >
                                <Form >
                                        {['radio'].map((type) => (
                                            <div key={`inline-${type}`} className="mb-3" style={{display: "flex"}}>
                                            <Form.Check 
                                                inline
                                                name="group1"
                                                style={{marginRight:"20px"}}
                                                type={type}
                                                id={`inline-${type}-1`}
                                                value="telephony"
                                                onChange={ev=> setAudio( ev.target.value)}
                                                label={"Telefono"}
                                            />

                                            <Form.Check // prettier-ignore
                                                inline
                                                name="group1"
                                                style={{marginRight:"20px"}}
                                                type={type}
                                                value="voip"
                                                onChange={ev=> setAudio( ev.target.value)}
                                                id={`inline-${type}-1`}
                                                label={"Audio de la Computadora"}
                                            />

                                            <Form.Check // prettier-ignore
                                                inline
                                                name="group1"
                                                id={`inline-${type}-1`}
                                                type={type}
                                                defaultChecked
                                                value="both"
                                                onChange={ev=> setAudio( ev.target.value)}
                                            
                                                label={"Telefono y audio de la computadora"}
                                            />
                                            </div>
                                        ))}
                                        </Form>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{display:"flex", alignItems:"flex-start", borderBottom: "1px solid #360404d5" , padding:"15px"}} xs="4">
                                    <Form.Label>Opciones de la reunión </Form.Label>
                                </Col>

                                <Col style={{display:"flex", alignItems:"flex-start",flexDirection:"column", borderBottom: "1px solid #360404d5" , padding:"15px"}} >
                                <Form >
                                        {['checkbox'].map((type) => (
                                            <div key={`default-${type}`} className="mb-3" >
                                            <Form.Check 
                                                style={{marginBottom:"20px"}}
                                                type={type}
                                                id={`default-${type}`}
                                                onChange={ev=> setMeetingHost( ev.target.checked)}
                                                label={"Habilitar unirse antes que el host"}
                                            />

                                            <Form.Check // prettier-ignore
                                                style={{marginBottom:"20px"}}
                                                type={type}
                                                onChange={ev=> setMeetingMute( ev.target.checked)}
                                                id={`default-${type}`}
                                                label={"Silenciar a las participantes al entrar"}
                                            />

                                            <Form.Check // prettier-ignore
                                                type={type}
                                                style={{marginBottom:"20px"}}
                                                defaultChecked
                                                onChange={ev=> setMeetingAllow( ev.target.checked)}
                                                id={`default-${type}`}
                                                label={"Permitir compartir pantalla"}
                                            />

                                            <Form.Check // prettier-ignore
                                                style={{marginBottom:"20px"}}
                                                type={type}
                                                onChange={ev=> setMeetingPersonalId( ev.target.checked)}
                                                id={`default-${type}`}
                                                label={"Usar ID de reunión personal -------"}
                                            />
                                            <div style={{display:"flex", flexDirection:"column"}}>
                                            <Form.Label style={{marginLeft:"20px"}}>Un participante puede compartir pantalla a la vez</Form.Label>
                                            
                                            <Form.Label style={{marginLeft:"20px"}}>Quien puede compartir pantalla?: ALL Participants (Todos los participantes)</Form.Label>

                                            <Form.Label style={{marginLeft:"20px"}}>Quien puede empezar a compartir mientras otra esta compartiendo?:Host Only (Solo el Host)</Form.Label>

                                            </div>
                                            <Form.Check // prettier-ignore
                                                style={{marginBottom:"20px"}}
                                                type={type}
                                                onChange={ev=> setMeetingRecord( ev.target.checked)}
                                                id={`default-${type}`}
                                                label={"Grabe la reunión automáticamente en la computadora local"}
                                            />
                                            </div>
                                        ))}
                                        </Form>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{display:"flex", alignItems:"flex-start", borderBottom: "1px solid #360404d5" , padding:"15px"}} xs="4">
                                    <Form.Label>Host alternativo</Form.Label>
                                </Col>

                                <Col style={{ borderBottom: "1px solid #360404d5" , padding:"15px"}} >
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Correo electronico</Form.Label>
                                        <Form.Control type="email" placeholder="name@example.com" onChange={ev=> setAlternative( ev.target.value)}/>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col style={{display:"flex", justifyContent:"space-evenly", borderBottom: "1px solid #360404d5" , padding:"15px"}} >
                                    <Button variant="outline-primary"  href="/ZoomV" onClick={()=>{CreateMeet(topic,description,`${fechaHora}:00Z`,`${+(duracionHour*60)+(+duracionMin)}`, videoHost,videoPaticipant,meetingHost,meetingMute,meetingRecord,registration, securityWaitroom,securityPasscode,securityUserAuth, audio, meetingPersonalId, alternative)}} style={{width:"10%"}}>Crear</Button>
                                    <Button variant="outline-primary" href="/ZoomV"  onClick={()=>{
                                    
                                    }} style={{width:"10%"}}>Cancelar</Button>
                                </Col>
                            </Row>

                        </Container>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyZoom;