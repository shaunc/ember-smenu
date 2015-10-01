// tests/helpers/ember-smenu

export let basicData = {
  name: 'shopping', items: [
    {name: 'fruits', items: [
      'apple', 'banana', 
      {name: 'orange', items: ['navel', 'blood']}]},
    'nuts', 'bread']};

export function selectText(selector, subselector) {
  let $sel = $(selector);
  if(subselector != null) {
    $sel = $sel.find(subselector);
  }
  return $sel.text().trim();
}
export function checkText(assert, selector, subselector, text) {
  const actualText = selectText(selector, subselector);
  assert.equal(
    actualText, text.trim(),
    `text for ->${subselector}: ${actualText} != ${text.trim()}`);
}


export function checkMenuItemText(
    assert, selector, itemClass, controlClass, {text, control}) {
  checkText(assert, selector, itemClass, text);
  if(control != null) {
    checkText(assert, selector, controlClass, control);
  }
  else {
    assert.equal(
      selector.find(controlClass).length, 0, 
      `unexpected selector on ${itemClass}`);
  }
}

/**
 * check that ember-grid displays explected data
 *
 * @param expected should be hash containing `header` and `menu`
 *
 * the first containing `text` and `control` fields; the latter
 * being a list of such fields. For the header the text and control
 * fields set expected text for header, and for the "close" icon.
 * For elements in `menu`, `text` is the text of the menu item,
 * and `control` is icon for opening a submenu (which should be
 * null if no submenu).
 *
 */
export function checkSMenuText(selector, assert, expected) {
  let {header, menu} = expected;
  const $head = $(selector).find('.menu-header');
  checkMenuItemText(
    assert, $head, '.menu-header-label', '.menu-header-close', header);
  const $menu = $(selector).find('.menu-body > *');
  menu.forEach((item, i)=> {
    const $item = $($menu[i]);
    checkMenuItemText(
      assert, $item, '.menu-item-label', '.menu-item-open', item);
  });
}

export function checkSelectedItem(assert, actual, item, indexPath) {
  const title = item.name[0].toUpperCase() + item.name.slice(1);
  assert.equal(actual.item, item);
  assert.equal(actual.items, item.items);
  assert.equal(actual.label, title);
  assert.equal(actual.key, item.name);
  assert.deepEqual(actual.indexPath, indexPath);
}

export function checkSelectedHeader(assert, actual, item, prev) {
  const title = item.name[0].toUpperCase() + item.name.slice(1);
  assert.equal(actual.item, item);
  assert.equal(actual.label, title);
  if(actual.prev != null) {
    assert.deepEqual(actual.prev.label, prev.label);
    assert.deepEqual(actual.prev.item, prev.item);
  }
  else {
    assert.equal(prev, null);
  }
}
