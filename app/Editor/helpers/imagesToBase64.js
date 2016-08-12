import { imgSrcToDataURL } from 'blob-util';

export default (images, result = {}) =>
  new Promise(resolve => {
    const promises = [];

    Object.keys(images).forEach(key => {
      if (!images[key].preview) return;

      promises.push(
        new Promise(async res => {
          const base64 = await imgSrcToDataURL(images[key].preview);
          return res({ [key]: base64 });
        }
      ));
    });

    Promise.all(promises).then(array =>
      resolve(array.reduce((acc, image) => ({ ...acc, ...image }), result))
    );
  });
