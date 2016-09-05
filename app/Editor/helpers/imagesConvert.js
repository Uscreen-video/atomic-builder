import { imgSrcToDataURL, imgSrcToBlob } from 'blob-util';

const imgConvert = (images, fn, result = {}) =>
  new Promise(resolve => {
    const promises = [];

    Object.keys(images).forEach(key => {
      if (!images[key].preview) return;

      promises.push(
        new Promise(async res => {
          const file = await fn(images[key].preview);
          return res({ [key]: file });
        }
      ));
    });

    Promise.all(promises).then(array =>
      resolve(array.reduce((acc, image) => ({ ...acc, ...image }), result))
    );
  });

export const imagesToBase64 = (images) => imgConvert(images, imgSrcToDataURL);
export const imagesToBlob = (images) => imgConvert(images, imgSrcToBlob);