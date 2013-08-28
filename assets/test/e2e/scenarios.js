'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Match App', function() {

  it('should redirect index.html to index.html#/ret', function() {
    browser().navigateTo('../../app/index.html');
    for(var i=0;i<10;i++)
    {
      element("img:eq(0)").click();
    }
    expect(browser().location().url()).toContain('/ret');
  });

  it('should redirect index.html to index.html#/ret', function() {
    browser().navigateTo('../../app/index.html');
    for(var i=0;i<3;i++)
    {
      element("img:eq(0)").click();
    }
    expect(repeater('img').count()).toBe(2);
    expect(element("img:eq(1)").attr("src"));
    expect(element("img:eq(0)").attr("src"));
  });

});
