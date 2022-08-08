import './App.css';
import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles"; 

//particlesInit and optionsParticles are all for the moving background
const particlesInit = async (main) => {
  console.log(main);
  await loadFull(main);
};

const optionsParticles = {
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.1,
      width: 1,
    },
    collisions: {
      enable: false,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 500,
      },
      value: 80,
    },
    opacity: {
      value: .01,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
}

const particlesLoaded = (container) => {
  console.log(container);
};

const initialState = {
  input:'',
  imageUrl:'',
  boxes:[],
  route: 'signin',
  isSignedIn: false,
  user: {
    //this was copied from the backend -> face-recognition-api
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) =>{
    const clarifaiFaces = data.outputs[0].data.regions;
    const image = document.getElementById('inputimage');
    //want to get the width and height of the original image so we can use the region info (which will be as a percentage) to draw the regions of the box

    const width = Number(image.width);
    const height = Number(image.height);

    const facesArray = clarifaiFaces.map(face => (
      {
      leftCol: face.region_info.bounding_box.left_col * width,
      topRow: face.region_info.bounding_box.top_row * height,
      rightCol: width - (face.region_info.bounding_box.right_col * width),
      bottomRow: height - (face.region_info.bounding_box.bottom_row * height)
      }
    ))
    return facesArray;
  }

  displayFaceBox = (boxes) =>{
    this.setState({boxes: boxes}, () => console.log(this.state.boxes));
  }

  onInputChange =(event) =>{
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input});
    //need to send the input the user wants for face-detection to the API in order to get results back about the region of the face
      fetch('http://localhost:3000/imageurl',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response){
          fetch('http://localhost:3000/image',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count =>{
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          //Error Handling - good practice to catch after .then/fetch statements
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (destination) => {
    if(destination === 'signout'){
      this.setState({initialState})
    } else if (destination === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: destination})
  }
  
  render(){
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App">
        <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={optionsParticles}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home'?
          <div>
            <Logo />
            <Rank 
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition 
              boxes={boxes} 
              imageUrl={imageUrl}
            />
          </div>
          
          : (
            route === 'signin' 
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )

        }
      </div>
    );
    }
}


export default App;
