# Import necessary modules and packages
import MySQLdb

import app as app
from flask import Flask, render_template, request, redirect, url_for, session
import bcrypt
import re
from dotenv import load_dotenv
import os
import db_config  # Import the db_config module
from flask_mysqldb import MySQL

# Load environment variables from .env file
load_dotenv()

# Configure session secret key (replace 'your_secret_key_here' with a secure random string)
app.secret_key = os.urandom(24).hex()

# Create a Flask application instance with custom static file settings
app = Flask(__name__, static_url_path='/static', static_folder='static')

# Configure session secret key (replace 'your_secret_key_here' with a secure random string)
app.secret_key = os.urandom(24).hex()

# Initialize Flask-MySQLdb extension
mysql = MySQL(app)

# Use the database configuration directly from db_config
app.config['MYSQL_HOST'] = db_config.mysql_db_config['host']
app.config['MYSQL_USER'] = db_config.mysql_db_config['user']
app.config['MYSQL_PASSWORD'] = db_config.mysql_db_config['password']
app.config['MYSQL_DB'] = db_config.mysql_db_config['database']

#home page
@app.route('/')
def index():
    return render_template('index.html')

#about us page
@app.route('/about')
def about():
    return render_template('about.html')

#services us page
@app.route('/services')
def services():
    return render_template('services.html')

#contact us page
@app.route('/contact')
def contact():
    return render_template('contact.html')

#route for contact form
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
    
#Thank you page
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
@app.route('/login', methods =['GET', 'POST'])
def login():
	msg = ''
	if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
		username = request.form['username']
		password = request.form['password']
		cursor = db_config.mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute('SELECT * FROM account WHERE username = % s AND password = % s', (username, password, ))
		account = cursor.fetchone()
		if account:
			session['loggedin'] = True
			session['id'] = account['id']
			session['username'] = account['username']
			msg = 'Logged in successfully !'
			return render_template('application.html', msg = msg)
		else:
			msg = 'Incorrect username / password !'
	return render_template('login.html', msg = msg)

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
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'email' in request.form:
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
        
        try:
            # Validate email format using regular expression
            if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
                msg = 'Invalid email address!'
                
            elif not re.match(r'[A-Za-z0-9]+', username):
                msg = 'Username must contain only characters and numbers!'
            elif not username or not password or not email:
                msg = 'Please fill out the form!'
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
            # Print the exception message for debugging purposes
            print(e)
            
            # Roll back the changes in the database (if any)
            mysql.connection.rollback()
            msg = 'An error occurred while creating an account. Please try again.'

    elif request.method == 'POST':
        msg = 'Please fill out the form!'
    
    return render_template('account.html', msg=msg)

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
def register():
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



