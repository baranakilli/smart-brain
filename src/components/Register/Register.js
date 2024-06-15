import { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitRegister = () => {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
    fetch(
      'https://smart-face-detector-api-production.up.railway.app/register',
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.userId && data.success) {
          this.props.saveAuthTokenInSession(data.token);
          this.props.getProfile(data.userId, data.token);
        } else {
          loader.style.display = 'none';
        }
      });
  };

  onKeyPressed = (keyInfo) => {
    if (keyInfo.keyCode === 13) this.onSubmitRegister();
  };

  render() {
    return (
      <article className="br3 ba bg-transparent b--black mb4 mt6 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100 hover-input"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                  onKeyDown={this.onKeyPressed}
                />
              </div>
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
                value="Register"
                onClick={this.onSubmitRegister}
              />
              <div id="loader"></div>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
