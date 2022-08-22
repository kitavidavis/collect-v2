import AWS from 'aws-sdk'

const S3_BUCKET = 'geopsycollect';
const REGION = 'us-east-2';
const IDENTITY_POOL_ID =  'us-east-2:60fc8b38-6443-400d-8013-26e0c756abae';


AWS.config.update({
    accessKeyId: 'AKIA55RAOI3SBHFT725G',
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION
})

export const filesArr = []

export const uploadFile = (file, key) => {
    filesArr.push({position: key, file: file})
}

export const storeFiles = () => {
    console.log(filesArr);
    if(filesArr.length > 0){
        for(let i=0; i<filesArr.length; i++){
            let item = filesArr[i];
            let key = item.file.name

            const params = {
                ACL: 'public-read',
                Body: item.file,
                Bucket: S3_BUCKET,
                Key: key
            };
        

            myBucket.putObject(params).on("httpUploadProgress", (evt) => {
                console.log(evt.loaded / evt.total)
            }).send((err) => {
                if(err) console.log(err)
            })
        }

        console.log(`stored ${filesArr.length} files`)
    } else {
        console.log("no files to store...")
    }
    
}
