import ReactDOM from 'react-dom';
import Player from 'react-player';

const videos = document.querySelectorAll('div.atomic-video');

if (videos && videos.length) {
  videos.forEach((node, i) => {
    const data = node.dataset;
    videos[i].innerHTML = '';
    const wrapper = document.createElement('div');
    videos[i].appendChild(wrapper)
    // const holder = videos[i].appendChild
    ReactDOM.render(
      <div><Player url={data.url} width={data.width} height={data.height} /></div>,
      wrapper
    );
  });
}
