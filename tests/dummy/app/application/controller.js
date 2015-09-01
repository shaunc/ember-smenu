// dummy/application/controller.js

import Ember from 'ember';

export default Ember.Controller.extend({
  
  data: {
    name: 'shopping', items: [
      {name: 'fruits', items: ['apple', 'banana', 'orange']},
      'nuts', 'bread']}
});
