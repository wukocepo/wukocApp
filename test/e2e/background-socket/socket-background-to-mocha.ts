import log from 'loglevel';
import { isManifestV3 } from '../../../shared/modules/mv3.utils';

class SocketBackgroundToMocha {
  private client: WebSocket;

  constructor() {
    this.client = new WebSocket('ws://localhost:8111');
    this.client.onopen = () => log.debug('SocketBackgroundToMocha WebSocket connection opened');
    this.client.onmessage = (ev: MessageEvent) => {
      let message;
      try {
        message = JSON.parse(ev.data);
      } catch (e) {
        throw new Error(`Error in JSON sent to SocketBackgroundToMocha: ${(e as Error).message}`);
      }
      this.receivedMessage(message);
    };
    this.client.onclose = () => log.debug('SocketBackgroundToMocha WebSocket connection closed');
    this.client.onerror = (error) => log.error('SocketBackgroundToMocha WebSocket error:', error);
  }

  async waitUntilWindowWithProperty(property, value) {
    const delayStep = 200;
    const timeout = 10000;

    for (let timeElapsed = 0; timeElapsed <= timeout; timeElapsed += delayStep) {
      const tabs = await this.queryTabs({});
      if (tabs.some((tab) => tab[property] === value)) return;
      
      await new Promise((resolve) => setTimeout(resolve, delayStep));
      
      if (timeElapsed === timeout)
        return void(this.send({ command: 'notFound', property, value, tabs }));
      
     }
    
     return void(this.send({ command: 'notFound', property, value }));
   }

   private async queryTabs(queryInfo): Promise<chrome.tabs.Tab[]> {
     if (isManifestV3)
       return chrome.tabs.query(queryInfo);

     return new Promise((resolve) =>
       chrome.tabs.query(queryInfo, resolve),
     );
   }

   private cleanTabs(tabs): chrome.tabs.Tab[] { 
     return tabs.map(tab =>
       tab.favIconUrl && tab.favIconUrl.length > 40 ? { ...tab, favIconUrl: undefined } : tab
     );
   }

   send(message): void { 
     this.client.send(JSON.stringify(message));
   }

   private async receivedMessage(message): Promise<void> | undefined{
     switch(message.command){
       case 'queryTabs':
         const tabs2=await this.queryTabs({ title:message.title });
         console.log(tabs2);
         break;
       case 'waitUntilWindowWithProperty':
          if(!!message.property && !!message.value)
            await void(this.waitUntilWindowWithProperty(
              message.property,
              message.value,
            ));
          break;   
       
        default:
          console.log("received",message.command);         
           break;

}
}

let _socketBackgroundToMocha;

export function getSocketBackgroundToMocha() {  
if (!_socketBackgroundToMocha && !process.env.IN_TEST)
 startSocketBackgroundToMocha();
return _socketBackgroundToMocha;
}

function startSocketBackgroundToMocha(){
if(!process.env.IN_TEST)return;
_socketBackgroundToMocha=new SocketBackgroundToMocha();
}
