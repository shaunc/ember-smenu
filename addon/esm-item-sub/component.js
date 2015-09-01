// ember-smenu/esm-item/component

import Ember from 'ember';
import DeclarationBase from 'ember-declarative/declaration-base/mixin';
import EmberSMenu from '../ember-smenu/component';
import layout from './template';
import { exposeElementList } from 'ember-declarative/utils/expose';

export default Ember.Component.extend(DeclarationBase, {
  layout: layout,
  declarationContainerClass: EmberSMenu,

  menuComponent: Ember.computed.alias('declarationContainer'),
  menu: Ember.computed.alias('menuComponent.menu'),

  didUpdateDeclaration() {
    this._super();
    let menu = this.get('menu');
    exposeElementList(this.element, menu, 'esm-menu-sub', 'subElement');
  },
  actions: {
    open(item) {
      this.get('menuComponent').send('open', item);
      this.notifyPropertyChange('menu');
    },
  }
});