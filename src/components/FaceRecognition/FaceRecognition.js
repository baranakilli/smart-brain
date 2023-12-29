import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="center ma">
      <div className="absolute mt3">
        <img
          id="input-image"
          src={imageUrl}
          alt=""
          height="auto"
          style={{ width: '80vw', maxWidth: '700px' }}
        />
        {boxes.map((box) => 
          <div
            key={`box${box.topRow}${box.rightCol}`}
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
