import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const CURRENT_TIME_KEY = "videoplayer-current-time";
let currentTime = JSON.parse(localStorage.getItem(CURRENT_TIME_KEY));

player.on('timeupdate', throttle(function (currentTime) {
    const seconds = currentTime.seconds;
    localStorage.setItem(CURRENT_TIME_KEY, JSON.stringify(seconds));
}, 1000));

player.getDuration().then(function (duration) {
    // duration = the duration of the video in seconds

    if (currentTime + 1 > duration) {
        currentTime = 0;
    }

    updateVideoTime();

    // console.log('videoDuration', duration);
    // console.log('currentTime', currentTime);
}).catch(function (error) {
    // an error occurred
});

const updateVideoTime = () => {
    player.setCurrentTime(currentTime).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':           
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});
}


