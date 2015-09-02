// ember-smenu/render/esm-header-label/component

import Ember from 'ember';
import layout from './template';
import PortalRender from 'ember-declarative/portal-render/mixin';

export default Ember.Component.extend(PortalRender, {
  layout: layout,
  classNames: ['menu-header-label'],

  portal: Ember.computed.alias('current.headerLabelElement'),
  text: Ember.computed.alias('current.label'),

  click() {
    this.sendAction('selectHeader');
  }

});