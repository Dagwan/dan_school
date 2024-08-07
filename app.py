# Import necessary modules and packages
import MySQLdb
from flask import Flask, render_template, request, redirect, url_for, session
from flask_mail import Mail, Message
import bcrypt
import secrets
import re
from dotenv import load_dotenv  # Import load_dotenv here
import os
from flask_mysqldb import MySQL
import logging
from db_config import create_db_connection  # Import the create_db_connection function from db_config

# Access environment variables using os.environ
GOOGLE_MAPS_API_KEY = os.getenv('GOOGLE_MAPS_API_KEY')

# Load environment variables from .env file
load_dotenv()
# Create a Flask application instance with custom static file settings
app = Flask(__name__, static_url_path='/static', static_folder='static')

# Configure session secret key (replace 'your_secret_key_here' with a secure random string)
app.secret_key = os.urandom(24).hex()

# Configure Flask-Mail for email sending
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Gmail SMTP server
app.config['MAIL_PORT'] = 587  # Port for TLS
app.config['MAIL_USERNAME'] = 'dagwanpan@gmail.com'  # Your Gmail email address
app.config['MAIL_PASSWORD'] = 'dagwapan0810'  # Your Gmail password
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

mail = Mail(app)

# Define a global variable for the database connection
db = None

# Home page
@app.route('/')
def index():
    return render_template('index.html')

# About us page
@app.route('/about')
def about():
    google_maps_api_key = os.getenv('GOOGLE_MAPS_API_KEY')
    return render_template('about.html', google_maps_api_key=google_maps_api_key)

# Services page
@app.route('/services')
def services():
    google_maps_api_key = os.getenv('GOOGLE_MAPS_API_KEY')
    return render_template('services.html', google_maps_api_key=google_maps_api_key)

# Contact us page
@app.route('/contact')
def contact():
    google_maps_api_key = os.getenv('GOOGLE_MAPS_API_KEY')
    return render_template('contact.html', google_maps_api_key=google_maps_api_key)

# Route for contact form
@app.route('/auth/contact', methods=['POST'])
def submit_form():
    name = request.form.get("name")
    email = request.form.get("email")
    message = request.form.get("message")

    try:
        cursor = db.cursor()
        # Insert data into MySQL
        query = "INSERT INTO contact_messages (name, email, message) VALUES (%s, %s, %s)"
        values = (name, email, message)
        cursor.execute(query, values)

        db.commit()
        cursor.close()
        return render_template('thankYouMessage.html')
    except Exception as e:
        print(e)
        db.rollback()
        return redirect(url_for('error'))

# Thank you page
@app.route('/thankYouMessage')
def thankYouMessage():
    return render_template('thankYouMessage.html')


#outstanding_experience page
@app.route('/outstanding_experience')
def outstanding_experience():
    return render_template('outstanding_experience.html')

#admissions page
@app.route('/admissions')
def admissions():
    return render_template('admissions.html')

#login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    msg = ''
    if request.method == 'POST':
        username = request.form.get('username')  # Use 'username' instead of 'email'
        password = request.form.get('password')

        if not username or not password:
            msg = 'Please provide both username and password.'
        else:
            cursor = mysql.connection.cursor(cursorclass=MySQLdb.cursors.DictCursor)  # Use DictCursor to get results as dictionaries
            cursor.execute('SELECT * FROM account WHERE username = %s', (username,))
            account = cursor.fetchone()
            cursor.close()

            if account and bcrypt.checkpw(password.encode('utf-8'), account['password'].encode('utf-8')):
                session['loggedin'] = True
                session['id'] = account['id']
                session['username'] = account['username']
                msg = 'Logged in successfully!'
                return render_template('application.html', msg=msg)
            else:
                msg = 'Incorrect username or password.'

    return render_template('login.html', msg=msg)


@app.route('/logout')
def logout():
    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('username', None)
    return redirect(url_for('login'))

# Define the route for the account registration
@app.route('/account', methods=['GET', 'POST'])
def account():
    msg = ''
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        confirm_password = request.form['confirmPassword']  # Get the confirm_password field
        email = request.form['email']

        try:
            if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
                msg = 'Invalid email address!'
            elif not re.match(r'[A-Za-z0-9]+', username):
                msg = 'Username must contain only characters and numbers!'
            elif not username or not password or not email:
                msg = 'Please fill out the form!'
            elif password != confirm_password:
                msg = 'Passwords do not match!'
            else:
                # Hash password using bcrypt
                salt = bcrypt.gensalt(10)
                hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)

                # Create a database cursor using the established connection
                cursor = mysql.connection.cursor()

                # Insert data into the 'account' table in the MySQL database, including 'created_at'
                query = "INSERT INTO account (username, password, email, created_at) VALUES (%s, %s, %s, CURRENT_TIMESTAMP)"
                values = (username, hashed_password, email)
                cursor.execute(query, values)

                # Commit the changes made to the database
                mysql.connection.commit()

                # Close the cursor to release resources
                cursor.close()

                msg = 'You have successfully registered!'
                return render_template('thankcreatecount.html')
        except Exception as e:
            # Log the exception for debugging purposes
            logging.error(f'Error during registration: {e}')

            # Roll back the changes in the database (if any)
            mysql.connection.rollback()
            msg = 'An error occurred while creating an account. Please try again.'

    return render_template('account.html', msg=msg)

