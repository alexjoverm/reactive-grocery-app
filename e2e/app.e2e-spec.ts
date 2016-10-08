import { DevmeetingsPage } from './app.po';

describe('devmeetings App', function() {
  let page: DevmeetingsPage;

  beforeEach(() => {
    page = new DevmeetingsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
