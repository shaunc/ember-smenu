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
  '/ember-smenu', 'Integration | ember-smenu | basic usage', {
  integration: true,
  beforeEach: function() {
    this.application = startApp();
    this.set('basicData', basicData);
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});


test('render default content', function(assert) {
  assert.expect(8);
  this.render(hbs`{{ember-smenu data=basicData}}`);
  checkSMenuText(this.$('.ember-smenu'), assert, {
    header: {text: 'Shopping', control: null}, // "◀"
    menu: [
      {text: 'Fruits', control: "▶"},
      {text: 'Nuts'},
      {text: 'Bread'}]
  });
});

test('select menu item', function(assert){
  this.set('select', function(actualItem){
    const sub = basicData.items[0];    
    checkSelectedItem(assert, actualItem, sub, [0]);
  });
  this.render(hbs`{{ember-smenu data=basicData open=open}}`);
  const fruits = this.$('.menu-item-label')[0];
  return click(fruits).then(()=>{
    checkSMenuText(this.$('.ember-smenu'), assert, {
      header: {text: 'Shopping', control: null}, // "◀"
      menu: [
        {text: 'Fruits', control: "▶"},
        {text: 'Nuts'},
        {text: 'Bread'}]
    });
  });
});

test('open submenu', function(assert){
  this.set('open', function(item){
    const sub = basicData.items[0];
    checkSelectedItem(assert, item, sub, [0]);
  });
  this.render(hbs`{{ember-smenu data=basicData open=open}}`);
  const shopping = this.$('.menu-item-open');
  return click(shopping).then(()=>{
    checkSMenuText(this.$('.ember-smenu'), assert, {
      header: {text: 'Fruits', control: "◀"}, 
      menu: [
        {text: 'Apple'},
        {text: 'Banana'},
        {text: 'Orange', control: "▶"}
      ]
    });
  });
});

test('start at path', function(assert){
  this.render(hbs`{{ember-smenu data=basicData path="/fruits"}}`);
  checkSMenuText(this.$('.ember-smenu'), assert, {
    header: {text: 'Fruits', control: "◀"}, 
    menu: [
      {text: 'Apple'},
      {text: 'Banana'},
      {text: 'Orange', control: "▶"}
    ]
  });
});

test('close sub-menu', function(assert){
  this.set('close', function(actualHeader){
    const sub = basicData.items[0];
    const prev = {label: 'Shopping', item: basicData};
    checkSelectedHeader(assert, actualHeader, sub, prev);
  });
  this.render(hbs`{{ember-smenu data=basicData path="/fruits" close=close}}`);
  const close = this.$('.menu-header-close')[0];
  return click(close).then(()=>{
    checkSMenuText(this.$('.ember-smenu'), assert, {
      header: {text: 'Shopping', control: null}, 
      menu: [
        {text: 'Fruits', control: "▶"},
        {text: 'Nuts'},
        {text: 'Bread'}]
    });
  });
});

test('select header', function(assert){
  this.set('selectHeader', function(actualHeader){
    const sub = basicData.items[0];
    const prev = {label: 'Shopping', item: basicData};
    checkSelectedHeader(assert, actualHeader, sub, prev);
  });
  this.render(hbs`{{ember-smenu data=basicData path="/fruits" selectHeader=selectHeader}}`);
  const header = this.$('.menu-header-label')[0];
  return click(header).then(()=>{
    checkSMenuText(this.$('.ember-smenu'), assert, {
      header: {text: 'Fruits', control: "◀"}, 
      menu: [
        {text: 'Apple'},
        {text: 'Banana'},
        {text: 'Orange', control: "▶"}
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
  this.render(hbs`{{ember-smenu data=basicData selectHeader=selectHeader}}`);
  const header = this.$('.menu-header-label')[0];
  return click(header).then(()=>{
    checkSMenuText(this.$('.ember-smenu'), assert, {
      header: {text: 'Shopping', control: null}, 
      menu: [
        {text: 'Fruits', control: "▶"},
        {text: 'Nuts'},
        {text: 'Bread'}]
    });
  });
});

