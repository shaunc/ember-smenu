// ember-smenu/esm-item/component

import Ember from 'ember';
import PortalDeclaration from 'ember-declarative/decl/ed-portal/mixin';
import layout from './template';

export default Ember.Component.extend(PortalDeclaration, {
  layout: layout,

  menu: Ember.computed.alias('declarationContainer.menu'),
  portalElementClass: 'esm-menu-item',

  actions: {
    select(item) {
      this.get('declarationContainer').send('select', item);
    },
    open(item) {
      this.get('declarationContainer').send('open', item);
    }
  }

});