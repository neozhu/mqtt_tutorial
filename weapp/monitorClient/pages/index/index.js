//获取应用实例
import Page from '../../common/page';
import Notify from '@vant/weapp/notify/notify';
import mqtt from '../../utils/mqtt.min.js';
const app = getApp()
let client=null;
Page({
  data: { 
    state:'停止',
    disabled: false,
    opts: {
      onInit: initChart
    }

  },
  //事件处理函数
  onLoad: function () {
    
  },
  onReady: function() {
  },
  start(){
    const url = "wxs://guangzhoushizhuo.xyz:8084/mqtt";
    const topic = "testtopic/#";
    const clientId =
      "weappclient_" +
      Math.random()
        .toString(16)
        .substr(2, 8);
    const options = {
      keepalive: 10,
      clientId: clientId,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
      },
      username: "weappclient",
      password: "weappclient",
      rejectUnauthorized: false
    };
    client = mqtt.connect(url, options);
    client.on("connect", () => {
      client.subscribe(topic, error => {
        if (!error) {
          this.setData({ state: '启动' })
          this.setData({ disabled: true })
          Notify({ type: 'success', message: '连接成功' });
          console.log('start....')
        }
      });
    });
    client.on("disconnect", packet => {
      // eslint-disable-next-line no-console
      console.log(packet);
    });
    client.on("close", () => {
      // eslint-disable-next-line no-console
      console.log('close');
    });
    client.on("offline", () => {
      // eslint-disable-next-line no-console
      console.log("offline");
    });
    client.on("error", error => {
      console.log(error);
    });
    client.on("message", (tp, playload) => {
      const item = JSON.parse(playload);
      console.log(`received:${tp} | ${item.msg}`);
      data.unshift(item);
      if (data.length >= 10) {
        data.pop()
      }
      chart.changeData(data);

       
    });
    
  },
  stop(){
    //client.end();
    //this.setData({ state: '停止' })
    //         this.setData({ disabled: false })
     //Notify({ type: 'danger', message: '断开连接' });
    const topic = "testtopic/#";
    client.unsubscribe(topic, error => {

      if (!error) {
        client.end(true,{});
        this.setData({ state: '停止' })
        this.setData({ disabled: false })
        Notify({ type: 'danger', message: '断开连接' });
      }
    });

   
    
  }
})

let chart = null;
const data = [];
function getRecord(offset) {
  offset = offset || 0;
  return {
    time: new Date().getTime() + offset * 1000,
    value: Math.random() + 10
  };
}
function initChart(canvas, width, height, F2) {
  
  data.push(getRecord(-2));
  data.push(getRecord(-1));
  data.push(getRecord());
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  const defs = {
    time: {
      type: 'timeCat',
      mask: 'HH:mm:ss',
      range: [0, 1]
    },
    value: {
      tickCount: 5,
      min: 8
    }
  };
  chart.source(data, defs);

  

  chart.axis('time', {
    label: function label(text, index, total) {
      const textCfg = {
        text: ''
      };
      if (index === 0) {
        textCfg.textAlign = 'left';
        textCfg.text = text;
      } else if (index === total - 1) {
        textCfg.textAlign = 'right';
        textCfg.text = text;
      }
      return textCfg;
    }
  });

  chart.line().position('time*value').animate({
    update: {
      animation: 'lineUpdate'
    }
  });

  chart.render();
  return chart;
}