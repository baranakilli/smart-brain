import { useState } from 'react';
import './Profile.css';

const Profile = ({ toggleModal, user, loadUser }) => {
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [pet, setPet] = useState(user.pet);

  const onFormChange = (event) => {
    switch (event.target.name) {
      case 'user-name':
        setName(event.target.value);
        break;
      case 'user-age':
        setAge(event.target.value);
        break;
      case 'user-pet':
        setPet(event.target.value);
        break;
      default:
        return;
    }
  };

  const onProfileUpdate = (data) => {
    fetch(
      `https://smart-face-detector-api-production.up.railway.app/profile/${user.id}`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + window.sessionStorage.getItem('token'),
        },
        body: JSON.stringify({ formInput: data }),
      }
    )
      .then((resp) => {
        if (resp.status === 200 || resp.status === 304) {
          toggleModal();
          loadUser({ ...user, ...data });
        }
      })
      .catch(console.log);
  };

  return (
    <div className="profile-modal">
      <article className="br3 ba b--black-10 mb4 mt4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
        <main className="pa4 black-80 w-80">
          <img
            src="https://icons.veryicon.com/png/o/miscellaneous/indata/user-circle-1.png"
            className="br-100 h3 w3 dib"
            alt="profile-icon"
            onDragStart={(event) => event.preventDefault()}
          />
          <h1 className="mb3 fw5">{name}</h1>
          <h4 className="fw4 f4">Images Submitted: {user.entries}</h4>
          <p className="f6">
            Member Since: {new Date(user.joined).toLocaleDateString()}
          </p>
          <hr />
          <label className="mt2 fw5" htmlFor="user-name">
            Name:
          </label>
          <input
            className="pa2 ba w-100 mt1"
            onChange={onFormChange}
            placeholder={user.name}
            type="text"
            name="user-name"
            id="name"
          />
          <label className="mt2 fw5" htmlFor="user-age">
            Age:
          </label>
          <input
            className="pa2 ba w-100 mt1"
            onChange={onFormChange}
            placeholder={user.age}
            type="text"
            name="user-age"
            id="age"
          />
          <label className="mt2 fw5" htmlFor="user-pet">
            Pet:
          </label>
          <input
            className="pa2 ba w-100 mt1"
            onChange={onFormChange}
            placeholder={user.pet}
            type="text"
            name="user-pet"
            id="pet"
          />
          <div
            className="mt4"
            style={{ display: 'flex', justifyContent: 'space-evenly' }}
          >
            <button
              onClick={() => onProfileUpdate({ name, age, pet })}
              className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
            >
              Save
            </button>
            <button
              className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
              onClick={toggleModal}
            >
              Cancel
            </button>
          </div>
        </main>
      </article>
    </div>
  );
};

export default Profile;
