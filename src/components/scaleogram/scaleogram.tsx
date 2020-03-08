import { Component, h, Prop, State, Watch } from '@stencil/core';

import { scale, Scale } from '../../utils/utils';

/**
 * Extent of the SVG element in relative measure.
 */
const EXTENT: number = 100;

/**
 * Component of a scaleogram visualization.
 */
@Component({
  tag: 'strc-scaleogram',
  styleUrl: 'scaleogram.scss',
})
export class Scaleogram {

  /**
   * Data as string of a JSON array of arrays of numbers.
   */
  @Prop() data: string;

  /**
   * Color scale as string in Chroma.js format.
   */
  @Prop() scale: string = 'RdBu';

  /**
   * Color scale used for the scaleogram
   */
  @State() color: Scale;

  /**
   * Parsed array of array of numbers.
   */
  @State() parsedData: number[][];

  /**
   * Parsed color scale in Chroma.js format
   */
  @State() parsedScale: any;

  /**
   * The component is preparing to load.
   */
  componentWillLoad(): void {
    this.parseData(this.data);
    this.parseScale(this.scale);
  }

  /**
   * Parses data formatted as string.
   * @param newValue New data value.
   */
  @Watch('data')
  parseData(newValue: string): void {
    if (newValue) {
      this.parsedData = JSON.parse(newValue);
      this.updateColorScale();
    }
  }

  /**
   * Parses a color scale formatted as string.
   * @param newValue New color scale value.
   */
  @Watch('scale')
  parseScale(newValue: string): void {
    if (newValue) {
      try {
        this.parsedScale = JSON.parse(newValue.replace(/'/g, '"'));
      } catch(_) {
        this.parsedScale = newValue;
      }
      this.updateColorScale();
    }
  }

  /**
   * Updates the color scale.
   */
  updateColorScale(): void {
    /* Do nothing, if data was not parsed. */
    if (!this.parsedData) return;

    /* Determine minimum and maximum values. */
    let max: number = undefined;
    let min: number = undefined;
    for (const row of this.parsedData) {
      for (const value of row) {
        max = (max === undefined) ? value : Math.max(value, max);
        min = (min === undefined) ? value : Math.min(value, min);
      }
    }

    /* Update color scale. */
    this.color = scale([min, max], this.parsedScale);
  }
  
  /**
   * Renders the scaleogram visualization
   */
  render() {
    const rowHeight: number = EXTENT / this.parsedData.length;

    return (
      <svg
        height='100%'
        preserveAspectRatio='none'
        version='1.1'
        viewBox={'0 0 ' + EXTENT + ' ' + EXTENT}
        width='100%'
        xmlns='http://www.w3.org/2000/svg'
      >
        {this.parsedData.map((row, rowIndex) => {
          const y: number = rowIndex * rowHeight;

          return (
            <g>
              {row.map((value, colIndex) => {
                const color: string = this.color(value);
                const colWidth: number = EXTENT / row.length;
                const x: number = colIndex * colWidth;
                
                return (
                  <rect
                    fill={color}
                    height={rowHeight}
                    width={colWidth}
                    x={x}
                    y={y}
                  />
                )
              })}
            </g>
          );
        })}
      </svg>
    );
  }
}
