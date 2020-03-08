![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Symmetronic Scaleogram

Web component for a [scaleogram visualization](https://en.wikipedia.org/wiki/Spectrogram), e.g. for data from a [discrete wavelet transform](https://en.wikipedia.org/wiki/Discrete_wavelet_transform).

## Using this component

### Script tag

- Put a script tag similar to this `<script src='https://unpkg.com/strc-scaleogram@1.0.0/dist/strc-scaleogram.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, HTML, etc.

### Node Modules

- Run `npm install strc-scaleogram --save`
- Put a script tag similar to this `<script src='node_modules/strc-scaleogram/dist/strc-scaleogram.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, HTML, etc.

### In a stencil-starter app

- Run `npm install strc-scaleogram --save`
- Add an import to the npm packages `import strc-scaleogram;`
- Then you can use the element anywhere in your template, JSX, HTML, etc.

## API

### Attributes

* `data`: String of an array of arrays containing the wavelet coefficients.
* `scale`: Color scale as a string. Any valid string of a [Chroma.js color scale](https://vis4.net/chromajs/#color-scales) can be used.

```html
<strc-scaleogram
  data="[[-1, 2, -3, 4], [0, 6], [7]]"
  scale="['#7f3b08', '#f7f7f7', '#2d004b']"
/>
```

### Styling

You can adjust the style of the scaleogram.

```css
strc-scaleogram {
  height: 32rem;
  width: 32rem;
}
```

## NPM scripts

* `npm install`: Install dependencies
* `npm start`: Build in development mode
* `npm run build`: Build in production mode
* `npm test`: Run tests
* `npm run test:watch`: Run tests in interactive watch mode
