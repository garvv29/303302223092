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