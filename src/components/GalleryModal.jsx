import React, { createContext, useEffect, useState } from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const GalleryModalContext = createContext({ galleryModal: { show: false, galleryMedium: '', gallery: '', imgIndex: 0 }, setGalleryModal: () => {}});

function swipeDetect(el, callback) {
    let touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 150,
        restraint = 100,
        allowedTime = 300,
        elapsedTime,
        startTime,
        handleswipe = callback || function(swipedir) {};

    touchsurface.addEventListener('touchstart', function(e) {
        let touchobj = e.changedTouches[0];
        swipedir = 'none';
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime()
        e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)

    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
    }, false)
}

const recordTime = (e, start, cb) => {
	console.log(start)
	if(start) {
		recordTime.start = new Date().getTime();
	}
	else
		recordTime.end = new Date().getTime();
	if (start && recordTime.end) {
		recordTime.end = 0;
	}
	console.log(recordTime.start);
	console.log(recordTime.end);
	if (!start && recordTime.end - recordTime.start < 300) {
		console.log('a', e.positionX);
		if (Math.abs(e.positionX) > 90 && e.scale === 1) {
			console.log('b')
			cb(e.positionX >= 0 ? -1 : 1);
		}
	}
};

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
	const swipe = (direction) => {
		if (direction === 'left') {

		}
		else if (direction === 'right') {
			
		}
	}
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
							recordTime(e, true, (direction) => { console.log('swipe start') });
						}
					}
					onPanningStop={(e) => recordTime(e, false, (d) => {
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