import { HearthstoneCardBrowserPage } from './app.po';

describe('hearthstone-card-browser App', () => {
  let page: HearthstoneCardBrowserPage;

  beforeEach(() => {
    page = new HearthstoneCardBrowserPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
