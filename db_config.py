import os
import mysql.connector
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# MySQL Configuration
mysql_db_config = {
    "host": os.getenv("DB_HOST"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME"),
}

# Create a database connection function
def create_db_connection():
    return mysql.connector.connect(**mysql_db_config)
