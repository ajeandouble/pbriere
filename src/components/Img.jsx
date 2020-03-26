import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GalleryModal, GalleryModalContext } from './GalleryModal';
import { imgData } from '../tools/loadImgs';
import parseHtml from 'html-react-parser';

const TwoDimensional = (arr, size) => {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
};

const imgLinks = [['papier thermique #0', '0'], ['pa. th. 1', '1'], ['pa. th. 2', '2'], ['photos', '3']];

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
  else
    galleryIndex = 'pt' + (parseInt(galleryIndex) + 1).toString();

  const galleryWork = imgData[galleryIndex]['gallery']['Work']['Thumb'];
  console.log(galleryWork);
  const galleryWorkMedium = imgData[galleryIndex]['gallery']['Work']['Medium'];
  const galleryWorkLarge = imgData[galleryIndex]['gallery']['Work']['Large'];
  const galleryProcess = galleryIndex === 'pt1' ? imgData['pt1']['gallery']['Process']['Thumb'] : null;
  const galleryProcessMedium = galleryIndex === 'pt1' ? imgData['pt1']['gallery']['Process']['Medium'] : null;
  const galleryProcessLarge = galleryIndex === 'pt1' ? imgData['pt1']['gallery']['Process']['Large'] : null;
  const { galleryModal, setGalleryModal } = React.useContext(GalleryModalContext);
  const txt = parseHtml(imgData[galleryIndex]['txt']);

  // TODO: implement loading of different sizes of pics depending on screen res
  return (
    <div>
		{ galleryModal.show ? <GalleryModal /> :
      <div className="gallery">
        <div className="gallery--row">
          <Thumbnails galleryName={ galleryIndex } gallery={ galleryWork } galleryMedium={ galleryWorkMedium } galleryLarge={ galleryWorkLarge } id="" />
					<p className="gallery-txt">{ txt }</p>
					{ galleryIndex !== 'pt1' ? null : <Thumbnails gallery={ galleryProcess } galleryName="pt1Process" galleryMedium={ galleryProcessMedium } galleryLarge={ galleryProcessLarge } /> }
        </div>
      </div> }
    </div>
  );
};

const Img = (props) => {
	const [galleryModal, setGalleryModal] = useState({ gallery: '', show: false, imgIndex: 0 });
	const contextValue = { galleryModal, setGalleryModal };
	const galleryIndex = props.match.params.id;
  const links = imgLinks;

  if (window.innerWidth < 640) {
    links[0][0] = '#0';
    links[1][0] = '#1';
    links[2][0] = '#2';
    links[3][0] = 'photos';
  }

  return (
    <div>
      <nav className="header">
        <ul className="links--img">
          <span className="links--img--padding" style={{ visibility: 'hidden' }}>Test</span>
          {/* padding */}
          {links.map((element) => <li className="links--img--li" key={element[1]}><Link to={`/img/${element[1]}`}>{element[0]}</Link></li>)}
        </ul>
      </nav>
      <div className="content">
        <GalleryModalContext.Provider value={contextValue}>
          <ImgGallery galleryIndex={galleryIndex} />
        </GalleryModalContext.Provider>
      </div>
    </div>
  );
}

export default Img;