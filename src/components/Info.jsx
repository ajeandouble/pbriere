import React from 'react';
import data from '../settings.json'
import parseHtml from 'html-react-parser';

const infoData = data['pages_data']['info']

const Info = () => {
    return (
        <div id="info">
            <div id="info--txt">{parseHtml(infoData['txt'])}</div>
        </div>
    );
}

export default Info;