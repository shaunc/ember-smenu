// ember-smenu/ember-smenu/render/esm-menu-sub/component.js

import Ember from 'ember';
import layout from './template';
import RenderCell from 'ember-declarative/render-cell/mixin';

export default Ember.Component.extend(RenderCell, {
  layout: layout,
  classNames: ['menu-item-sub'],
  copyChildren: true,

  source: Ember.computed.alias('item.subElement'),

  click() {
    this.sendAction('open');
  }
});