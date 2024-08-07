import sys
import os
import unittest

# Add the directory containing app.py to the Python path
current_directory = os.path.dirname(os.path.abspath(__file__))
app_directory = os.path.join(current_directory, '..')
sys.path.append(app_directory)

from app import app  # Import your Flask app instance

class TestRegistration(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_successful_registration(self):
        test_data = {
            'firstName': 'John',
            'lastName': 'Doe',
            'otherName': 'Other',
            'contactAddress': '123 Main St',
            'permanenttAddress': '456 Elm St',
            'nationality': 'Country',
            'state': 'State',
            'lga': 'LGA',
            'kubwa': 'Province',
            'zipCode': '12345',
            'phone': '1234567890',
            'email': 'test@example.com',
            'retypeEmail': 'test@example.com',
            'password': 'Test1234',
            'retypePassword': 'Test1234'
        }

        response = self.app.post('/auth/register', data=test_data, follow_redirects=True)
        self.assertEqual(response.status_code, 200)  # Check if the response status code is as expected
        self.assertEqual(response.data.decode('utf-8'), "Account created successfully")  # Check response message

    def test_invalid_registration(self):
        test_data = {
            'firstName': 'Invalid',
            'lastName': 'User',
            'otherName': 'Other',
            'contactAddress': '123 Main St',
            'permanenttAddress': '456 Elm St',
            'nationality': 'Country',
            'state': 'State',
            'lga': 'LGA',
            'kubwa': 'Province',
            'zipCode': '12345',
            'phone': '1234567890',
            'email': 'invalid_email',
            'retypeEmail': 'invalid_email',
            'password': 'WeakPw',
            'retypePassword': 'WeakPw'
        }


        response = self.app.post('/auth/register', data=test_data, follow_redirects=True)
        self.assertEqual(response.status_code, 500)  # Check if the response status code is as expected
        self.assertIn("An error occurred while creating an account. Please try again.", response.data.decode('utf-8'))  # Check response message

if __name__ == '__main__':
    unittest.main()

import sys
import os
import unittest

# Add the directory containing app.py to the Python path
current_directory = os.path.dirname(os.path.abspath(__file__))
app_directory = os.path.join(current_directory, '..')
sys.path.append(app_directory)

from app import app  # Import your Flask app instance

class TestRoutes(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_submit_form(self):
        test_data = {
            'name': 'John Doe',
            'email': 'test@example.com',
            'message': 'Test message'
        }

        response = self.app.post('/auth/contact', data=test_data, follow_redirects=True)
        self.assertEqual(response.status_code, 200)  # Check if the response status code is as expected

if __name__ == '__main__':
    unittest.main()

