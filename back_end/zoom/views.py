from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
import jwt
import requests
import json
from time import time
import hashlib
import hmac
import base64



# Enter your API key and your API secret
API_KEY = 'QsO_S_azQ9SuDKv8Db3faQ'
API_SEC = '4FgAcYaNFqJ6FLixEy1fCU84fVkZaOjZXEco'

# create a function to generate a token
# using the pyjwt library


def generateToken():
	token = jwt.encode(

		# Create a payload of the token containing
		# API Key & expiration time
		{'iss': API_KEY, 'exp': time() + 5000},

		# Secret used to generate token signature
		API_SEC,

		# Specify the hashing alg
		algorithm='HS256'
	)
	return token
# .decode('utf-8')

# create json data for post requests
meetingdetails = {"topic": "The title of your zoom meeting",
				"type": 2,
				"start_time": "2019-06-14T10: 21: 57",
				"duration": "45",
				"timezone": "Europe/Madrid",
				"agenda": "test",

				"recurrence": {"type": 1,
								"repeat_interval": 1
								},
				"settings": {"host_video": "true",
							"participant_video": "true",
							"join_before_host": "False",
							"mute_upon_entry": "False",
							"watermark": "true",
							"audio": "voip",
							"auto_recording": "cloud"
							}
				}

# send a request with headers including
# a token and meeting details

# @api_view(['GET'])
# def createMeeting2(request):

#     # change email
# 	headers = {'authorization': 'Bearer ' + generateToken(),
# 			'content-type': 'application/json'}
    
# 	r = requests.post(
# 		f'https://api.zoom.us/v2/users/wajdibejaoui26@gmail.com/meetings',
# 		headers=headers, data=json.dumps(meetingdetails))

# 	print("\n creating zoom meeting ... \n")
# 	# converting the output into json and extracting the details
# 	y = json.loads(r.text)
# 	join_URL = y["join_url"]
# 	meetingPassword = y["password"]

# 	print(
# 		f'\n here is your zoom meeting link {join_URL} and your \
# 		password: "{meetingPassword}"\n')
    
# 	data = {"join_URL" : join_URL , "meetingPassword" : meetingPassword}
# 	return Response(data)

@api_view(['POST'])
def createMeeting(request):
	email = request.data['email']

	headers = {'authorization': 'Bearer ' + generateToken(),
			'content-type': 'application/json'}
	
	r = requests.post(
		f'https://api.zoom.us/v2/users/{email}/meetings',
		headers=headers, data=json.dumps(meetingdetails))

	print("\n creating zoom meeting ... \n")
	# converting the output into json and extracting the details
	y = json.loads(r.text)
	join_URL = y["join_url"]
	meetingPassword = y["password"]

	print(
		f'\n here is your zoom meeting link {join_URL} and your \
		password: "{meetingPassword}"\n')
    

	data = {"join_URL" : join_URL , "meetingPassword" : meetingPassword}
	return Response(data)
    


def generateSignature(data):
    ts = int(round(time() * 1000)) - 30000
    msg = data['apiKey'] + str(data['meetingNumber']) + str(ts) + str(data['role'])
    message = base64.b64encode(bytes(msg, 'utf-8'))
    # message = message.decode("utf-8")
    secret = bytes(data['apiSecret'], 'utf-8')
    hash = hmac.new(secret, message, hashlib.sha256)
    hash =  base64.b64encode(hash.digest())
    hash = hash.decode("utf-8")
    tmpString = "%s.%s.%s.%s.%s" % (data['apiKey'], str(data['meetingNumber']), str(ts), str(data['role']), hash)
    signature = base64.b64encode(bytes(tmpString, "utf-8"))
    signature = signature.decode("utf-8")
    return signature.rstrip("=")

    # data = {'apiKey': "" ,'apiSecret': "",'meetingNumber': 888,'role': 0}
@api_view(['POST'])
def createSignature(request):
	meetingNumber = request.data['meetingNumber']
	role = request.data['role']
	data = {'apiKey' : API_KEY, 'apiSecret' : API_SEC, 'meetingNumber': meetingNumber, 'role': role}
	response = {'signature': generateSignature(data)}
	return Response(response)
	 
	
	
        

