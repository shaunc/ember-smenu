# Ember-smenu

Tree of menu items displayed as vertical sidebar, using declarative
style for customization.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

If you have [ember-cli](http://www.ember-cli.com/) installed globally, you can view the sample application by cloning
the repository and running:

* `npm install && bower install`
* `ember serve`

## Basic Usage

Assuming `data` is the following data-structure:

    data = {name: 'shopping', items: [
      {name: 'fruits', items: ['apple', 'banana', 'orange']},'nuts', 'bread']}

Then

    {{ember-smenu data=data}}

will display a menu with "shopping" as a header, containing `fruit`, `nuts` and `bread`; 
`fruit` will have a submenu containing `apple`, `banana` and `orange`.

## Open to a particular state

    {{ember-smenu data=data path="/fruits"}}

Will open the menu with "fruits" submenu open. Path can be a slash-delimited
string, an array of names, or an array of integers giving the index of the
item selected. Names should correspond to the "name" attribute of menu items
by default. To change this default, specify the `key` attribute.



## Customizing sub-menu items

The `items` attribute customizes the default items. Thus, with the data-structure:

    {name: 'shopping', kinds: [
      {name: 'fruits', kinds: ['apple', 'banana', 'orange']},'nuts', 'bread']}

The same menu can be displayed as:

    {{ember-menu data=data items="kinds"}}

If `items` is a function, it is called on each item to retrieve the submenu
(if any) for that item. The function should return an array, or the promise of
an array to display a submenu, or nothing if there is none. For example,  if
we have:

	data =['fruits', 'nuts', 'bread'];

    function getSubmenuItems(item) { 
      if (item === 'fruit') { 
	    return  ['fruit', 'banana', 'orange']; 
      }
    }

then

    {{ember-menu data=data items=getSubmenuItems}}

would display the same data-structure. The full call signature for the `items` accessor is 

    items(item, itemIndex, parentMenu)

where `item` is the current item, `itemIndex` is its index in the parent menu, and `parentMenu` is
the parent menu itself.

## Specifying menu item label.

By default, `ember-smenu` will use string items as their own labels, and use
the `name`  attribute of items to label non-strings. Use the `label` attribute
of `ember- smenu` to change this behavior. For instance, with data:

    data =  [{label: 'fruits', items: ['apple', 'banana', 'orange']},'nuts', 'bread']

To display the original menu, use:

    {{ember-smenu data=data label="label"}}

The `label` attribute can also be a function, in which case it is passed
current item, its index and the parent menu, and should return a string label.

## Customizing menu item label

To replace the default rendering with your own rendering, you
can wrap a custom block in `esm-item-label`:

    {{#ember-smenu data=data}}
      {{#esm-item-label as |item select|}}
        <span class="shopping-menu-item" {{action select}}>
          {{number}} {{item.label}}</span>
      {{/esm-item-label}}
    {{/ember-smenu}}

Here `item` is an annotated version of the current item, including:

 * item: element of the original data structure
 * items: list of sub-items (or null if none).
 * key: key of the item
 * label: label of the item
 * indexPath: list of indexes giving path from root to item

`select` is a function which will trigger the "select" action on the overall
`ember-smenu` object with the current item as attribute.

## Customizing sub-menu display

If an item defines a submenu, by default `ember-smenu` will display
a ">" next to the menu label. A click on this area will trigger the
sub-menu to open.

To override how this is drawn, use the `esm-item-sub` declaration:

    {{#ember-smenu data=data}}
      {{#esm-item-sub as |item open|}}
        <span class="my-sub" {{action open}}>&#x25b6;</span>
      {{/esm-item-sub}}
    {{/ember-smenu}}

## Customizing entire menu item

The item can be customized as a whole with the `esm-item` element. It
yields `item` `select` and `open`.

    {{#ember-smenu data=data}}
      {{#esm-item as |item select open|}}
        <span class="shopping-menu-item" {{action select}}>
          {{number}} {{item.label}}
        </span>
        {{#if item.items}}
          <span class="my-sub" {{action open}}>&#x25b6;</span>
        {{/if}}
      {{/esm-item}}
    {{/ember-smenu}}

## Header

By default, the header block will contain the label of the current parent item, and an icon
to navigate up a level. The `header` attribute of `ember-smenu` can be used to choose which
item attribute to use for header text, or to provide an accessor.

Use `esm-header` to customize display of the header:

	{{#ember-smenu data=data}}
      {{#esm-header-label as |item itemIndex parentItem|}}
        <strong>{{item.name}}</strong>
      {{/esm-header-label}}
    {{/ember-smenu}}

The "close" icon can be separately customized:

	{{#ember-smenu data=data}}
	  {{#esm-header-close as |current close|}}
        {{#link-to action=close}}&#x25c0;{{/link-to}}
      {{/esm-header-close}}
    {{/ember-smenu}}


To completely customize the header block, including the icon to close a submenu, , use `esm-header`:

    {{#ember-smenu data=data}}
      {{#esm-header as |current select close|}}
        {{#link-to action=close}}&#x25c0;{{/link-to}}
	    {{#link-to action=select}}<strong>{{current.name}}</strong>{{/link-to}}
      {{/esm-header}}
    {{/ember-smenu}}

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).