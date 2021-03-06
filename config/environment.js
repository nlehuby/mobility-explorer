/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'mobility-playground',
    environment: environment,
    baseURL: '/',
    location: '#',
    transitlandDatastoreHost: 'https://transit.land',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    mapMatching: true
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    // ENV.transitlandDatastoreHost = 'https://dev.transit.land';
  }

  if (environment === 'staging') {
    ENV.baseURL = '/mobility/explorer/';
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    // ENV.googleAnalytics = {
    //   webPropertyId: 'UA-47035811-4'
    // };
    ENV.transitlandDatastoreHost = 'https://dev.transit.land';

  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.googleAnalytics = {
      webPropertyId: 'UA-47035811-1'
    
    };
    ENV.baseURL = '/mobility/explorer/';
    ENV.mapMatching = true;
  }

  return ENV;
};