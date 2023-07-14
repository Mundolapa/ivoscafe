from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore
from django_apscheduler.models import DjangoJobExecution

from timer.models import Timer

def update_timer():
    timer = Timer.objects.first()
    if timer is not None:
        time_left = timer.time_left() - 1
        if time_left >= 0:
            timer.set_time_left(time_left)

def start():
    scheduler = BackgroundScheduler()
    scheduler.add_jobstore(DjangoJobStore(), "default")

    # Executes update_timer every second
    scheduler.add_job(update_timer, "interval", seconds=1)

    scheduler.start()
