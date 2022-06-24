<h1 align="center">ImageStorage API</h1>

<div align="center">

![GitHub](https://img.shields.io/github/license/qmachard/image-storage)
[![GitHub stars](https://img.shields.io/github/stars/qmachard/image-storage)](https://github.com/qmachard/image-storage/stargazers)
[![Twitter](https://img.shields.io/twitter/url?url=https%3A%2F%2Fgithub.com%2Fqmachard%2Fimage-storage)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fqmachard%2Fimage-storage)

#### Host your own `images` and stay in control

</div>

Table of contents
=================
* [Features](#features)
* [Installation](#installation)
* [API](#api)

# Features

- Selfhostable
- [Simple upload API](#api)
- 100% file based - no database needed
- Change and resize your uploads just by editing the URL
- Securized by secret/public key pair
- Correctly rendered rotation

---

## Development roadmap

- [x] Upload file
- [x] Secret / public key pair authentication
- [ ] Duplicate detection

# Installation

## Docker

```shell
docker run \
  --env "SECRET_KEY=<change-it>" \
  --publish 3000:3000/tcp \
  --volume "${PWD}/images:/data/images" \
  --name image-storage \
  qmachard/image-storage
```

## Docker compose

```yaml
version: "3.7"
services:
  image-storage:
    image: qmachard/image-storage:latest
    container_name: "image-storage"
    environment:
      - SECRET_KEY=<change-it>
    volumes:
      - <your-path>:/data/images
```

## Manually

### Requirements

* NodeJS v16.15+

### Quick Start

1. Clone or download project

```
$ git clone git@github.com:qmachard/image-storage.git
```

2. Create `.env`

```
# .env
PORT=3000
IMAGE_STORAGE=/path/to/directory
SECRET_KEY=change-it
```

3. Build and start project

```
$ yarn && yarn build
$ yarn start
```

4. Generate secret / public keys pair

```
$ node ./generateKey.js
```

6. You can use your API from port `3000`

http://localhost:3000

# API

## Signature generation

Signature is a Base64 encoded string which contains values : `secret`, `iv` and `timestamp`.

```
const signature = Base64(`${secret}.${iv}.${timestamp}`);
```

Signature can be passed as header `X-API-SIGNATURE` or query params `signature`.

## Upload Image

```
POST /images{?signature}

+ Headers

X-API-SIGNATURE=<signature>

+ Body

Content-Disposition: form-data; name="image"; filename="IMG_E2355.jpg"

<content>

+ Response 201 (application/json)

{
  "url": "/images/3e61302a-42cc-4499-8587-5ddcea90f08e.jpeg",
  "filename": "3e61302a-42cc-4499-8587-5ddcea90f08e.jpeg",
  "mimetype": "image/jpeg"
}
```

## Get Image

```
GET /images/{filename.ext}{?w}{?h}{?signature}

+ Headers

X-API-SIGNATURE=<signature>

+ Response 200 (image/jpeg)

<content>
```

### Query Params

| parameter | description               | default |
|-----------|---------------------------|---------|
| w         | Max with of image in px   | null    |
| h         | Max height of image in px | null    |
| signature | Signature from secretKey  | null    |

---

<div align="center">This is a <a href="https://quentinmachard.fr/">Quentin Machard</a> project</div>

