from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__, static_folder = 'static', template_folder = 'templates')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
CORS(app)

import json
import random
hangman_words = ['Halloween','Computer','Python', 'Website']
# ===============================================================================

# Render Home Page
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/artist_one')
def artist_one():
    return render_template('artist_one.html')

@app.route('/artist_two')
def artist_two():
    return render_template('artist_two.html')

@app.route('/artist_three')
def artist_three():
    return render_template('artist_three.html')

@app.route('/artist_four')
def artist_four():
	return render_template('artist_four.html')

@app.route('/discussion_Board')
def discussion_Board():
	return render_template('discussion_Board.html')

@app.route('/game')
def game():
    return render_template('game.html')
@app.route('/signup')
def signup():
    return render_template('signup.html')
	
@app.route('/savecomments')
def savecomment():
	name = request.args.get('name')
	message = request.args.get('message')

	comment = {"name": name, "message": message}

	string_comment = json.dumps(comment)

	f = open('comments.txt', 'a')
	f.writelines(['\n', string_comment])
	f.close()
	return "", 201

@app.route('/getcomments')
def files():
	f = open('comments.txt', 'r')
	lines = f.readlines()

	comments = []
	for line in lines:
		line = line.strip()
		loadcomment = json.loads(line)
		comments.append(loadcomment)	
	f.close()
	return {"comments": comments}

def findSignup():
	newUser = []
	newPassword = []

@app.route('/verify')
def verify():
	username= request.args.get("username")
	password= request.args.get("password")

	if username == "Admin" and password == "im-In":
		return "You have successfully signed in"
	else:
		return "Try Again"

@app.route('/boardroom')
def boardroom():
	html_content = "<h1>Discussion Board</h1>"
	return html_content
	if username == "Admin" and password == "im-In":
		return "You have successfully signed in"
	else:
		return "Try Again"
	
@app.route('/word')
def word():
	pos = random.randint(0,len(hangman_words)-1)
	word = (hangman_words[pos])

	return {'word': word, 'length': len(word)}

@app.route('/word_lists')
def word_lists():
	user_guess = request.args.get("guess").upper()
	word_guessed = request.args.get("word").upper()
	positions = []
	for i in range(len(word_guessed)):
		if user_guess == word_guessed[i]:
			positions.append(i)
	if len(positions) == 0:
		return "Try Again"
	return {'user_guess': user_guess, "word": word_guessed, "positions": positions}

@app.route('/check_attempt')
def check_attempt():
	letter = request.args.get('letter')
	position = int(request.args.get('index'))




#This is not needed anymore. This was lab 4
# @app.route('/game_check')
# def game_check():
# 	user_guess = request.args.get("user_guess").upper()
# #if a letter is right it will say good job if it is not right it will say try again
# 	if user_guess == "C":
# 		return "C"
# 	elif user_guess == "M":
# 		return "M"
# 	elif user_guess == "O":
# 		return "O"
# 	elif user_guess == "U":
# 		return "U"
# 	elif user_guess == "R":
# 		return "R"
	
# 	else:
# 		return "Try Again"



#=======================================================
if __name__ == '__main__':
        app.run(debug=True, host='0.0.0.0', port=9000)
