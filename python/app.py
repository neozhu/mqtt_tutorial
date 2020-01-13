from datetime import datetime
import sched
import time
import psutil
from apscheduler.schedulers.blocking import BlockingScheduler
import paho.mqtt.client as mqtt
import json

'''
每个 10 秒打印当前时间。
'''
def timedTask():
    # 初始化 sched 模块的 scheduler 类
    scheduler = sched.scheduler(time.time, time.sleep)
    # 增加调度任务
    scheduler.enter(2, 1, task)
    # 运行任务
    scheduler.run()

# 定时任务
def task():
    print(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    #获取cpu使用情况
    cpuper = psutil.cpu_percent()
    #获取内存使用情况：系统内存大小，使用内存，有效内存，内存使用率
    mem = psutil.virtual_memory()
    #内存使用率
    memper = mem.percent
    #获取当前时间
    now = datetime.now()
    ts = now.strftime('%H:%M:%S')
    line = f'{ts} cpu:{cpuper}%, mem:{memper}%'
    msg  = json.dumps({'value': cpuper, 'time': now.strftime('%Y-%m-%dT%H:%M:%S')})
    mqttClient.publish(topic, payload=msg, qos=0)
    print(line)
def dojob():
    #创建MQTT连接
    connect()
    #创建调度器：BlockingScheduler
    scheduler = BlockingScheduler()
    #添加任务,时间间隔2S
    scheduler.add_job(task, 'interval', seconds=1, id='test_1')
    scheduler.start()
#设置mqtt参数
topic="host/cpu"
strBroker = "guangzhoushizhuo.xyz"
port = 1883
mqttClient = mqtt.Client("pyclient")
user = "pyclient"            
password = "pyclient" 
def on_publish(client, obj, mid):
    print("Publish, mid: "+str(mid))
def on_connect(client, userdata, flags, rc):
      print("Connected with result code "+str(rc))
def connect():
    mqttClient.on_connect = on_connect
    mqttClient.on_publish = on_publish
    mqttClient.username_pw_set(user,password=password)
    mqttClient.connect(strBroker, port, 60)
    mqttClient.loop_start()
if __name__ == '__main__':
    #connect()
    dojob()