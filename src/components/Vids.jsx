import React from 'react';
import data from '../settings.json'

const vidsData = data['pages_data']['vids'];

const Vids = () => {
    const width = window.innerWidth;
    console.log(width)
    const height = 640 / 512 * width;
    const colors= ['#A5E39D', '#EDE6A4', '#D6BB9E', '#7008BF'];
    return (
        <div className="vids--thumbmails">
            {
                /* 
                    __TO_DO__
                    MAKE FULLSCREEN WORKS
                    CHANGE COLROS AND FONT WEIGHT
                    https://codepen.io/robbyklein/pen/jEoEJM
                */
                vidsData['url'].map((url, i) =>
                    <div>
                        <h5 style={{ backgroundColor: colors[i % colors.length] }} cassName="vids-title"><b>{ url[0] }</b></h5>
                        <div className={ !(i % 2) ? "vids--thumbails__left" : "vids--thumbmails__right" }>
                            <div className="embed-container">
                                <iframe
                                    title="vimeo-player"
                                    src={ url[1] }
                                    frameborder='0'
                                    webkitAllowFullScreen
                                    mozallowfullscreen
                                    allowfullscreen
                                >
                                </iframe>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Vids;