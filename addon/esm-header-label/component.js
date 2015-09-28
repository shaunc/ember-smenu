// ember-smenu/esm-header-label/component

import Ember from 'ember';
import PortalDeclaration from 'ember-declarative/decl/ed-portal/mixin';
import layout from './template';

export default Ember.Component.extend(PortalDeclaration, {
  layout: layout,

  current: Ember.computed.alias('declarationContainer.current'),
  portalElementClass: 'esm-header-label',

  actions: {
    selectHeader(current) {
      this.get('declarationContainer').send('selectHeader', current);
    }
  }
});