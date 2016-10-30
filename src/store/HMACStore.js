import { observable, computed, autorun } from 'mobx';
import jsSHA from 'jssha'
import moment from 'moment'

export default class HMACStore {

    @observable header = {
        authTime: moment().format('YYYYMMDDTHHmmssZZ'),
        custId: 'customerId',
        custToken: '',
        esn: ''
    };

    @observable partner = {
        name: 'REFERENCE',
        secret: 'AQEBWwABASCtsTwTF+bNvZT+CXuoY4U3HOUgpwWGpi7m2kEDP0TWiR/68rc='
    }

    @observable payload ={
        str: '{"PartnerChargeCountry":"FR","Channel":"Website","TokenErrorURL":"http://www.foobar.com","Type":"Intpay"}',
        endpoint: 'https://api.sandbox.netflix.com/mvpdapi/v3/subscription/token'
    }

    @computed get concatStr() {

        var strToSign = 'x-netflix-authorizationtime=' + this.header.authTime.trim();

        if (this.header.custId) { strToSign += ',x-netflix-partnercustomeridentifier=' + this.header.custId.trim() }
        if (this.header.custToken) { strToSign += ',x-netflix-partnercustomertoken=' + this.header.custToken.trim() }

        if (this.header.esn) { strToSign += ',x-netflix-esn=' + this.header.esn.trim(); }

        return strToSign;
    }

    @computed get payloadStr() {
        return this.payload.str.trim();
    }

    @computed get curlCmd() {

        var cmd = 'curl -v -X POST -H "Content-Type: application/json"'
                    + '\n -H "X-Netflix-AuthorizationTime: ' + this.header.authTime + '"';

        if (this.header.custId) { cmd += '\n -H "X-Netflix-PartnerCustomerIdentifier: ' + this.header.custId + '"'  }
        if (this.header.custToken) { cmd += '\n -H X-Netflix-PartnerCustomerToken=' + this.header.custToken.trim() + '"'}

        if (this.header.esn) { cmd += '\n -H "X-Netflix-ESN=' + this.header.esn.trim(); + '"'}

        cmd += '\n -H "X-Netflix-Header-Authorization: ' + this.sign( this.concatStr, this.partner.secret )  + '"'
                + '\n -H "X-Netflix-Payload-Authorization: ' + this.sign( this.payloadStr, this.partner.secret )  + '"'
                + '\n -d \'' + this.payload.str + '\''
                + '\n ' + this.payload.endpoint;

        return cmd;

    }

    @computed get copyableCurlCmd() {
        return this.curlCmd.replace(/\n/g, '');
    }

    sign(strToSign, secret) {

        try {
            var hmacObj = new jsSHA('SHA-256', 'TEXT');

            hmacObj.setHMACKey(secret, 'B64');

            hmacObj.update(strToSign);

            return 'nflxv1 Credential=' + this.partner.name + ', Signature=' + hmacObj.getHMAC('B64');
        } catch (err) {
            console.error(err.message);
            return '-'
        }
    }

}
