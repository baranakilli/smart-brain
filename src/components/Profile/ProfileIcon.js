import { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const ProfileIcon = ({ onRouteChange, toggleModal }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="d-flex p-4">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle data-toggle="dropdown" tag="span">
          <img
            src="https://icons.veryicon.com/png/o/miscellaneous/indata/user-circle-1.png"
            className="br-100 h3 w3 dib pointer bg-white"
            alt="profile-icon"
            onDragStart={(event) => event.preventDefault()}
          />
        </DropdownToggle>
        <DropdownMenu
          className="b--transparent shadow-5"
          style={{
            marginTop: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
          }}
        >
          <DropdownItem onClick={toggleModal}>View Profile</DropdownItem>
          <DropdownItem onClick={() => onRouteChange('signout')}>
            Sign Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ProfileIcon;
