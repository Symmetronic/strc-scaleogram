import {
  Component,
  h,
  Prop,
  State,
  Watch,
} from '@stencil/core';

import { Legend } from '../legend/legend';
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

    /* Data was set. */
    try {
      this.parsedData = JSON.parse(newValue);
      this.updateRange();
      this.updateColorScale();
    } catch(error) {
      console.error(error);
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
    /* Do nothing, if requirements are not fulfilled. */
    if (!this.range || !this.parseScale) return;

    /* Update color scale. */
    this.colorScale = colorScale(this.range, this.parsedScale);
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
                <Legend
                  colorScale={this.colorScale}
                  range={this.range}
                />
              </div>
            </div>
        );
  }
}
