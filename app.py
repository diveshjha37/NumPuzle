from flask import Flask, request, jsonify
import random

app = Flask(__name__)

# Define the range and target number
lower = 1
upper = 100
number_to_guess = random.randint(lower, upper)

@app.route('/guess', methods=['POST'])
def guess():
    data = request.get_json()
    guessed_number = data.get('guess')

    if not isinstance(guessed_number, int):
        return jsonify({"error": "Please send a valid number."}), 400

    if guessed_number < number_to_guess:
        return jsonify({"message": "Too low! Try again."}), 200
    elif guessed_number > number_to_guess:
        return jsonify({"message": "Too high! Try again."}), 200
    else:
        return jsonify({"message": f"Congratulations! You guessed the number!"}), 200

# To make sure Flask works properly in serverless environments
def handler(request):
    return app(request)

if __name__ == '__main__':
    app.run(debug=True)

