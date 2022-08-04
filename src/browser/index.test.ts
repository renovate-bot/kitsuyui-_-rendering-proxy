import {
  getBrowserTypeByName,
  getBrowser,
  selectableBrowsers,
  withBrowser,
  getBrowserOptionsByName,
} from './index';

jest.setTimeout(5000);

describe('browser', () => {
  test('getBrowserByName', () => {
    expect(getBrowserTypeByName('chromium').name()).toBe('chromium');
    expect(getBrowserTypeByName('firefox').name()).toBe('firefox');
    expect(getBrowserTypeByName('webkit').name()).toBe('webkit');
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      getBrowserTypeByName('foobar');
    }).toThrow();
  });

  test('getBrowser() without parameter', async () => {
    const browser = await getBrowser();
    expect(browser.browserType().name()).toBe('chromium');
    await browser.close();
  });

  test('getBrowser with parameters', async () => {
    // Test all parameters
    for (const name of selectableBrowsers) {
      const browser = await getBrowser({ name });
      expect(browser.browserType().name()).toBe(name);
      await browser.close();
    }
  });

  test('withBrowser()', async () => {
    const box = [];
    for await (const browser of withBrowser()) {
      box.push(browser);
      expect(box[0].isConnected()).toBe(true);
    }
    expect(box[0].isConnected()).toBe(false);
  });

  test('getBrowserOptionsByName', () => {
    expect(Array.isArray(getBrowserOptionsByName('chromium'))).toBe(true);
    expect(Array.isArray(getBrowserOptionsByName('firefox'))).toBe(true);
    expect(Array.isArray(getBrowserOptionsByName('webkit'))).toBe(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(Array.isArray(getBrowserOptionsByName(''))).toBe(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(Array.isArray(getBrowserOptionsByName('foobar'))).toBe(true);
  });
});
