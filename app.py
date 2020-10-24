from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__, static_folder = 'static', template_folder = 'templates')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
CORS(app)

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
	user_guess = request.args.get("user_textbox").upper()
	word_guesed = request.args.get("word_guessed").upper()
	position = []
	for i in range(len(word)):
		if user_guess == word[i]:
			position.append(i)
	if len(position) == 0:
		return "Try Again"
	return {'user_guess': user_guess, "word": word, "position": position}

@app.route('/check_attempt')
def check_attempt():
	letter = request.args.get('letter')
	position = int(request.args.get('index'))


	# right_letter_zero = ['H','a','l','o','w','e','n']
	# right_letter_one = ['C','o','m','p','u','t','e','r']
	# right_letter_two = ['P','y','t','h','o','n']
	# right_letter_three = ['W','e','b','s','i','t','e']
	# right_letters_all = [right_letter_one + right_letter_two + right_letter_zero]

	# position = []
	
	# for right_letter_zero in range(len(hangman_words)):
	# 	if hangman_words[''] == right_letter_zero:
	# 			position.append(right_letter_zero)
	# 	else:
	# 		return "Try Again"

	# for right_letter_one in range(len(hangman_words)):
	# 	if hangman_words[''] == right_letter_one:
	# 			position.append(right_letter_one)
	# 	else:
	# 		return "Try Again"

	# for right_letter_two in range(len(hangman_words)):
	# 	if hangman_words[''] == right_letter_two:
	# 		position.append(right_letter_two)
	# 	else:
	# 		return 'Try Again'

	# return {'right_letters_all': right_letters_all, 'position': position}


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
