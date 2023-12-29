import './ImageLinkForm.css';


const ImageLinkForm = ({ onInputChange, onPictureSubmit, onKeyPressed }) => {
  
onKeyPressed = (keyInfo) => {
  if(keyInfo.keyCode === 13) onPictureSubmit();
}

  return (
    <div>
      <p className="f3">
        This Magic Brain will detect faces in your pictures. Give it a try.
      </p>
      <div className="center">
        <div className="center form pa4 br3 shadow-5">
          <input
            type="text"
            className="f4 pa2 w-70 center"
            onChange={onInputChange}
            onKeyDown={onKeyPressed}
          />
          <button
            className="w-30 grow  link dib ph2 pv2 white bg-light-purple"
            onClick={onPictureSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
