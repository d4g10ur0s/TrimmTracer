// db.js
const { Client, types } = require('cassandra-driver');

const cassandraClient = new Client({
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'datacenter1',
  keyspace: 'trimmtracer',
  poolingOptions: {
    maxRequestsPerConnection: 32767,
    maxConnectionsPerHost: {
      [types.distance.local]: 2,
      [types.distance.remote]: 1
    }
  }
});

cassandraClient.connect()
  .then(() => console.log('Connected to cluster'))
  .catch((err) => console.error('Unable to connect', err));

module.exports = cassandraClient;
