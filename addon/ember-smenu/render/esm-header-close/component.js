// ember-smenu/render/esm-header-label/component

import Ember from 'ember';
import layout from './template';
import RenderCell from 'ember-declarative/render-cell/mixin';

export default Ember.Component.extend(RenderCell, {
  layout: layout,
  classNames: ['menu-header-close'],
  source: Ember.computed.alias('current.headerCloseElement'),

  click() {
    this.sendAction('close');
  }

});