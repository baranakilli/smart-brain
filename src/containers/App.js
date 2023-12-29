import { Component } from 'react';
import ParticlesBg from 'particles-bg';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Navigation from '../components/Navigation/Navigation';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import Modal from '../components/Modal/Modal';
import Profile from '../components/Profile/Profile';
import './App.css';

const quarterWidthValue = window.innerWidth / 4;

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'login',
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    age: '',
    pet: '',
    joined: '',
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch('https://smart-brain-api-4igm.onrender.com/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          this.getProfile(data.id, token);
        })
        .catch(console.log);
    }
  }

  saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem('token', token);
  };

  getProfile = (dataId, token) => {
    if (dataId && token) {
      fetch(`https://smart-brain-api-4igm.onrender.com/profile/${dataId}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
        .then((resp) => resp.json())
        .then((user) => {
          if (user && user.email) {
            this.loadUser(user);
            this.onRouteChange('home');
          }
        });
    }
  };

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        age: data.age,
        pet: data.pet,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocations = (data) => {
    if (data && data.outputs) {
      const image = document.getElementById('input-image');
      const width = Number(image.width);
      const height = Number(image.height);
      return data.outputs[0].data.regions.map((face) => {
        const clarifaiFace = face.region_info.bounding_box;
        return {
          topRow: clarifaiFace.top_row * height,
          rightCol: width - clarifaiFace.right_col * width,
          bottomRow: height - clarifaiFace.bottom_row * height,
          leftCol: clarifaiFace.left_col * width,
        };
      });
    }
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onPictureSubmit = () => {
    if (this.state.input !== this.state.imageUrl) {
      this.setState({ imageUrl: this.state.input });
      fetch('https://smart-brain-api-4igm.onrender.com/imageurl', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + window.sessionStorage.getItem('token'),
        },
        body: JSON.stringify({
          input: this.state.input,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.outputs) {
            fetch('https://smart-brain-api-4igm.onrender.com/image', {
              method: 'put',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + window.sessionStorage.getItem('token'),
              },
              body: JSON.stringify({
                id: this.state.user.id,
              }),
            })
              .then((response) => response.json())
              .then((count) => {
                this.setState(
                  Object.assign(this.state.user, { entries: count })
                );
              })
              .catch(console.log);
          }
          const boxes = this.calculateFaceLocations(result);
          if (boxes) this.setState({ boxes });
        })
        .catch(console.log);
    }
  };

  onSignout = () => {
    fetch('https://smart-brain-api-4igm.onrender.com/signout', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.sessionStorage.getItem('token'),
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) window.sessionStorage.removeItem('token');
      });
  };

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({ isSignedIn: true });
    } else if (route === 'signout') {
      this.onSignout();
      this.setState(initialState);
      route = 'login';
    } else {
      this.setState(initialState);
    }
    this.setState({ route });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen,
    }));
  };

  render() {
    const { isSignedIn, route, imageUrl, boxes, isProfileOpen, user } =
      this.state;
    return (
      <div className="App">
        <ParticlesBg
          type="cobweb"
          color="#ffffff"
          num={quarterWidthValue}
          bg={true}
        />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
          route={route}
          toggleModal={this.toggleModal}
        />
        {isProfileOpen && (
          <Modal>
            <Profile
              loadUser={this.loadUser}
              toggleModal={this.toggleModal}
              user={user}
            />
          </Modal>
        )}
        {route === 'home' ? (
          <div>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </div>
        ) : route === 'login' ? (
          <Login
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
            getProfile={this.getProfile}
            saveAuthTokenInSession={this.saveAuthTokenInSession}
          />
        ) : route === 'register' ? (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
            getProfile={this.getProfile}
            saveAuthTokenInSession={this.saveAuthTokenInSession}
          />
        ) : (
          <h1 className="f1 dark-red">ERROR</h1>
        )}
      </div>
    );
  }
}

export default App;
