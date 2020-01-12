from datetime import datetime
import sched
import time
import psutil
from apscheduler.schedulers.blocking import BlockingScheduler

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
    print(line)
def dojob():
    #创建调度器：BlockingScheduler
    scheduler = BlockingScheduler()
    #添加任务,时间间隔2S
    scheduler.add_job(task, 'interval', seconds=2, id='test_job1')
    scheduler.start()
if __name__ == '__main__':
    dojob()