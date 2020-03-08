import { newE2EPage } from '@stencil/core/testing';

describe('Scaleogram', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<strc-scaleogram></strc-scaleogram>');
    const element = await page.find('strc-scaleogram');
    expect(element).toHaveClass('hydrated');
  });

  // TODO: Check for invalid data or scale
});
