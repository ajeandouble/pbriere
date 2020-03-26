import React, { createContext, useEffect, useState } from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const GalleryModalContext = createContext({ galleryModal: { show: false, galleryMedium: '', gallery: '', imgIndex: 0 }, setGalleryModal: () => {}});

const GalleryModal = (galleryIndex) => {
	const { galleryModal, setGalleryModal } = React.useContext(GalleryModalContext);

	const handleKey = ({ key }) => {
			switch (key) {
					case 'Escape':
							setGalleryModal({ ...galleryModal, show: false });
							break;
					case 'ArrowLeft':
							setGalleryModal({ ...galleryModal, imgIndex: galleryModal.imgIndex - 1 });
							break;
					case 'ArrowRight':
							setGalleryModal({ ...galleryModal, imgIndex: galleryModal.imgIndex + 1 });
							
			}
			document.removeEventListener('keydown', handleKey);
	};
	const handleClick = (e, direction) => {
			if (direction === 'left')
					setGalleryModal({ ...galleryModal, imgIndex: galleryModal.imgIndex - 1 });
			else if (direction === 'right')
					setGalleryModal({ ...galleryModal, imgIndex: galleryModal.imgIndex + 1 });
			console.log(galleryModal)
			e.preventDefault();
	};

	useEffect(() => {
		document.addEventListener('keydown', (e) => {console.log(e); handleKey(e)});
		return function cleanup() {
				document.removeEventListener('keydown', handleKey);
			}
		});


	const handleSwipe = (e, start, cb) => {
		console.log(start)
		if(start) {
			handleSwipe.start = new Date().getTime();
		}
		else
			handleSwipe.end = new Date().getTime();
		if (start && handleSwipe.end) {
			handleSwipe.end = 0;
		}
		console.log(handleSwipe.start);
		console.log(handleSwipe.end);
		if (!start && handleSwipe.end - handleSwipe.start < 300) {
			console.log('a', e.positionX);
			if (Math.abs(e.positionX) > 90 && e.scale === 1) {
				console.log('b')
				cb(e.positionX >= 0 ? -1 : 1);
			}
		}
	};
	const { gallery, galleryMedium, imgIndex } = galleryModal;
	let i = (gallery.length + imgIndex ) % gallery.length;
	console.log(i)
	console.log(imgIndex);
	console.log(galleryModal.galleryMedium);
  return (
    <div>
			<div className="img-modal__left">
				<div className="img-modal--left-arrow" onClick={(e) => handleClick(e, 'left')}>{'↽'}</div>
			</div>
			<div className="img-modal__right">
					<div className="img-modal--right-arrow" onClick={(e) => handleClick(e, 'right')}>{'⇁'}</div>
			</div>
			<div className="img-modal--cross" onClick={(e) => setGalleryModal({ ...galleryModal, show: false })}>{'X'}</div>
			<div id="img-modal" style={{backgroudColor: "red"}}>
				<TransformWrapper
					scale={1}
					doubleClick={{ disabled: true }}
					positionX={0} 
					positionY={0}
					onPanningStart={(e) => {
							handleSwipe(e, true, (direction) => { console.log('swipe start') });
						}
					}
					onPanningStop={(e) => handleSwipe(e, false, (d) => {
						setGalleryModal( {...galleryModal, imgIndex: galleryModal.imgIndex + d });
						
					}) }
				>
					<TransformComponent>
						<div className="img-modal--img">
							{/*<picture> _TODO_ add source */}
								{/*source media="(max-width: 1200px)" srcset={ gallery[i] } alt='' />
								<source media="(min-width: 1200px)" srcset={ gallery[i] } alt='' />*/}
								<img src={ gallery[i] } />
							{/*</picture>*/}
						</div>
					</TransformComponent>
				</TransformWrapper>
			</div>
    </div>
  );
};

export { GalleryModalContext, GalleryModal }