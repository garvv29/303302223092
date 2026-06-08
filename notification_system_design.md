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
            "count": 2,
            "notifications": [
             {
                "ID": "abcd1234",
                "Type": "Placement",
                "Title": "Google is Hiring",
                "Message": "Google is looking for Software Engineers with 2+ years of experience",
                "isRead": false,
                Timestamp: "2026-08-06 00:00:00",
             },
             {
                "ID": "efgh5678",
                "Type": "Result",
                "Title": "6th Semester Results",
                "Message": "6th Semester Results are out",
                "isRead": true,
                Timestamp: "2026-10-06 10:00:00",
             },
             {
                "ID": "ijkl9123",
                "Type": "Event",
                "Title": "Freshers Party",
                "Message": "Freshers Party on 10th June",
                "isRead": false,
                Timestamp: "2026-08-06 10:00:00",
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
                    "ID": "abcd1234",
                    "Type": "Placement",
                    "Title": "Google is Hiring",
                    "Message": "Google is looking for Software Engineers with 2+ years of experience",
                    "isRead": false,
                    Timestamp: "2026-08-06 00:00:00",
                },
                {
                    "ID": "ijkl9123",
                    "Type": "Event",
                    "Title": "Freshers Party",
                    "Message": "Freshers Party on 10th June",
                    "isRead": false,
                    Timestamp: "2026-08-06 10:00:00",
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
        Request - 
        {
        }
        Response -
        {
            "success":true,
            "message":"Notification marked as read"
        }

4. Mark all notifications as Read -
        Endpoint - PATCH /api/notifications/read
        Header - 
        { 
            Authorization: Bearer <token>,
            Content-Type: application/json
        }
        Request - 
        {
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
            "Type": "Placement",
            "Title": "Microsoft is Hiring",
            "Message": "Microsoft is looking for Software Engineers with 3+ years of experience"
        }
        Response -
        {
            "success":true,
            "data": {
                "ID": "456" ,
                "Type": "Placement",
                "Title": "Microsoft is Hiring",
                "Message": "Microsoft is looking for Software Engineers with 3+ years of experience",
                "isRead": false,
                Timestamp: "2026-08-06 12:00:00",
            }
        }

6. Delete notification -
        Endpoint - DELETE /api/notifications/:id
        Header - 
        { 
            Authorization: Bearer <token>,
            Content-Type: application/json
        }
        Request - 
        {
        }
        Response -
        {
            "success":true,
            "message":"Notification deleted"
        }

Notification Json Schema - 
{
    "ID": "string",
    "userId": "string",
    "Type": "Placement | Event | Result",
    "Title": "string",
    "Message": "string",
    "isRead": false,
    Timestamp: "2026-08-06 00:00:00",
}