import NavigationBar from "../Components/NavigationBar.jsx";
import "../Styles/CSS/AboutUsStyle.css";

function AboutUs(props){
    const {misionIcon, visionIcon, historyIcon} = props;

    return (
      <div >
          <div className="navigation-bar">
            <NavigationBar {...props}/>
          </div>
          <div className="div-mision">
            <div className="div-background">
              <div className="container-mision">
                <h1 className="title-au">Misión</h1>
                <span className="text-au">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu diam sit amet nibh venenatis malesuada nec in erat. Proin convallis risus et nunc eleifend vestibulum. Aenean luctus, felis quis porttitor laoreet, nisl ex rhoncus purus, vel rutrum metus purus non neque. Aenean lectus nunc, bibendum auctor ullamcorper ac, consectetur eget sapien. Sed finibus convallis cursus. Nulla iaculis condimentum tortor in iaculis. Duis ultrices nisl ut nulla faucibus elementum mollis et augue. Nulla sodales luctus risus at vestibulum. Sed eget consectetur turpis, in lobortis velit. Nullam quis augue volutpat, viverra eros eget, pretium elit. Aliquam consequat, purus non suscipit porta, lectus tortor vehicula tortor, nec cursus felis ante rhoncus tellus. In sed urna nibh. Sed dui purus, mattis ut nunc nec, laoreet interdum felis. </span>
              </div>
              <img src={misionIcon} className="img-vision" alt=""></img>
            </div>
          </div>
          <div className="bloque-division"></div>
          <div className="div-vision">
            <div className="div-background">
              <img src={visionIcon} className="img-vision" alt=""></img>
              <div className="container-vision">
                <h1 className="title-au">Vision</h1>
                <p className="text-au">Nullam in pellentesque ipsum. Donec pharetra bibendum libero, at tincidunt urna iaculis quis. Curabitur at diam suscipit, maximus ante non, condimentum eros. Aliquam aliquam enim quis sapien interdum, eu vestibulum lectus tincidunt. Sed ut interdum mi. Vivamus lacus libero, varius sed volutpat nec, consectetur a lorem. Aenean convallis mauris at lorem bibendum, id tempor lacus porttitor. Proin sem velit, pellentesque vel nibh a, maximus blandit mi. Quisque consequat ligula massa, ut condimentum eros posuere in. In lectus massa, dapibus eget elit eget, laoreet gravida nisl.</p>
              </div>
            </div>
          </div>
          <div className="bloque-division"></div>
          <div className="div-historia">
            <div className="div-background">
              <div className="container-historia">
                <h1 className="title-au">Historia</h1>
                <p className="text-au">Nam sagittis mi eros, eu commodo mi elementum in. Morbi tellus diam, pharetra vel varius sit amet, convallis sed arcu. Etiam vitae cursus sapien. Donec in magna eros. Sed viverra arcu non ultricies vehicula. Maecenas id placerat purus, ac semper arcu. Aliquam ut vestibulum ligula. Vivamus porta, leo sit amet cursus viverra, lectus metus congue libero, eget tincidunt libero metus eget ante. Vestibulum vitae libero arcu. Cras mi libero, sodales hendrerit leo et, aliquet tincidunt dolor. Nam in urna viverra urna rhoncus scelerisque. Phasellus eleifend leo ut orci volutpat, in euismod leo mollis. Vivamus vulputate, nibh ut porttitor luctus, leo odio tincidunt nisi, id tempor erat dolor a dolor. </p>
              </div>
              <img src={historyIcon} className="img-vision" alt=""></img>
            </div>
          </div>
          <div className="bloque-division"></div>
      </div>
    );
}


export default AboutUs;