var ldap = require('ldapjs');
var client = ldap.createClient({
  url: 'ldap://10.171.9.23:4100'
});
var opts = {
  filter: '(&(l=Seattle)(email=*@foo.com))',
  scope: 'sub',
  attributes: ['dn', 'sn', 'cn']
};

client.search('o=example', opts, function(err, res) {
  assert.ifError(err);

  res.on('searchEntry', function(entry) {
    console.log('entry: ' + JSON.stringify(entry.object));
  });
  res.on('searchReference', function(referral) {
    console.log('referral: ' + referral.uris.join());
  });
  res.on('error', function(err) {
    console.error('error: ' + err.message);
  });
  res.on('end', function(result) {
    console.log('status: ' + result.status);
  });
});
// http://10.171.9.23:4100
