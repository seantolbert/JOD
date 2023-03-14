import { useState, useEffect } from "react";
import AWS from "aws-sdk";

const useAWS = (bucketName, region, accessKeyId, secretAccessKey) => {
  const [s3, setS3] = useState(null);

  useEffect(() => {
    const s3Instance = new AWS.S3({
      region,
      accessKeyId,
      secretAccessKey,
    });

    setS3(s3Instance);
  }, [bucketName, region, accessKeyId, secretAccessKey]);

  const getObjectURL = async (key) => {
    if (!s3) return null;

    try {
      const params = {
        Bucket: bucketName,
        Key: key,
      };

      const data = await s3.getObject(params).promise();

      const imageURL = URL.createObjectURL(
        new Blob([data.Body], { type: data.ContentType })
      );
      return imageURL;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  return { getObjectURL };
};
export default useAWS;
