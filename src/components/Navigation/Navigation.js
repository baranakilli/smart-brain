import Logo from '../Logo/Logo';
import ProfileIcon from '../Profile/ProfileIcon';

const Navigation = ({ onRouteChange, isSignedIn, route, toggleModal }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo />
        <ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal}/>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        { route === 'register' && <p
          onClick={() => onRouteChange('login')}
          className="f3 link dim black underline pa3 pointer"
        >
          Log in
        </p>}
        {route === 'login' &&
        <p
          onClick={() => onRouteChange('register')}
          className="f3 link dim black underline pa3 pointer"
        >
          Register
        </p>}
      </nav>
    );
  }
};

export default Navigation;
