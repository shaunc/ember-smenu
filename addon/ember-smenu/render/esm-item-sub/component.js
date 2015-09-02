// ember-smenu/ember-smenu/render/esm-menu-sub/component.js

import Ember from 'ember';
import layout from './template';
import PortalRender from 'ember-declarative/portal-render/mixin';

export default Ember.Component.extend(PortalRender, {
  layout: layout,
  classNames: ['menu-item-sub'],
  portal: Ember.computed.alias('menu.subElement'),

  click() {
    if (this.get('portal') == null) {
      this.sendAction('open');
    }
  }
});