# Route for handling the "Forgot Password?" form submission
@app.route('/forgot_password', methods=['POST'])
def forgot_password():
    try:
        # Get the email address from the form
        email = request.form.get('email')

        # Generate a reset token (you can use a library like itsdangerous)
        reset_token = generate_reset_token()

        # Send an email with the reset link
        send_reset_email_to_user(email, reset_token)

        # Update the user's record in the database to store the reset token
        update_reset_token_in_database(email, reset_token)

        return 'Password reset email sent successfully!'
    except Exception as e:
        return str(e)

# Route for sending the reset email
@app.route('/send_reset_email', methods=['POST'])
def send_reset_email():
    try:
        # Get the email address from the form (you may need to adjust the field name)
        email = request.form.get('email')

        # Generate a reset token (you can use a library like itsdangerous)
        reset_token = generate_reset_token()

        # Send an email with the reset link
        send_reset_email_to_user(email, reset_token)

        # Return a JSON response indicating success
        return jsonify(success=True)
    except Exception as e:
        # Return a JSON response indicating failure with an error message
        return jsonify(success=False, error=str(e))

# Function to send an email with the reset link
def send_reset_email_to_user(email, reset_token):
    try:
        # Create a message object
        message = Message('Password Reset', sender='dagwanpan@gmail.com', recipients=[email])

        # Customize the email content with the reset token
        message.subject = 'Password Reset Request'
        message.sender = 'dagwanpan@gmail.com'
        message.recipients = [email]

        # Create the email body with HTML content
        message.html = f'''
        <html>
        <body>
            <p>Hello,</p>
            <p>We received a request to reset your password. Click the link below to reset your password:</p>
            <p><a href="http://danschool.com/reset_password?token={reset_token}">Reset Password</a></p>
            <p>If you didn't request a password reset, please ignore this email.</p>
            <p>Best regards,</p>
            <p>Dan School Team</p>
        </body>
        </html>
        '''

        # Send the email
        mail.send(message)
    except Exception as e:
        print(e)

# Function to generate a secure reset token 
def generate_reset_token():
    return secrets.token_urlsafe(32)  # Example token generation

# Function to update the reset token in the database
def update_reset_token_in_database(email, reset_token):
    try:
        # Create a cursor
        cursor = mysql.cursor()

        # Update the user's record in the 'account' table with the new reset_token
        update_query = "UPDATE account SET reset_token = %s WHERE email = %s"
        cursor.execute(update_query, (reset_token, email))

        # Commit the changes to the database
        mysql.commit()

        # Close the cursor
        cursor.close()
    except Exception as e:
        print(e)

#studentportal page
@app.route('/studentportal')
def studentportal():
    return render_template('studentportal.html')

#events page
@app.route('/events')
def events():
    return render_template('events.html')

#early school page
@app.route('/early')
def early():
    return render_template('early.html')

#primary school page
@app.route('/primary')
def primary():
    return render_template('primary.html')

#lowersecondary school page
@app.route('/lowersecondary')
def lowersecondary():
    return render_template('lowersecondary.html')

#accademicexcellence school page
@app.route('/accademicexcellence')
def accademicexcellence():
    return render_template('accademicexcellence.html')

#principal welcome message school page
@app.route('/principal_welcome_message')
def principal_welcome_message():
    return render_template('principal_welcome_message.html')

#academicsuccess page
@app.route('/academicsuccess')
def academicsuccess():
    return render_template('academicsuccess.html')

#best_universities page
@app.route('/best_universities')
def best_universities():
    return render_template('best_universities.html')

#trip page
@app.route('/trip')
def trip():
    return render_template('trip.html')

#studentsupport page
@app.route('/studentsupport')
def studentsupport():
    return render_template('studentsupport.html')

#dnpschallenge page
@app.route('/dnschallenge')
def dnpschallenge():
    return render_template('dnpschallenge.html')

#application_requirments page
@app.route('/application_requirments')
def application_requirments():
    return render_template('application_requirments.html')

#application page
@app.route('/application')
def application():
    return render_template('application.html')

