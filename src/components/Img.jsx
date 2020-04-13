import React, { useState } from 'react';
import { GalleryModal, GalleryModalContext } from './GalleryModal';
import { imgData, rnd } from '../tools/loadImgs';
import parseHtml from 'html-react-parser';
import Chance from 'chance';

const TwoDimensional = (arr, size) => {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
};

console.log('IMG')

const randomN = Math.floor(Math.random() * 100);
const Thumbnails = ({ gallery, galleryMedium, galleryLarge, galleryName }) => {
  const { galleryModal, setGalleryModal } = React.useContext(GalleryModalContext);

  let id = galleryName;
  console.log(galleryName)
  let rowLength = 2;
  switch (galleryName) {
    case 'pt1':
      rowLength = 5;
      break;
    case 'pt2':
      rowLength = 5;
      break;
    case 'pt3':
      rowLength = 2;
      break;
    case 'photo':
      rowLength = 15;
      break;
    default:
      break;
  }

  console.log(gallery, id)
  /* Transform gallery pics into 2d arrays */
  gallery = TwoDimensional(gallery, rowLength);
  gallery = gallery[0].map((col, i) => gallery.map(row => row[i])); // switch colums and rows
  console.log(galleryLarge);

  return (
      <div className="gallery-thumb--row" id={id} >
      {
        // Display (5x, 1x) columns into flex
        gallery.map((row, rowI) => (
          <div className="gallery-thumb--column" id={id} >
            {
              row.map((img, colI) => (
                <img
                  src={ img }
                  alt={ img }
                  style={{ width: '100%' }}
                  onClick={() => setGalleryModal({ ...galleryModal, imgIndex: (colI * rowLength) + rowI, gallery: galleryLarge, galleryMedium: galleryMedium, show: true })}
                  tabIndex={"0"}
                />
              ))
            }
          </div>)
        )      
      }
      </div>
      );
}

const ImgGallery = ({ galleryIndex }) => {
  if (galleryIndex === '3')
    galleryIndex = 'photo';
  else if (galleryIndex === '4')
    galleryIndex = 'rnd';
  else
    galleryIndex = 'pt' + (parseInt(galleryIndex) + 1).toString();

  let galleryWork = imgData[galleryIndex]['gallery']['Work']['Thumb'];
  let galleryWorkMedium = imgData[galleryIndex]['gallery']['Work']['Medium'];
  let galleryWorkLarge = imgData[galleryIndex]['gallery']['Work']['Large'];
  if (galleryIndex === 'photo') {
    console.log(randomN)

    let chance = new Chance(randomN);
    galleryWork = chance.shuffle(galleryWork);
    console.log(galleryWork);

    chance = new Chance(randomN);
    galleryWorkMedium = chance.shuffle(galleryWorkMedium);
    console.log(galleryWorkMedium);

    chance = new Chance(randomN);
    galleryWorkLarge = chance.shuffle(galleryWorkLarge);
    console.log(galleryWorkLarge);
  }
  const galleryProcessMedium = galleryIndex === 'pt1' ? imgData['pt1']['gallery']['Process']['Medium'] : null;
  const galleryProcessLarge = galleryIndex === 'pt1' ? imgData['pt1']['gallery']['Process']['Large'] : null;
  const { galleryModal } = React.useContext(GalleryModalContext);
  const txt = parseHtml(imgData[galleryIndex]['txt']);
  console.log('test')
  return (
    <div>
    { galleryModal.show ? <GalleryModal /> :
    <div>
        <div class="top-decoration" />
        <div className="gallery">
          <div className="gallery--row">
            <Thumbnails galleryName={ galleryIndex } gallery={ galleryWork } galleryMedium={ galleryWorkMedium } galleryLarge={ galleryWorkLarge } id="" />
            <p className="gallery-txt">{ txt }</p>
            { galleryIndex !== 'pt1' ? null : <Thumbnails gallery={ galleryProcessMedium } galleryName="pt1Process" galleryMedium={ galleryProcessMedium } galleryLarge={ galleryProcessLarge } /> }
          </div>
        </div>
      </div> }
    </div>
  );
};

const Rnd = () => <div className="rnd">{ rnd }</div>;

const Img = (props) => {
	const [galleryModal, setGalleryModal] = useState({ gallery: '', show: false, imgIndex: 0 });
	const contextValue = { galleryModal, setGalleryModal };
	const galleryIndex = props.match.params.id;

  return (
    <div>
      <div className="content">
        {
          galleryIndex !== '4' ? 
            <GalleryModalContext.Provider value={contextValue}>
              <ImgGallery galleryIndex={galleryIndex} />
            </GalleryModalContext.Provider>
            : <Rnd />
          }
      </div>
    </div>
  );
}

export default Img;