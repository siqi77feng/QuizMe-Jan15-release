import pymongo
from pymongo import MongoClient
import datetime
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from string import Template

MY_ADDRESS = "no-reply@quiz-me.co"


## Current template email could remove username or replace it with identikey
emailText = "Hey $name!! Come back and finish your quiz on $subject. Enter your email: $email into the box on the Day 2 return page to resume your quiz!!! quiz-me.co/#/returnPage"
emailText2 = "Hey $name!! Come back and finish the final section of the tutorial. Enter your email: $email into the box on the day 3 return page to resume your quiz!!! quiz-me.co/#/day3"

## Connect to the email server
server=smtplib.SMTP()
server.connect('localhost')

## function to send email
def sendEmail(fromaddr, toaddr, body):
    msg = MIMEMultipart()
    msg['From'] = fromaddr
    msg['To'] = toaddr
    msg['Subject'] = "Come Back to QuizMe!!!"
    msg.attach(MIMEText(body, 'plain'))
    server.send_message(msg)
    del msg

## Get the time renage of when users should be sent a email. Currently an hour but prod will be 24 hours
lastDay = datetime.datetime.utcnow() - datetime.timedelta(hours = 23)
lastWeek = datetime.datetime.utcnow() - datetime.timedelta(days = 8)
client = MongoClient()
db = client.quizme
## Old code being kept here for reference currently will delete before prod
##for dic in db.test.find({ 'date' : {"$lte" : lastHour }}):
##    print(dic['user'])
## print("Fin")

## db.test.findAndModify({query: {user: "testUser2"}, update: {$set : {emailSent : 1}}})

## Find all users who took a quiz over the alloted time ago and send those users an email if they haven't been sent one yet. Might want to check if the user has already returned

for user in db.tutorial.find({ "$and" : [ {'date' : {"$lte" : lastDay }}, {'emailSent' : 0}] }):
    print(user['name'])
    email = Template(emailText)
    sendEmail(MY_ADDRESS, user['identikey'], email.substitute(name =user['name'], subject=user['subject'], email=user['identikey']))
    db.tutorial.update({"_id" : user['_id']},{"$set" : {'emailSent' : 1}})

for user in db.tutorial.find({ "$and" : [ {'date' : {"$lte" : lastWeek }}, {'oneWeekEmail' : 0}] }):
    print(user['name'])
    email2 = Template(emailText2)
    sendEmail(MY_ADDRESS, user['identikey'], email2.substitute(name =user['name'], email=user['identikey']))
    db.tutorial.update({"_id" : user['_id']},{"$set" : {'oneWeekEmail' : 1}})
print("Fin")
server.quit()
