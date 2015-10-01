import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
//import { skip } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import startApp from '../../helpers/start-app';
import {
  basicData, checkSMenuText, checkSelectedItem,
  checkSelectedHeader
  } from '../../helpers/ember-smenu';

moduleForComponent(
  '/ember-smenu', 'Integration | ember-smenu | custom item', {
  integration: true,
  beforeEach: function() {
    this.application = startApp();
    this.set('basicData', basicData);
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

function getTemplate() {
  return hbs`
    {{#ember-smenu data=basicData path=path
       open=open select=select close=close selectHeader=selectHeader}}
      {{#esm-item as |item select open index|}}
        <div class="menu-item-label" {{action select}} >
          {{index}} {{ item.label }}
        </div>
        {{#if item.items }}
          <div class="menu-item-open" {{action open}} >
            &gt;
          </div>
        {{/if}}
      {{/esm-item}}
    {{/ember-smenu}}`;
}

test('render default content', function(assert) {
  assert.expect(8);
  this.render(getTemplate());
  checkSMenuText(this.$('.ember-smenu'), assert, {
    header: {text: 'Shopping', control: null}, // "◀"
    menu: [
      {text: '0 Fruits', control: ">"},
      {text: '1 Nuts'},
      {text: '2 Bread'}]
  });
});

test('select menu item', function(assert){
  this.set('select', function(actualItem){
    const sub = basicData.items[0];    
    checkSelectedItem(assert, actualItem, sub, [0]);
  });
  this.render(getTemplate());
  const fruits = this.$('.menu-item-label')[0];
  click(fruits).then(()=>{
    checkSMenuText(this.$('.ember-smenu'), assert, {
      header: {text: 'Shopping', control: null}, // "◀"
      menu: [
        {text: '0 Fruits', control: ">"},
        {text: '1 Nuts'},
        {text: '2 Bread'}]
    });
  });
});

test('open submenu', function(assert){
  this.set('open', function(item){
    const sub = basicData.items[0];
    checkSelectedItem(assert, item, sub, [0]);
  });
  this.render(getTemplate());
  const shopping = this.$('.menu-item-open');
  click(shopping).then(()=>{
    checkSMenuText(this.$('.ember-smenu'), assert, {
      header: {text: 'Fruits', control: "◀"}, 
      menu: [
        {text: '0 Apple'},
        {text: '1 Banana'},
        {text: '2 Orange', control: ">"}
      ]
    });
  });
});

test('start at path', function(assert){
  this.set('path', '/fruits');
  this.render(getTemplate());
  checkSMenuText(this.$('.ember-smenu'), assert, {
    header: {text: 'Fruits', control: "◀"}, 
    menu: [
      {text: '0 Apple'},
      {text: '1 Banana'},
      {text: '2 Orange', control: ">"}
    ]
  });
});

test('close sub-menu', function(assert){
  this.set('close', function(actualHeader){
    const sub = basicData.items[0];
    const prev = {label: 'Shopping', item: basicData};
    checkSelectedHeader(assert, actualHeader, sub, prev);
  });
  this.set('path', '/fruits');
  this.render(getTemplate());
  const close = this.$('.menu-header-close')[0];
  click(close).then(()=>{
    checkSMenuText(this.$('.ember-smenu'), assert, {
      header: {text: 'Shopping', control: null}, 
      menu: [
        {text: '0 Fruits', control: ">"},
        {text: '1 Nuts'},
        {text: '2 Bread'}]
    });
  });
});

test('select header', function(assert){
  this.set('selectHeader', function(actualHeader){
    const sub = basicData.items[0];
    const prev = {label: 'Shopping', item: basicData};
    checkSelectedHeader(assert, actualHeader, sub, prev);
  });
  this.set('path', '/fruits');
  this.render(getTemplate());
  const header = this.$('.menu-header-label')[0];
  click(header).then(()=>{
    checkSMenuText(this.$('.ember-smenu'), assert, {
      header: {text: 'Fruits', control: "◀"}, 
      menu: [
        {text: '0 Apple'},
        {text: '1 Banana'},
        {text: '2 Orange', control: ">"}
      ]
    });
  });
});

test('select header, top', function(assert){
  this.set('selectHeader', function(actualHeader){
    const sub = basicData;
    const prev = null;
    checkSelectedHeader(assert, actualHeader, sub, prev);
  });
  this.render(getTemplate());
  const header = this.$('.menu-header-label')[0];
  click(header).then(()=>{
    checkSMenuText(this.$('.ember-smenu'), assert, {
      header: {text: 'Shopping', control: null}, 
      menu: [
        {text: '0 Fruits', control: ">"},
        {text: '1 Nuts'},
        {text: '2 Bread'}]
    });
  });
});

