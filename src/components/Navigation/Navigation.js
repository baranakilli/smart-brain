import Logo from "../Logo/Logo";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{display: 'flex', justifyContent: 'space-between'}}>
        <Logo/>
        <p onClick={() => onRouteChange('login')} className="f3 link dim black underline pa3 pointer">Sign Out</p>
      </nav>
    );
  } else {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
      <p onClick={() => onRouteChange('login')} className="f3 link dim black underline pa3 pointer">Log in</p>
      <p onClick={() => onRouteChange('register')} className="f3 link dim black underline pa3 pointer">Register</p>
      </nav>
    )
  }
}

export default Navigation;