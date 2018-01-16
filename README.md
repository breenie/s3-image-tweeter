# Serverless S3 image tweeter

A [serverless](https://serverless.com) application for tweeting images when they arrive in an S3 bucket.

## Installation

`git clone https://github.com/breenie/s3-image-tweeter.git`

Install dependencies using your favourite dependency manager (npn yarn).

## Quick start

Set the required environment variables.

```sh
export BUCKET=my-bucket
export TWITTER_CONSUMER_KEY=***
export TWITTER_CONSUMER_SECRET=***
export TWITTER_ACCESS_TOKEN_KEY=***
export TWITTER_ACCESS_TOKEN_SECRET=***
```

Deploy.

`sls deploy`

Push images to `my-bucket/incoming` and watch them appear in your twitter stream.

## Customisation

Setting the `PREFIX` and `SUFFIX` environment variables allow you to alter the behaviour of which images are tweeted by path and extension. 

## Example IAM uploader policy

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject"
            ],
            "Resource": [
                "arn:aws:s3:::my-bucket/incoming/*"
            ]
        }
    ]
}
```

## Notes

It is not possible to use an existing bucket as serverless likes to control the entirety of its infrastructure. If it is imperitive to use an existing bucket name I found it easiest to copy everything to a temporary bucket, delete the old one and then back once serverless had created the bucket itself.

```sh
$ aws s3 cp s3://existing/ s3://tmp/ --recursive --include "*.jpq"
# Delete existing bucket and contents
$ sls deploy
$ aws s3 cp s3://tmp/ s3://existing/ --recursive --include "*.jpq"
# Delete tmp bucket and contents
```