import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt3">
        <img id="input-image" src={imageUrl} alt="" height='auto' style={{width: '80vw', maxWidth: '700px'}} />
        <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
  )
}

export default FaceRecognition;