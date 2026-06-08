Stage 1 

Notification System Design - 

    1.Fetch all notifications
    2.Fetch unread notifications
    3.Mark a notification as Read
    4.Mark all notifications as Read
    5.Create notification
    6.Delete notification
    7.Recieve realtime notifications

RestApi Endpoints - 

BaseUrl - /api/notifications
    
1. Fetch all notifications - 
        Endpoint - GET /api/notifications
        Header - 
        { 
            Authorization: Bearer <token>,
            Content-Type: application/json
        }
        Response -
        {
            "success": true,
            "count": 3,
            "notifications": [
             {
                "id": "abcd1234",
                "type": "Placement",
                "title": "Google is Hiring",
                "message": "Google is looking for Software Engineers with 2+ years of experience",
                "isRead": false,
                "timestamp": "2026-08-06 00:00:00",
             },
             {
                "id": "efgh5678",
                "type": "Result",
                "title": "6th Semester Results",
                "message": "6th Semester Results are out",
                "isRead": true,
                "timestamp": "2026-10-06 10:00:00",
             },
             {
                "id": "ijkl9123",
                "type": "Event",
                "title": "Freshers Party",
                "message": "Freshers Party on 10th June",
                "isRead": false,
                "timestamp": "2026-08-06 10:00:00",
             }
            ]
        } 

2. Fetch unread notifications -
        Endpoint - GET /api/notifications/unread
        Header - 
        { 
            Authorization: Bearer <token>,
            Content-Type: application/json
        }
        Response -
        {
            "success": true,
            "count": 2,
            "notifications": [
                {
                    "id": "abcd1234",
                    "type": "Placement",
                    "title": "Google is Hiring",
                    "message": "Google is looking for Software Engineers with 2+ years of experience",
                    "isRead": false,
                    "timestamp": "2026-08-06 00:00:00",
                },
                {
                    "id": "ijkl9123",
                    "type": "Event",
                    "title": "Freshers Party",
                    "message": "Freshers Party on 10th June",
                    "isRead": false,
                    "timestamp": "2026-08-06 10:00:00",
                }
            ]
        }

3. Mark a notification as Read -
        Endpoint - PATCH /api/notifications/:id/read
        Header - 
        { 
            Authorization: Bearer <token>,
            Content-Type: application/json
        }
        Response -
        {
            "success":true,
            "message":"Notification marked as read"
        }

4. Mark all notifications as Read -
        Endpoint - PATCH /api/notifications/read-all
        Header - 
        { 
            Authorization: Bearer <token>,
            Content-Type: application/json
        }
        Response -
        {
            "success":true,
            "message":"All notifications are marked as read"
        }

5. Create notification -
        Endpoint - POST /api/notifications
        Header - 
        { 
            Authorization: Bearer <token>,
            Content-Type: application/json
        }
        Request - 
        {
            "userId": "456",
            "type": "Placement",
            "title": "Microsoft is Hiring",
            "message": "Microsoft is looking for Software Engineers with 3+ years of experience"
        }
        Response -
        {
            "success":true,
            "data": {
                "id": "mnop4567" ,
                "type": "Placement",
                "title": "Microsoft is Hiring",
                "message": "Microsoft is looking for Software Engineers with 3+ years of experience",
                "isRead": false,
                "timestamp": "2026-08-06 12:00:00",
            }
        }

6. Delete notification -
        Endpoint - DELETE /api/notifications/:id
        Header - 
        { 
            Authorization: Bearer <token>,
            Content-Type: application/json
        }
        Response -
        {
            "success":true,
            "message":"Notification deleted"
        }

Notification Json Schema - 
{
    "id": "string",
    "userId": "string",
    "type": "Placement | Event | Result",
    "title": "string",
    "message": "string",
    "isRead": false,
    "timestamp": "2026-08-06 00:00:00",
}

7. Receive Real-Time Notifications

Technology-
Socket.IO (websockets)

Event Name - notification

Description -
Whenever a new notification is created the server sends a
notification event to the user.The client receives
the notification instantly without refreshing the page.

Sample Notification Event -
{
    "id": "mnop4567",
    "type": "Placement",
    "title": "Microsoft is Hiring",
    "message": "Microsoft is looking for Software Engineers with 3+ years of experience",
    "isRead": false,
    "timestamp": "2026-08-06 12:00:00"
}



Stage 2

Database Choice - we could use PostgreSQL(SQL Database)
Reason - 1.structured data with fixed fields
         2.support for indexing to improve query performance
         3.reliable and widely used 
         4.suitable for handling large number of notifications

Database Schema - 
1.User Table - 
CREATE TABLE Users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

2.Notifications Table -
CREATE TABLE Notifications (
    id VARCHAR(50) PRIMARY KEY,
    userId VARCHAR(50),
    type VARCHAR(50),
    title VARCHAR(255),
    message TEXT,
    isRead BOOLEAN DEFAULT FALSE,
    timestamp TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id)
);

Queries for Above Mentioned Restful APIs-
1. Fetch all notifications -
SELECT * FROM Notifications WHERE userId = '456' ORDER BY timestamp DESC; 

2. Fetch unread notifications -
SELECT * FROM Notifications WHERE userId = '456' AND isRead=false ORDER BY timestamp DESC;

3. Mark a notification as Read -
UPDATE Notifications SET isRead=true WHERE id='abcd1234';

4. Mark all notifications as Read -
UPDATE Notifications SET isRead=true WHERE userId='456';

5. Create notification -
INSERT INTO Notifications (id, userId, type, title, message, isRead, timestamp)
VALUES (
    'mnop4567',
    '456',
    'Placement',
    'Microsoft is Hiring',
    'Microsoft is looking for Software Engineers with 3+ years of experience',
    false,
    '2026-08-06 12:00:00'
);

6. Delete notification - 
DELETE FROM Notifications WHERE id='abcd1234';

Problems when data volume increases - 
1.slow queries due to large number of notifications
solution - indexing on frequently searched columns

2.high realtime connections 
solution - use redis , scale application across multiple servers 

3.large table size 
solution - archiving old notifications to a separate table or database



Stage 3 
