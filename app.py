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
@app.route('/Library')
def library():
    return render_template('Library.html')
	
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

@app.route ('/signupaccount')
def signup_account():
	newUser = request.args.get('newUser')
	newPassword = request.args.get('newPassword')
	return signupaccount_helper(newUser, newPassword)


def signupaccount_helper(user, password):
	newAccount = {"newUser": user, "newPassword": password}
	string_newAccount = json.dumps(newAccount)

	l = open('logincredentials.txt', 'a')
	l.writelines(['\n', string_newAccount])
	# print(string_newAccount)
	l.close()
	return "", 201

# @app.route('/loginInfo')
# def logininfo():
# 	l = open('logincredentials.txt', 'r')
# 	lines = l.readlines()

# 	account = []
# 	for line in lines:
# 		temp = json.loads(lines[i])
# 		print(temp['newUser'])

		
@app.route('/verifyLogin')
def verifyLogin():
	newUser = request.args.get("newUser")
	newPassword = request.args.get("newPassword")

	return verifyNewlogin(newUser, newPassword)

def verifyNewlogin(user, password):
	#l for logincredentials.txt
	q = open('logincredentials.txt', 'r')
	lines = q.read().splitlines()
	for line in lines:
		# line = line.strip()
		if line == "":
			continue
		accountInfo = json.loads(line)
		if accountInfo['newUser'] == user and accountInfo['newPassword'] == password:
			q.close()
			return "You have successfully signed in"
	q.close()
	return "Try Again"
	# Read through the diction and check if the username and password is there. If not keeping reading until the end of the file.

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

#hfinn11.txt
#lab 7 
def count(book):
	result = 0
	for i in range(len(book)):
		if book[i] != '':
			result = result + 1
	return result

def word_count(someText):
	someText = someText.replace('\n', ' ')
	someText = someText.replace('--', ' ')

	items = someText.split(' ')

	answer = count(items)
	return answer

b = open('hfinn11.txt', 'r')
book = b.read()

content_of_book = b.read()
b.close

def bookinfo():
	someText = someText.replace('\n', ' ')
	someText = someText.replace('-', ' ')

	items = someText.split(' ')

	longestword = longest(items)
	return {"longest":longestword}

def longest():
	someText = someText.replace('\n', ' ')
	someText = someText.replace('-', ' ')

	items = someText.split(' ')

	longestword = longest(items)
	longest = ""
	for i in range(len(items)):
		if len(items[i]) > len(longest):
			longest = items[i]
	return longestword

# This is getting the book taking out the \n, -, :, and . to find the longest word in the book.
@app.route('/longestwordforbook')
def longestwords():
	b = open('hfinn11.txt', 'r')
	book = b.read()
	b.close

	someText = book.replace('\n', ' ')
	someText = someText.replace('-', ' ')
	someText = someText.replace('/', ' ')
	someText = someText.replace(':', ' ')
	someText = someText.replace('.', ' ')
	someText = someText.replace('"', ' ')
	someText = someText.replace(',', ' ')

	
	items = someText.split(' ')
	
	longest = ""

	# longestword = longest(items)
	# return {"longest":longestword}
	for i in range(len(items)):
		if len(items[i]) > len(longest):
			longest = items[i]
	return {"longest": longest}


# This is going to show the number of words that are in the file.
@app.route ('/countwords')
def countwords():
	b = open('hfinn11.txt', 'r')
	book = b.read()

	numberOfWords = word_count(book)
	b.close
	return {"number_of_words": numberOfWords}

@app.route('/textofbook')
def textofbook():
	b = open('hfinn11.txt', 'r')
	book = b.read()

	content_of_book = book
	b.close
	someText = book.replace('\n', ' ')
	someText = someText.replace('-', ' ')
	someText = someText.replace('/', ' ')
	someText = someText.replace(':', ' ')

	
	book = someText
	return {"book": content_of_book}

def findMostUsedWords(book):
	b = open('hfinn11.txt', 'r')
	book = b.read()
	b.close()
	frequencies = {}
	each_word = book.split()

	for i in range(len(each_word)):
		aWord = each_word[i].upper()

	if aWord in frequencies:
		frequencies[aWord] = frequencies[aWord] + 1
	else:
		frequencies[aWord] = 1
@app.route('/mostusedwords')
def mostusedwords():
	frequencies = {}
	b = open('hfinn11.txt', 'r')
	book = b.read()
	b.close()
	each_word = book.split()

	for i in range(len(each_word)):
		aWord = each_word[i].upper()
		if aWord in frequencies:
			frequencies[aWord] = frequencies[aWord] + 1
		else:
			frequencies[aWord] = 1
		
	max = 0
	word = ""
	
	for i in frequencies:
		if frequencies[i] > max:
			max = frequencies[i]
			word = i

	return {'frequent_word': word, "numberoftimes": max}

# @app.route('/views')
# def views():
# 	# view_counter = 0
# 	v = open('viewcounter.txt', 'w')
# 	view_increaser = request.args.get("addView")
# 	view_dict = {"view": view_increaser}
# 	number_of_views = json.dumps(view_dict)
# 	for view_increaser in number_of_views:
# 		+ 1
# 	view = b.write(number_of_views)
# 	b.close()
# 	return number_of_views
@app.route('/views')
def views():
	view_increaser = request.args.get("addView")
	view_dict = {"view": view_increaser}
	number_of_views = json.dumps(view_dict)
	for view_increaser in number_of_views:
		+ 1
	
	return number_of_views

# def longestwordforbook():
# 	b = open('hfinn11.txt', 'r')
# 	book = b.read()

# 	for i in range(len(items)):
# 		if len(items[i]) > len(longest):
# 			longest = items[i]
# 	return longest



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
