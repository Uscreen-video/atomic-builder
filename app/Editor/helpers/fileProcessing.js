import * as AWS from "aws-sdk";
import { imgSrcToBlob } from 'blob-util';

AWS.config.update({
  accessKeyId: 'AKIAJGPORHCLVXDNN7OQ',
  secretAccessKey: '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'
});

AWS.config.region = 'us-east-1';

export const uploadToAmazon = (file, aws, storeId, progressFunc) =>
  new Promise(resolve => {
    const s3 = new AWS.S3();
    s3.putObject({
      Bucket: 'node2',
      Key: '',
      Body: file[0].preview,
      ACL:'public-read'
    }, function (err, data) {
      if (err) {throw err; }
      else {
        console.log('data', data);
      }
    });
  });