// ember-smenu/ember-smenu/render/esm-item

import Ember from 'ember';
import layout from './template';
import PortalRender from 'ember-declarative/portal-render/mixin';

export default Ember.Component.extend(PortalRender, {
  layout: layout,
  classNames: ['menu-item'],
  portal: Ember.computed.alias('menu.itemElement'),
  text: Ember.computed.alias('item.label'),
});
