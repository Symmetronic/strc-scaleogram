import {
  E2EElement,
  E2EPage,
  newE2EPage,
} from '@stencil/core/testing';

describe('Scaleogram', () => {
  let element: E2EElement;
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<strc-scaleogram />');
    element = await page.find('strc-scaleogram');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('renders a SVG when valid data is specified', async () => {
    // TODO: Fix e2e tests
    expect(await element.find('svg')).toBeFalsy();

    element.setProperty('data', '[[0, 1], [2, 3], [4, 5, 6, 7]]');
    await page.waitForChanges();

    expect(await element.find('svg')).toBeTruthy();
  });
});
