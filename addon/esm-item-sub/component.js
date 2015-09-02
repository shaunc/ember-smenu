// ember-smenu/esm-item/component

import Ember from 'ember';
import PortalDeclaration from 'ember-declarative/portal-declaration/mixin';
import layout from './template';

export default Ember.Component.extend(PortalDeclaration, {
  layout: layout,

  menu: Ember.computed.alias('declarationContainer.menu'),
  watchAttribute: 'menu',
  notifyAttribute: 'menu',
  portalContainer: Ember.computed.alias('menu'),
  portalAttribute: 'subElement',
  portalElementClass: 'esm-menu-sub',

  actions: {
    open(item) {
      this.get('declarationContainer').send('open', item);
    },
  }
});