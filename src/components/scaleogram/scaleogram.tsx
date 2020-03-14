import {
  Component,
  h,
  Prop,
  State,
  Watch,
} from '@stencil/core';

import { Visualization } from '../visualization/visualization';

import {
  colorScale,
  ColorScale,
  range,
  Range,
} from '../../utils/utils';

/**
 * Component of a scaleogram visualization.
 */
@Component({
  tag: 'strc-scaleogram',
  styleUrl: 'scaleogram.scss',
  shadow: true,
})
export class Scaleogram {

  /**
   * Data as string of a JSON array of arrays of numbers.
   */
  @Prop() data: string;

  /**
   * Boolean if scale should be inverted as a string.
   */
  @Prop() invertScale: string = 'false';

  /**
   * Color scale as string in Chroma.js format.
   */
  @Prop() scale: string = 'RdBu';

  /**
   * Color scale used for the scaleogram
   */
  @State() colorScale: ColorScale;

  /**
   * Parsed array of array of numbers.
   */
  @State() parsedData: number[][];

  /**
   * True if scale should be inverted.
   */
  @State() parsedInvertScale: boolean;

  /**
   * Parsed color scale in Chroma.js format
   */
  @State() parsedScale: any;

  /**
   * Interval of the data.
   */
  @State() range: Range;

  /**
   * The component is preparing to load.
   */
  componentWillLoad(): void {
    this.parseInvertScale(this.invertScale);
    this.parseData(this.data);
    this.parseScale(this.scale);
  }

  /**
   * Parses data formatted as string.
   * @param newValue New data value.
   */
  @Watch('data')
  parseData(newValue: string): void {
    /* No data is set. */
    if (!newValue) {
      this.parsedData = undefined;
      return;
    }

    /* Data is set. */
    try {
      this.parsedData = JSON.parse(newValue);
      this.updateRange();
      this.updateColorScale();
    } catch(error) {
      console.error(error);
    }
  }

  /**
   * Parses the invert scale property formatted as string.
   * @param newValue New invert scale property.
   */
  @Watch('invertScale')
  parseInvertScale(newValue: string): void {
    /* Invert scale is not set. */
    if (!newValue) return;

    /* Invert scale is set. */
    this.parsedInvertScale = (newValue.toLowerCase() === 'true') ? true : false;
    this.updateColorScale();
  }

  /**
   * Parses a color scale formatted as string.
   * @param newValue New color scale value.
   */
  @Watch('scale')
  parseScale(newValue: string): void {
    /* No scale is set. */
    if (!newValue) return;

    /* Scale is set. */
    try {
      /* Parse scale in array form. */
      this.parsedScale = JSON.parse(newValue.replace(/'/g, '"'));
    } catch(_) {
      /* Use scale in string form */
      this.parsedScale = newValue;
    }
    this.updateColorScale();
  }

  /**
   * Updates the color scale.
   */
  updateColorScale(): void {
    /* Do nothing, if requirements are not fulfilled. */
    if (!this.range || !this.parseScale) return;

    /* Update color scale. */
    this.colorScale = colorScale(
      this.range,
      this.parsedScale,
      this.parsedInvertScale,
    );
  }

  /**
   * Updates the data range.
   */
  updateRange(): void {
    /* Do nothing, if data was not parsed. */
    if (!this.parsedData || this.parsedData.length === 0) return;

    /* Update range. */
    this.range = range(this.parsedData);
  }
  
  /**
   * Renders the scaleogram visualization
   */
  render() {
    return (!this.parsedData || this.parsedData.length === 0)
        ? null
        : (
            <div>
              <div>
                <Visualization
                  colorScale={this.colorScale}
                  data={this.parsedData}
                />
              </div>
              <div>
                <strc-scaleogram-legend
                  colorScale={this.colorScale}
                  range={this.range}
                />
              </div>
            </div>
        );
  }
}
