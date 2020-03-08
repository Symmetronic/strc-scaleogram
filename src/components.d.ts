/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface StrcScaleogram {
    /**
    * Data as string of a JSON array of arrays of numbers.
    */
    'data': string;
    /**
    * Color scale as string in Chroma.js format.
    */
    'scale': string;
  }
}

declare global {


  interface HTMLStrcScaleogramElement extends Components.StrcScaleogram, HTMLStencilElement {}
  var HTMLStrcScaleogramElement: {
    prototype: HTMLStrcScaleogramElement;
    new (): HTMLStrcScaleogramElement;
  };
  interface HTMLElementTagNameMap {
    'strc-scaleogram': HTMLStrcScaleogramElement;
  }
}

declare namespace LocalJSX {
  interface StrcScaleogram {
    /**
    * Data as string of a JSON array of arrays of numbers.
    */
    'data'?: string;
    /**
    * Color scale as string in Chroma.js format.
    */
    'scale'?: string;
  }

  interface IntrinsicElements {
    'strc-scaleogram': StrcScaleogram;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'strc-scaleogram': LocalJSX.StrcScaleogram & JSXBase.HTMLAttributes<HTMLStrcScaleogramElement>;
    }
  }
}


