// ember-smenu/render/esm-header-label/component

import Ember from 'ember';
import layout from './template';
import PortalRender from 'ember-declarative/portal-render/mixin';

export default Ember.Component.extend(PortalRender, {
  layout: layout,
  classNames: ['menu-header-close'],
  portal: Ember.computed.alias('current.headerCloseElement'),

  click() {
    this.sendAction('close');
  }

});