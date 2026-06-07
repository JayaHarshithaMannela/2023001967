# Stage 1: REST API Design

## Notification Schema

```json
{
  "id": "uuid",
  "userId": "string",
  "type": "Placement | Event | Result",
  "title": "string",
  "message": "string",
  "priority": "High | Medium | Low",
  "isRead": false,
  "createdAt": "timestamp"
}
```
## API Endpoints
### 1. Create Notification
`POST /api/notifications`
Request:
```json
{
  "userId": "student123",
  "type": "Placement",
  "title": "Placement Drive",
  "message": "CSX Corporation is hiring"
}
```
Response:
```json
{
  "success": true,
  "notificationId": "uuid"
}
```
### 2. Get All Notifications
`GET /api/notifications`
Response:
```json
{
  "notifications": [
    {
      "id": "uuid",
      "title": "Placement Drive",
      "type": "Placement"
    }
  ]
}
```
### 3. Get Notification By ID
`GET /api/notifications/{id}`
Response:
```json
{
  "id": "uuid",
  "title": "Placement Drive",
  "message": "CSX Corporation is hiring",
  "isRead": false
}
```
### 4. Mark Notification As Read
`PATCH /api/notifications/{id}/read`
Response:
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```
### 5. Delete Notification
`DELETE /api/notifications/{id}`
Response:
```json
{
  "success": true,
  "message": "Notification deleted"
}
```
## Authentication
```text
Authorization: Bearer <token>
```
## Real-Time Notifications
WebSocket will be used to push notifications instantly to connected users without refreshing the page.
```text
ws://server/notifications
```
