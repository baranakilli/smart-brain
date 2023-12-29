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
      .then((data) => {
        if (data.userId && data.success) {
          this.props.saveAuthTokenInSession(data.token)
          this.props.getProfile(data.userId, data.token);
        } else {
          loader.style.display = 'none';
        }
      });
  };

  onKeyPressed = (keyInfo) => {
    if (keyInfo.keyCode === 13) this.onSubmitLogIn();
  };

  onSkipLogin = () => {
    this.setState({ logInEmail: 'test@gmail.com' });
    this.setState({ logInPassword: 'test' }, () => {
      this.onSubmitLogIn();
    });
  }

  render() {
    return (
      <div>
        <article className="br3 ba b--black-10 mb4 mt6 w-90 w-50-m w-25-l mw6 shadow-5 center">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f2 fw6 ph0 mh0">Log In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100 hover-input"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.onEmailChange}
                    onKeyDown={this.onKeyPressed}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="b pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100 hover-input"
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange}
                    onKeyDown={this.onKeyPressed}
                  />
                </div>
              </fieldset>
              <div className="flex justify-center">
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
        <div className="br3 ba b--black-10 shadow-5 w-80 w-40-m w-20-l mw6 center">
          <div className='pv2'>
            <h6>For Recruiters, Click to Skip</h6>
            <button className="b ph2 pv1 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.onSkipLogin}>
              Skip
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
