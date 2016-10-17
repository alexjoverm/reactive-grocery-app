import { ReactiveGroceryAppPage } from './app.po';

describe('reactive-grocery-app App', function() {
  let page: ReactiveGroceryAppPage;

  beforeEach(() => {
    page = new ReactiveGroceryAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
