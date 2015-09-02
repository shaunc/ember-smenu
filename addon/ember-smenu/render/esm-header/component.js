// ember-smenu/render/esm-header

import Ember from 'ember';
import layout from './template';
import PortalRender from 'ember-declarative/portal-render/mixin';

export default Ember.Component.extend(PortalRender, {
  layout: layout,
  classNames: ['menu-header'],
  portal: Ember.computed.alias('current.headerElement'),
  text: Ember.computed.alias('current.label'),
});