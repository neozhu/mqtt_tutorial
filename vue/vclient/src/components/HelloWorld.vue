<template>
  <v-container>
    <v-snackbar v-model="snackbar">
      {{ text }}
    </v-snackbar>
    <v-card class="mx-auto" max-width="400">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">主机</v-list-item-title>
          <v-list-item-subtitle>IP：127.0.0.1</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row align="center">
          <v-col class="display-2" cols="6"> {{ cpuefficiency }} </v-col>
          <v-col class="display-2" cols="6"> {{ state }} </v-col>
        </v-row>
      </v-card-text>

      <v-list-item>
        <div class="chart-wrapper" style="width:100%">
          <canvas id="mychart" style="widows:100%" height="200"></canvas>
        </div>
      </v-list-item>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn :disabled="disabled" text @click="start()">开始</v-btn>
        <v-btn :disabled="!disabled" color="error" @click="stop()" text
          >停止</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import F2 from "@antv/f2";
import mqtt from "mqtt";
let chart = null;
let client = null;
export default {
  name: "HelloWorld",
  data: () => ({
    datasource: [],
    state: "停止",
    cpuefficiency: 0,
    snackbar: false,
    text: "",
    disabled: false
  }),
  created() {},
  mounted() {
    this.initChart();
  },
  methods: {
    start() {
      //const that = this;
      const url = "wss://guangzhoushizhuo.xyz:8084/mqtt";
      const topic = "testtopic/#";
      const clientId =
        "vueclient_" +
        Math.random()
          .toString(16)
          .substr(2, 8);
      const options = {
        keepalive: 10,
        clientId: clientId,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        username: "vueclient",
        password: "vueclient",
        rejectUnauthorized: false
      };
      client = mqtt.connect(url, options);
      client.on("connect", () => {
        client.subscribe(topic, error => {
          if (!error) {
            this.state = "启动";
            this.text = "订阅成功";
            this.snackbar = true;
            this.disabled = true;
          }
        });
      });
      client.on("disconnect", packet => {
        // eslint-disable-next-line no-console
        console.log(packet);
      });
      client.on("offline", () => {
        // eslint-disable-next-line no-console
        console.log("offline");
      });
      client.on("error", error => {
        this.state = "错误";
        this.text = error;
        this.snackbar = true;
        this.disabled = false;
      });
      client.on("message", (tp, playload) => {
        const item = JSON.parse(playload);
        this.text = `${tp} | ${item.time} : ${item.value}`;
        this.snackbar = true;
        this.cpuefficiency = item.value;
        this.cpuefficiency = item.value.toFixed(2);
        this.datasource.push(item);

        if (this.datasource.length >= 10) {
          this.datasource.shift();
        }
        chart.changeData(this.datasource);
      });
      //const item = this.getRecord();
    },
    stop() {
      const topic = "testtopic/#";
      client.unsubscribe(topic, error => {
        if (!error) {
          client.end(true);
              this.state = "停止";
              this.text = "关闭订阅";
              this.snackbar = true;
              this.cpuefficiency = 0;
              this.disabled = false;
        
        }
      });

      //this.datasource=[];
      //chart.changeData(this.datasource);
    },
    // 添加数据，模拟数据，可以指定当前时间的偏移的秒
    getRecord(offset) {
      offset = offset || 0;
      return {
        time: new Date().getTime() + offset * 1000,
        value: Math.random() + 10
      };
    },
    initChart() {
      F2.Animate.registerAnimation("lineUpdate", function(
        updateShape,
        animateCfg
      ) {
        const cacheShape = updateShape.get("cacheShape"); // 该动画 shape 的前一个状态
        const cacheAttrs = cacheShape.attrs; // 上一个 shape 属性
        const oldPoints = cacheAttrs.points; // 上一个状态的关键点
        const newPoints = updateShape.attr("points"); // 当前 shape 的关键点

        const oldLength = oldPoints.length;
        const newLength = newPoints.length;
        const deltaLength = newLength - oldLength;

        const lastPoint = newPoints[newPoints.length - 1];
        for (let i = 0; i < deltaLength; i++) {
          oldPoints.push(lastPoint);
        }

        updateShape.attr(cacheAttrs);
        updateShape.animate().to({
          attrs: {
            points: newPoints
          },
          duration: 800,
          easing: animateCfg.easing
        });
      });
      const data = [];

      data.push(this.getRecord(-2));
      data.push(this.getRecord(-1));
      data.push(this.getRecord());
      this.datasource.push(this.getRecord(-2));
      this.datasource.push(this.getRecord(-1));
      this.datasource.push(this.getRecord());
      chart = new F2.Chart({
        id: "mychart",
        pixelRatio: window.devicePixelRatio
      });

      const defs = {
        time: {
          type: "timeCat",
          mask: "HH:mm:ss",
          range: [0, 1]
        },
        value: {
          tickCount: 5,
          min: 8
        }
      };
      chart.source(this.datasource, defs);
      chart.axis("time", {
        label: function label(text, index, total) {
          const textCfg = {
            text: ""
          };
          if (index === 0) {
            textCfg.textAlign = "left";
            textCfg.text = text;
          } else if (index === total - 1) {
            textCfg.textAlign = "right";
            textCfg.text = text;
          }
          return textCfg;
        }
      });

      chart
        .line()
        .position("time*value")
        .animate({
          update: {
            animation: "lineUpdate"
          }
        });

      chart.render();
    }
  }
};
</script>

<style scoped>
#mychart {
  width: 100%;
  height: 100%;
}
</style>
