// ember-smenu/ember-smenu/render/esm-menu-label/component.js

import Ember from 'ember';
import layout from './template';
import PortalRender from 'ember-declarative/portal-render/mixin';

export default Ember.Component.extend(PortalRender, {
  layout: layout,
  classNames: ['menu-item-label'],
  portal: Ember.computed.alias('menu.labelElement'),
  text: Ember.computed.alias('item.label'),

  click() {
    if (this.get('portal') == null) {
      this.sendAction('select');
    }
  }


});