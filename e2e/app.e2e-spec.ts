import { PineapplePage } from './app.po';

describe('pineapple App', function() {
  let page: PineapplePage;

  beforeEach(() => {
    page = new PineapplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
