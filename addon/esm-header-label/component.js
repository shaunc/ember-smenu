// ember-smenu/esm-header-label/component

import Ember from 'ember';
import DeclarationBase from 'ember-declarative/declaration-base/mixin';
import EmberSMenu from '../ember-smenu/component';
import layout from './template';
import { exposeElement } from 'ember-declarative/utils/expose';

export default Ember.Component.extend(DeclarationBase, {
  layout: layout,
  declarationContainerClass: EmberSMenu,

  menuComponent: Ember.computed.alias('declarationContainer'),
  current: Ember.computed.alias('menuComponent.current'),

  didUpdateDeclaration() {
    this._super();
    let current = this.get('current');
    exposeElement(
      this.element, current, 'esm-header-label', 'headerLabelElement');
  },
  actions: {
    selectHeader(current) {
      this.get('menuComponent').send('selectHeader', current);
    }
  }
});