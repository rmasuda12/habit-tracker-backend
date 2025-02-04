# 📅 Back End for [Social Habit Tracker](https://github.com/rmasuda12/habit-tracker-frontend)

Contains files for the migrating/seeding the database and handling backend logic.

### Database Structure
[Database Visualization](database_diagram.png)

## 📦 Installation & Setup

#### Clone the Repository
```bash
git clone https://github.com/rmasuda12/habit-tracker-backend.git
cd habit-tracker-backend
```
#### Download Dependencies
```bash
npm install
```

#### Migrate and Seed Database
Open mysql interface
```bash
mysql -u root -p
```
Create new database
```sql
CREATE DATABASE habit_tracker;
exit;
```
Run migration and seed files in that order
```bash
npm run migrate
npm run seed
```
#### Set Up Environment Variables
create .env file in the root directory, using .env.sample as reference

```env
PORT=8080
DB_HOST=database_host
DB_NAME=database_name
DB_USER=user
DB_PASSWORD=password
```

#### Start app
```bash
npm start
```

## 📶 Endpoints

### Users

**GET /users/**
- Retrieve all users<br>

    Response:
    ```
    [
        {"id":1,"email":"alice@example.com","password": password , "name":"Alice", "profile_picture": http://localhost:8080/joe-doe.png},
        {"id":1,"email":"bob@example.com","password": password , "name":"Bob", "profile_picture": http://localhost:8080/joe-doe.png},
        ...
    ]

    ```

**GET /users/:id**
- Retrieve user's profile with specific id<br>

    Response:
    ```
    {
        "id":1,
        "email":"alice@example.com",
        "name":"Alice",
        "profile_picture": http://localhost:8080/joe-doe.png
    }
    ```

### Friends
**GET /friends/:user_id**
- get the list of friends for a particular user and their information<br>

    Response: 
    ```
    [
        {
            "user_id": 1,
            "user_name": "Alice", 
            "user_profile": http://localhost:8080/joe-doe.png,
            "friend_id": 2,
            "name": "Alex",
            "user_completion": 87.4,
            "friend_completion": 75      
        },
        {
            "user_id": 1,
            "user_name": "Alice", 
            "user_profile": http://localhost:8080/joe-doe.png,
            "friend_id": 3,
            "name": "Mike",
            "user_completion": 87.4,
            "friend_completion": 75      
        }
    ]
    ```

### Habits
**GET /habits/:user_id**
- fetch all habits for a user<br>

    Response:
    ```
    [
        {   
            "user_id": 1,
            "id": 2,
            "habit_name": "swimming",
            "completed_on": [
                '2025-01-01',
                '2025-01-02',
                '2025-01-03'
            ]
        }, 
        {   
            "user_id": 1,
            "id": 4,
            "habit_name": "drinking water",
            "completed_on": [
                '2025-01-01',
                '2025-01-02',
                '2025-01-03'
            ]
        }
    ]
    ```

**POST /habits/:user_id**
- create a habit for particular user<br>

    Request:  
    ```
    {
        "habit_name": "swimming",
        "user_id": 1
    }
    ```
    Response:
    ```
    'New habit successfully created'
    ```

**PUT /habits/:user_id/**
- update habits for user <br>

    Request:  
    ```
    {
        "id": 1,
        "habit_name": "Swimming 2.0"
    }
    ```

    Response:
    ```
    'Habit successfully updated'
    ```
**PUT /habits/:user_id/:habit_id**
- update habit completion details <br>

    Request: 
    ```
    [
        {
            "id": 2,
            "completion_dates": [
                '2025-01-01',
                '2025-01-02',
                '2025-01-03'
            ],
            "user_id": 1
        },
        {
            "id": 4,
            "completion_dates": [
                '2025-01-01',
                '2025-01-02',
                '2025-01-03'
            ],
            "user_id": 1
        }
    ]
    ```

    Response:
    ```
    "habit completion updated"
    ```
**DELETE /habits/:user_id/:habit_id** 
- delete a habit for user

    Response:
    ```
    'Habit with id:1 has been successfully deleted'
    ```

---
### Future Implementations
- login and authentication
- More detailed view of habit stats
- Leaderboards/competition with friends
- social features: sending friend requests to other users

## License
This project is licensed under the MIT License

## Contact
For questions, reach out via: 
Email: masudarinta@gmail.com