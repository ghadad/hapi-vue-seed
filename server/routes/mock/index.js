var Xml2json = require("xml2json");
var js2Toxml = require("js2xmlparser");

//Response.OutParams.MemberOf.Group
const ldap = {
    method: ['POST', 'GET'],
    path: '/mock/ldap',
    config: {
        auth: false
    },
    handler: function (request, reply) {
        let  reqJson = Xml2json.toJson(request.payload, {object: true});
        
        let Groups = reqJson.Request.InParams.MemberOf.Group ;
        console.log(Groups);
        var ldapresponse = js2Toxml.parse("Response",
        {
                            'xmlns:jms1': 'http://www.tibco.com/namespaces/tnt/plugins/jms',
                            ResponseHeader:
                                        {ServiceName: 'UserAuthGroup',
                                            EAI_Status: '0',
                                            Application_Status: '0'},
                                OutParams: {STATUS: '0',
                                    MemberOf: {Group:Groups}
                                }
                            }
                                                   
        );
        
        return reply(ldapresponse)

    }
};
module.exports = [
    ldap
]
