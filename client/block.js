polarity.export = PolarityComponent.extend({
  details: Ember.computed.alias('block.data.details'),
  timezone: Ember.computed('Intl', function () {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }),
  activeTab: '',
  excludedProperties: ['id', 'name', 'tagAccountName','username'],
  expandableTitleStates: Ember.computed.alias('block._state.expandableTitleStates'),

  init() {
    this.set('activeTab', this.get('details.assetsDisplayTabs')[0]);
    if (!this.get('block._state')) {
      this.set('block._state', {});
      this.expandTitlesIfLessThanFourResults();
    }
    this._super(...arguments);
  },
  actions: {
    changeTab: function (tabName) {
      this.set('activeTab', tabName);
    },
    toggleExpandableTitle: function (assetsDisplayTab, index) {
      this.set(
        `block._state.expandableTitleStates`,
        Object.assign({}, this.get('block._state.expandableTitleStates'), {
          [assetsDisplayTab + index]: !this.get('block._state.expandableTitleStates')[
            assetsDisplayTab + index
          ]
        })
      );

      this.get('block').notifyPropertyChange('data');
    }
  },
  expandTitlesIfLessThanFourResults: function () {
    this.set(
      'block._state.expandableTitleStates',
      Object.entries(this.get('details.assetsResults')).reduce(
        (tabAgg, [assetsDisplayTab, assets]) =>
          Object.assign(
            {},
            tabAgg,
            assets.length <= 3 &&
              assets.reduce(
                (agg, asset, index) =>
                  Object.assign({}, agg, { [assetsDisplayTab + index]: true }),
                {}
              )
          ),
        {}
      )
    );
  }
});
