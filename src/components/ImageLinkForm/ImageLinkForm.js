import { useState } from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit, onKeyPressed }) => {
  const [copyStatus, setCopyStatus] = useState(false);

  onKeyPressed = (keyInfo) => {
    if (keyInfo.keyCode === 13) onPictureSubmit();
  };

  const onCopyLink = () => {
    navigator.clipboard.writeText(
      'https://www.bimosyo.com/wp-content/uploads/2022/12/Friends-Karakterleri-ve-Ozellikleri.jpg'
    );
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 1500);
  };

  return (
    <div>
      <p className="f3">
        This Magic Box will detect faces in your pictures. Paste an image link
        and give it a try!
      </p>
      <div className="center">
        <div className="center form pa4 br3 shadow-5">
          <input
            type="text"
            className="f4 pa2 w-70 center"
            onChange={onInputChange}
            onFocus={(e) => e.target.select()}
            onKeyDown={onKeyPressed}
          />
          <button
            className="w-30 grow link dib ph2 pv2 white bg-light-purple"
            onClick={onPictureSubmit}
          >
            Detect
          </button>
        </div>
      </div>
      <button className="mt2 link" onClick={onCopyLink}>
        Click to Copy the Test Link
      </button>
      {copyStatus && <p className="mt1 mb0">Link copied!</p>}
    </div>
  );
};

export default ImageLinkForm;