#tuition_fees page
@app.route('/tuition_fees')
def tuition_fees():
    return render_template('tuition_fees.html')

#one_school page
@app.route('/one_school')
def one_school():
    return render_template('one_school.html')

#our_social page
@app.route('/our_social')
def our_social():
    return render_template('our_social.html')

#collaboration page
@app.route('/collaboration')
def collaboration():
    return render_template('collaboration.html')


@app.route('/schoo_calendar_dnps')
def schoo_calendar_dnps():
    return render_template('schoo_calendar_dnps.pdf')
@app.route('/add_to_calendar')
def add_to_calendar():
    return render_template('add_to_calendar.ics')

#more_faq page
@app.route('/more_faq')
def more_faq():
    return render_template('more_faq.html')

#meal-services page
@app.route('/meal_services')
def meal_services():
    return render_template('meal_services.html')

#online_payment page
@app.route('/online_payment')
def online_payment():
    return render_template('online_payment.html')

#teacher_nomination page
@app.route('/teacher_nomination')
def teacher_nomination():
    return render_template('teacher_nomination.html')

#enquiry page
@app.route('/enquiry')
def enquiry():
    return render_template('enquiry.html')

#homework page
@app.route('/homework')
def homework():
    return render_template('homework.html')

#housesystem page
@app.route('/housesystem')
def housesystem():
    return render_template('housesystem.html')

#modeltrip page
@app.route('/modeltrip')
def modeltrip():
    return render_template('modeltrip.html')

#aearly page
@app.route('/aearly')
def aearly():
    return render_template('aearly.html')

#ibprogram page
@app.route('/ibprogram')
def ibprogram():
    return render_template('ibprogram.html')

#uppersecondary page
@app.route('/uppersecondary')
def uppersecondary():
    return render_template('uppersecondary.html')

#curriculumguide page
@app.route('/curriculumguide')
def curriculumguide():
    return render_template('curriculumguide.html')

#languages page
@app.route('/languages')
def languages():
    return render_template('languages.html')

#create-account page
@app.route('/create_accoun')
def create_account():
    return render_template('create_account.html')

#thankcreatecount
@app.route('/thankcreatecount')
def thankcreatecount():
    return render_template('thankcreatecount.html')

# Define a route for account registration
@app.route('/auth/register', methods=['POST'])
def register(db=None):
    # Get form data
    firstName = request.form['firstName']
    lastName = request.form['lastName']
    otherName = request.form['otherName']
    contactAddress = request.form['contactAddress']
    permanentAddress = request.form['permanenttAddress']
    nationality = request.form['nationality']
    stateOfOrigin = request.form['state']
    lga = request.form['lga']
    province = request.form['kubwa']
    zipCode = request.form['zipCode']
    phoneNumber = request.form['phone']
    email = request.form['email']
    retypeEmail = request.form['retypeEmail']
    password = request.form['password']
    retypePassword = request.form['retypePassword']

    try:
        # Validate email format using regular expression
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return "Invalid email format"

        # Validate password complexity
        if len(password) < 8 or not re.search("[a-z]", password) or not re.search("[A-Z]", password) or not re.search("[0-9]", password):
            return "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit"

        # Enforce maximum password length
        if len(password) > 64:
            return "Password is too long"

        # Hash password using bcrypt
        salt = bcrypt.gensalt(10)
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)

        # Create a database cursor using the established connection
        cursor = db.cursor()

        # Insert data into the 'users' table in the MySQL database
        query = "INSERT INTO users (firstName, lastName, otherName, contactAddress, permanentAddress, nationality, stateOfOrigin, lga, province, zipCode, phoneNumber, email, retypeEmail, password, retypePassword) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        values = (firstName, lastName, otherName, contactAddress, permanentAddress, nationality, stateOfOrigin, lga, province, zipCode, phoneNumber, email, retypeEmail, hashed_password, retypePassword)
        cursor.execute(query, values)

        # Commit the changes made to the database
        db.commit()

        # Close the cursor to release resources
        cursor.close()

        # Return a rendered template for successful account creation
        return render_template('thankcreatecount.html')
    
    # If an exception occurs, handle it using the following code
    except Exception as e:
        # Print the exception message for debugging purposes
        print(e)
        
        # Roll back the changes in the database (if any)
        db.rollback()

# Define a route to handle successful account creation
@app.route('/success')
def success():
    return "Account created successfully!"

# Define a route to handle account creation errors
@app.route('/error')
def error():
    return "An error occurred while creating an account. Please try again."

# Check if the script is being run directly and not imported as a module
if __name__ == '__main__':
    # Start the Flask development server with debug mode enabled
    app.run(debug=True)



