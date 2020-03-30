import React from 'react';
import data from '../settings.json'

const bjr = <img src={process.env.PUBLIC_URL + '/img/bjr.gif'} />;
const rnd = <img src={process.env.PUBLIC_URL + '/img/rnd.gif'} />;
const imgData = data['pages_data']['img'];  

for (let p in imgData) {
  let galleries = imgData[p]['gallery'];
  for (let g in galleries) {
    let formats = galleries[g];
    for (let f in formats) {
      const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
      for (let i = 0; i < formats[f].length; i++) {
        let imgPath = `/img/${p}${capitalize(g)}${capitalize(f)}/${formats[f][i]}`;
        formats[f][i] = imgPath;
      }
    }
  }
}

export { imgData, bjr, rnd }