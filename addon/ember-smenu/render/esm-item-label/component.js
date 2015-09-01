// ember-smenu/ember-smenu/render/esm-menu-label/component.js

import Ember from 'ember';
import layout from './template';
import RenderCell from 'ember-declarative/render-cell/mixin';

export default Ember.Component.extend(RenderCell, {
  layout: layout,
  classNames: ['menu-item-label'],
  copyChildren: true,

  source: Ember.computed.alias('item.labelElement'),
  text: Ember.computed.alias('item.label'),

  click() {
    this.sendAction('select');
  }


});