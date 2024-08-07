project/
├── __tests__/
│   ├── auth.test.js
├── index.js
├── routes/
│   └── auth.js
├── services/
│   └── emailService.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── .env
└── jest.config.js


-- Drop existing tables if they exist
DROP TABLE IF EXISTS child_documents;
DROP TABLE IF EXISTS child;
DROP TABLE IF EXISTS parent_guardian;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS account;

-- Create the account table with the confirm_password column
CREATE TABLE account (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    confirm_password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- Create users table 
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    otherName VARCHAR(255),
    contactAddress VARCHAR(255) NOT NULL,
    permanentAddress VARCHAR(255) NOT NULL,
    nationality VARCHAR(255) NOT NULL,
    stateOfOrigin VARCHAR(255) NOT NULL,
    lga VARCHAR(255) NOT NULL,
    province VARCHAR(255) NOT NULL,
    zipCode VARCHAR(20) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    retypeEmail VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    retypePassword VARCHAR(255) NOT NULL
);




-- Create parent_guardian table
CREATE TABLE parent_guardian (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(10),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    phone_number VARCHAR(20),
    relationship VARCHAR(255),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    postal_code VARCHAR(10),
    nationality VARCHAR(255),
    local_government_area VARCHAR(255),
    city VARCHAR(255),
    state_of_origin VARCHAR(255),
    employment_history VARCHAR(255),
    employer_name VARCHAR(255),
    legal_custody BOOLEAN,
    primary_contact BOOLEAN,
    responsible_for_fees BOOLEAN,
    emergency_contact BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create child table
CREATE TABLE child (
    id INT AUTO_INCREMENT PRIMARY KEY,
    parent_id INT NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    preferred_name VARCHAR(255),
    date_of_birth DATE,
    gender VARCHAR(10),
    native_language VARCHAR(255),
    second_language VARCHAR(255),
    first_nationality VARCHAR(255),
    second_nationality VARCHAR(255),
    country_of_birth VARCHAR(255),
    city_of_birth VARCHAR(255),
    ethnicity VARCHAR(255),
    religion VARCHAR(255),
    passport_id_number VARCHAR(255),
    preferred_enrolment_date DATE,
    need_i20 BOOLEAN,
    english_spoken VARCHAR(50),
    english_written VARCHAR(50),
    progress_concerns BOOLEAN,
    progress_concerns_details TEXT,
    additional_needs BOOLEAN,
    external_support BOOLEAN,
    external_support_details TEXT,
    medical_conditions BOOLEAN,
    medical_conditions_details TEXT,
    allergies BOOLEAN,
    allergies_details TEXT,
    attended_previous_school BOOLEAN,
    previous_school_name VARCHAR(255),
    previous_year_grade VARCHAR(255),
    attended_from DATE,
    attended_to DATE,
    previous_school_country VARCHAR(255),
    previous_school_city VARCHAR(255),
    previous_school_curriculum VARCHAR(255),
    previous_school_language VARCHAR(255),
    contact_previous_school VARCHAR(50),
    reason_for_leaving TEXT,
    expulsion_history BOOLEAN,
    expulsion_details TEXT,
    special_interest TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES parent_guardian(id)
);

-- Create child_documents table
CREATE TABLE child_documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    child_id INT NOT NULL,
    document_type VARCHAR(255),
    file_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (child_id) REFERENCES child(id)
);

-- contact form
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
