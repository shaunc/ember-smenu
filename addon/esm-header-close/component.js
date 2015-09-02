// ember-smenu/esm-item/component

import Ember from 'ember';
import PortalDeclaration from 'ember-declarative/portal-declaration/mixin';
import layout from './template';

export default Ember.Component.extend(PortalDeclaration, {
  layout: layout,

  current: Ember.computed.alias('declarationContainer.current'),
  watchAttribute: 'current',
  notifyAttribute: 'current',
  portalContainer: Ember.computed.alias('current'),
  portalAttribute: 'headerCloseElement',
  portalElementClass: 'esm-header-close',

  actions: {
    close(current) {
      this.get('declarationContainer').send('close', current);
    },
  }
});