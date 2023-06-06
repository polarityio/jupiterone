polarity.export = PolarityComponent.extend({
  details: Ember.computed.alias('block.data.details'),
  entity: Ember.computed.alias('block.entity'),
  timezone: Ember.computed('Intl', function () {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }),
  init() {
    console.log(this.get('entity'));
    this._super(...arguments);
  }
});
