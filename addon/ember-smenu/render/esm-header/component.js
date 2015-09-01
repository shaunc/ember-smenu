// ember-smenu/render/esm-header

import Ember from 'ember';
import layout from './template';
import RenderCell from 'ember-declarative/render-cell/mixin';

export default Ember.Component.extend(RenderCell, {
  layout: layout,
  classNames: ['menu-header'],
  copyChildren: true,

  source: Ember.computed.alias('current.headerElement'),
  text: Ember.computed.alias('current.label'),
});