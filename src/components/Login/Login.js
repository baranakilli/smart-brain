import { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logInEmail: '',
      logInPassword: '',
    };
  }
  onEmailChange = (event) => {
    this.setState({ logInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ logInPassword: event.target.value });
  };

  onSubmitLogIn = () => {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
    fetch('https://smart-brain-api-4igm.onrender.com/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.logInEmail,
        password: this.state.logInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        } else {
          loader.style.display = 'none';
        }
      })
  };

  render() {
    return (
      <article className="br3 ba b--black-10 mb4 mt6 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0 pb0">
              <legend className="f2 fw6 ph0 mh0">Log In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mt3 mb1">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="mt3 flex justify-center">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Log in"
                onClick={this.onSubmitLogIn}
              />
              <div id="loader"></div>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Login;
