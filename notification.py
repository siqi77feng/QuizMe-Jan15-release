#!/bin/python3

import pymongo
from pymongo import MongoClient
import csv
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import os

FROM_ADDRESS = 'notifications@quiz-me.co'
TO_ADDRESS = 'adam.p.young@colorado.edu'

FILE_LOCATION = 'output.csv'

client = MongoClient()
db = client.quizme

notificationList = [['identikey', 'name', 'date']]

for user in db.finished.find({'sentEmail' : '0'}):
    newDate = str(user['date'])
    internalList = [user['identikey'], user['name'], newDate]
    notificationList.append(internalList)
    db.finished.update({"_id" : user['_id']},{"$set" : {'sentEmail' : 1}})

if len(notificationList) > 1:
    ## Connect to the email server
    server=smtplib.SMTP()
    server.connect('localhost')
    msg = MIMEMultipart()
    msg['From'] = FROM_ADDRESS
    msg['To'] = TO_ADDRESS
    msg['Subject'] = "New list of users who have completed tutorial"
    msg.preamble = 'List of users who have completed tutorial'

    with open(FILE_LOCATION,'w') as myfile:
        wr = csv.writer(myfile)
        for row in notificationList:
            wr.writerows([row])
    with open(FILE_LOCATION) as emailFile:
        attachment = MIMEBase('application','octet-stream')
        attachment.set_payload(emailFile.read())
        encoders.encode_base64(attachment)
        attachment.add_header('Content-Disposition', 'attachment',filename=os.path.basename(FILE_LOCATION))
    msg.attach(attachment)
    server.send_message(msg)
    del msg
    server.quit()
