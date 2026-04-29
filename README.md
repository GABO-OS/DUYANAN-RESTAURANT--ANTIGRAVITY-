## Database Setup (XAMPP)

To run the backend locally, you need to set up a MySQL database. We recommend using XAMPP.

1. **Download and Install XAMPP**: 
   - Download XAMPP from [apachefriends.org](https://www.apachefriends.org/index.html) and install it on your system.
2. **Start MySQL Module**: 
   - Open the XAMPP Control Panel.
   - Click the "Start" button next to the **MySQL** module.
3. **Open phpMyAdmin**: 
   - Once MySQL is running, click the "Admin" button next to it, or navigate to `http://localhost/phpmyadmin` in your web browser.
4. **Create the Database**: 
   - In phpMyAdmin, click on "New" in the left sidebar to create a new database.
   - Enter `duyanan_db` as the database name.
   - Click the "Create" button.
5. **Run the Backend**: 
   - The Spring Boot backend uses `spring.jpa.hibernate.ddl-auto=update`, which means it will automatically create all the necessary tables for you when you run the application. No manual SQL scripts are required!
