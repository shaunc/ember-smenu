// ember-smenu/ember-smenu/render/esm-item

import Ember from 'ember';
import layout from './template';
import RenderCell from 'ember-declarative/render-cell/mixin';

export default Ember.Component.extend(RenderCell, {
  layout: layout,
  classNames: ['menu-item'],
  copyChildren: true,

  source: Ember.computed.alias('item.itemElement'),
  text: Ember.computed.alias('item.label'),

});