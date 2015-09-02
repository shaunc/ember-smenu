// ember-smenu/component.js

import Ember from 'ember';
import layout from './template';
import DeclarationContainer from 'ember-declarative/declaration-container/mixin';

export default Ember.Component.extend(DeclarationContainer, {
  layout: layout,
  classNames: ['ember-smenu'],

  data: null,
  header: true,
  path: Ember.computed({ get() { return Ember.A(); }, set(k, v) { return v; }}),

  indexPath: Ember.computed(
      'data.[]', 'path.[]', 'key', 'items', function(){
    let path = this.get('path');
    let indexPath = Ember.A();
    if (path == null) { return indexPath; }
    let data = this.get('data');
    let item = data;
    for(let ipath = 0; ipath < path.length; ++ipath) {
      let key = path[ipath];
      let items = this.getItems(data, indexPath);
      for(let i = 0; i < items.length; i++) {
        item = items[i];
        let itemKey = this.getItemKey(item, indexPath);
        if (itemKey === key) {
          key = null;
          indexPath.push(i);
          break;
        }
      }
      if (key != null) {
        throw new Error(`path key ${key} not found`);
      }
    }
    return indexPath;
  }),

  menu: Ember.computed(
      'data', 'indexPath', 'items', 'label', 'key', function(){
    let {data, indexPath} = this.getProperties('data', 'indexPath');
    let prefix = [];
    let current = this._makeCurrentNode(data, [], null);
    for(let i = 0; i < indexPath.length; i++) {
      let index = indexPath[i];
      prefix.push(i);
      let items = this.getItems(data, prefix);
      data = items[i];
      current = this._makeCurrentNode(data, indexPath, current);
    }
    let menu = this.getMenu(data, indexPath);
    Ember.set(menu, 'current', current);
    return menu;
  }),
  current: Ember.computed.alias('menu.current'),

  getMenu(data, indexPath) {
    let sub = this.getItems(data, indexPath);
    return sub.map((item, index)=> {
      let currentIndexPath = indexPath.slice()
      currentIndexPath.push(index);
      let label = this.getItemLabel(item, currentIndexPath);
      let key = this.getItemKey(item, currentIndexPath);
      let items = this.getItems(item, currentIndexPath);
      if (items != null && items.length === 0) {
        items = null
      }
      return {item, items, label, key, indexPath: currentIndexPath};
    });
  },
  getItems(data, indexPath) {
    let items = this.get('items');
    if (items == null) { items = 'items'; }
    let sub;
    if (typeof items === 'string') {
      return data[items];
    }
    else {
      return items(data, indexPath);
    }
  },
  getItemLabel(item, indexPath) {
    let label = this.get('label');
    if (label == null) { label = 'name'; }
    if (typeof label === 'function') {
      return label(item, indexPath);
    }
    label = ('' + (item[label] || item)).trim();
    if (label.length == 0) { return ''; }
    return label[0].toUpperCase() + label.slice(1);
  },
  getItemKey(item, indexPath) {
    let key = this.get('key');
    if (key == null) { key = 'name'; }
    if (typeof key === 'function') {
      return key(item, indexPath)
    }
    return item[key] || item;
  },
  _makeCurrentNode(item, indexPath, prev) {
    return {
      label: this.getItemLabel(item, indexPath),
      item: item,
      prev: prev
    };
  },

  actions: {
    select(item) {
      this.sendAction('select', item);
      //console.log("SELECT", JSON.stringify(item));
    },
    open(item) {
      let path = this.get('path')
      let key = item.key;
      path.pushObject(key);
      this.sendAction('open', item);

      //console.log("OPEN", JSON.stringify(item));
    },
    selectHeader(current) {
      //console.log("select header", current.label);
      this.sendAction('selectHeader', current);
    },
    close(current) {
      //console.log("close", current.label);
      this.get('path').popObject();
      this.sendAction('close', current);
    }
  }
});