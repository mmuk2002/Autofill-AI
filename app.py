from flask import Flask, request, jsonify
import requests
import json
import urllib.parse

app = Flask(__name__)

# Define the API endpoint URL
url = 'http://127.0.0.1:3000/ask'

 # Function that generates AI responses based on the user context and given question
def generate_responses(context, question):
    # Define the prompts in the desired format
    prompts = [
        {"role": "user", "content": "Here's my context: {context}; assume my persona and write an autofill to the following question: {question}"}
    ]

    # Encode the prompts as URL parameters
    params = {
        'site': 'you',
        'prompt': urllib.parse.quote(json.dumps(prompts))
    }

    # Make the HTTP GET request
    response = requests.get(url, params=params)

    # Parse the response
    if response.status_code == 200:
        response_data = response.json()
        print(response_data)  # Print the response for debugging

        # Check the structure of the response and access the generated text
        if 'content' in response_data:
            generated_text = response_data['content']
            print(generated_text)
            return generated_text  # Return the generated text
        else:
            print('Error: Missing "content" key in the response.')
    else:
        print('Error:', response.status_code)


@app.route('/user_input', methods=['GET'])
def user_input():
    context = request.args.get('resume', '')  # Get the resume information from the query parameters
    generated_text = generate_responses("My name is Meraj, I have 3 years SWE experience", "Why should Apple hire you?")  # Call the function to generate responses

    return jsonify({'success': True, '': generated_text})

if __name__ == '__main__':
    app.run()
