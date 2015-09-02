// ember-smenu/esm-item-label/component

import Ember from 'ember';
import PortalDeclaration from 'ember-declarative/portal-declaration/mixin';
import layout from './template';

export default Ember.Component.extend(PortalDeclaration, {
  layout: layout,

  menu: Ember.computed.alias('declarationContainer.menu'),
  watchAttribute: 'menu',
  notifyAttribute: 'menu',
  portalContainer: Ember.computed.alias('menu'),
  portalAttribute: 'labelElement',
  portalElementClass: 'esm-menu-label',

  actions: {
    select(item) {
      this.get('declarationContainer').send('select', item);
    }
  }
});