# React Google Photo viewer

View all your albums from your Google Photos account - built in React using Google Photos API.

## Development Dependencies

- NodeJS (v10.15.1)
- NPM (v6.4.1)

## Setting Up Development Machine

```bash
npm install
```
Copy .env.development.local.sample to .env.development.local and fill it in with your own Google Photos API key.
Copy .env.production.local.sample to .env.production.local and fill it in with your own Google Photos API key.

## Running Development Machine

```bash
npm start
```

This will start a version of the app at:
http://localhost:3000/

## Auto Formatting

```bash
npm run format
```

## Deploying to Production

```bash
npm run build
```

This will create a production version of the site to the `/build` directory

## Deploying to GitHub Pages

In the package.json file, make sure the "homepage" property is set to the correct URL on GitHub pages which should match the nametag of your GitHub repository, "google-photos-viewer".  The homepage is currently set to https://mbborromeo.github.io/google-photos-viewer/.

In your Git Bash terminal or command line, type in:

```bash
npm run deploy
```

This will deploy a live working version you can view in your browser on GitHub pages.  The link is below.

## Live Site
https://mbborromeo.github.io/google-photos-viewer/


## Git Source Management

```bash
git init
git status
git add .
git commit -am "your message"
git remote add origin git@____
git push -u origin master
```

## Testing


## To Do
- style the albums and photos
- tie in with Google Maps for pins
- allow user to define location even if they didn't have Geo-location turned on when they took the photo
- remember users defined locations when they next login


## Appendix
