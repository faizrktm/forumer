# Forumer

Web based topic management application.

Demo available at: [https://omong.in](https://omong.in)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Make sure you already have yarn or npm installed on your machine. If not, please take a look at this link below.

[https://classic.yarnpkg.com/en/docs/install](https://classic.yarnpkg.com/en/docs/install)

### Installing

After that, install required dependencies by executing this command on terminal

```
yarn install
# or
npm install
```

After instalation success, run command below to make your code available in development mode.

```
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website

## Running the tests

Currently this project contains only unit test for helpers/utilities code. To run a test, simply run command

```
yarn test
```

To write test, you can write it anywhere inside `/src` and named it with `filename.test.js`

see example on [/src/helper/test/times.test.js](https://github.com/faizrktm/forumer/blob/master/src/helper/test/times.test.js)

## Deployment

No special treatment for this project, you can deploy it anywhere. Currently we are using [Vercel](https://vercel.com/) because it is easy and recommended by NextJS team.

see [https://nextjs.org/docs/deployment#vercel-recommended](https://nextjs.org/docs/deployment#vercel-recommended) further info.

## Built With

* [NextJS](https://nextjs.org) - The web framework used
* [Firebase](https://firebase.google.com) - The authentication and database server used
* [Grommet](https://v2.grommet.io/) Component Library and Icons used
* [Styled Components](https://styled-components.com/) Used to styling component
* [React Google Captcha](https://www.npmjs.com/package/react-google-recaptcha) Library for captcha
* [RITEway](https://github.com/ericelliott/riteway) Library used to perform unit test

## Contributing

In Progress

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/faizrktm/forumer/tags).

## Authors

* **Faiz Azmi Rekatama** - *Initial work* - [faizrktm](https://github.com/faizrktm)

See also the list of [contributors](https://github.com/faizrktm/forumer/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/faizrktm/forumer/blob/master/LICENSE) file for details
