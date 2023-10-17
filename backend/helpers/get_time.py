import datetime


def get_current_time():
    date = str(datetime.date.today()).split("-")
    year = date[0]
    month = date[1]
    day = date[2]

    moment = str(datetime.datetime.now()).split()[1].split(":")
    hour = moment[0]
    minute = moment[1]
    second = moment[2][:2]
    current_day = f"{year}:{month}:{day} {hour}:{minute}:{second}"
    return current_day
