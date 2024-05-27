import Logo from '../Logo/Logo';
import ProfileIcon from '../Profile/ProfileIcon';

const Navigation = ({ onRouteChange, isSignedIn, route, toggleModal }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo />
        <ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal} />
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {route === 'register' && (
          <p
            onClick={() => onRouteChange('login')}
            className="f4 link dim black pointer ba pv1 ph4 mr3 mt3 br-pill"
          >
            Log in
          </p>
        )}
        {route === 'login' && (
          <p
            onClick={() => onRouteChange('register')}
            className="f4 link dim black pointer ba pv1 ph4 mr3 mt3 br-pill"
          >
            Register
          </p>
        )}
      </nav>
    );
  }
};

export default Navigation;
