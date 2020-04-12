import React, { useState, useEffect , createRef } from 'react';
import data from '../settings.json'

const vidsData = data['pages_data']['vids'];

const Vids = () => {
    const [fullscreen, setFullscreen] = useState(-1)
    const colors= ['#A5E39D', '#EDE6A4', '#D6BB9E', '#7008BF'];
    
    const handleKey = (key) => setFullscreen(-1);

    useEffect(() => {
        /*vidsData['url'].map((vid, i) => {
            const xmlHttp = new XMLHttpRequest();
            const urlThumb = `http://vimeo.com/api/v2/video/${vid['id']}.json?callback=showThumb`;
            xmlHttp.open("GET", urlThumb, true);
            xmlHttp.send();
            xmlHttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    let response = this.responseText.slice(14);
                    response = response.substring(0, response.length - 1);
                    response = JSON.parse(response);
                    const imgUrl = response[0]['thumbnail_large'];
                    const urls = imgThumb.urls;
                    urls.push(imgUrl);
                    setImgThumb({ urls: urls });
                    console.log(imgUrl)
                    console.log(imgThumb)
                }
            }
        });*/
        
		document.addEventListener('keydown', (e) => {handleKey(e)});
		return function cleanup() {
				document.removeEventListener('keydown', handleKey);
			}
		}
    );
    const refs = [];
    for (let i = 0; i < vidsData['url'].length; ++i) {
        refs.push(createRef());
        console.log(vidsData['url'])
    }
    console.log("current=", refs[0].current)

    return (
        <div className="vids--thumbmails">
            {
                vidsData['url'].map((el, i) =>
                    <div>
                        <h5 style={{ backgroundColor: colors[i % colors.length], color: "white" }} className="vids-title"
                            onClick={() => setFullscreen(i)}>{el['title']}
                        </h5>
                        <div className="embed-container"
                            style={{display: fullscreen === i ? "block" : "none"}}>
                            <div className="vimeo-modal--cross"
                                onClick={ () => setFullscreen(-1) }>X</div>
                            <iframe
                                id="vimeo-player"
                                ref={ refs[i] }
                                title="vimeo-player"
                                src={ el['url'] }
                                frameborder='0'
                                fullscreen
                                webkitAllowFullScreen
                                mozallowfullscreen
                                allowfullscreen
                            />
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Vids;