import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SocieteService {
  private url =
    'http://localhost:8124/soap-generic/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC';

  async findAll() {
    const soapBody = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
      xmlns:wss="http://www.adonix.com/WSS"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

      <soapenv:Body>
        <wss:query>
          <callContext>
            <codeLang>FRA</codeLang>
            <poolAlias>SEED</poolAlias>
            <requestConfig>adxwss.optreturn=JSON</requestConfig>
          </callContext>

          <publicName>YCPY</publicName>
          <objectKeys></objectKeys>
          <listSize>10</listSize>
        </wss:query>
      </soapenv:Body>
    </soapenv:Envelope>`;

    try {
      const response = await axios.post(this.url, soapBody, {
        headers: {
          'Content-Type': 'text/xml',
        },
      });

      console.log('🔥 SOAP RAW RESPONSE:');
      console.log(response.data);

      // ⚠️ ici on devra parser X
      // ML plus tard
      return this.mockParse(response.data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // TEMPORAIRE (on remplace après parsing XML réel)
  private mockParse(xml: any) {
    return [
      { code: 'S1', label: 'Société 1' },
      { code: 'S2', label: 'Société 2' },
    ];
  }
}
