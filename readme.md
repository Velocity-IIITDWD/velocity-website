# Velocity Website Admin Panel Backend

A brief description of api endpoints of the admin panel

## Appendix

Auth middleware and image upload will be added after writing all the endpoints

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URI`

## Deployment

To test this project, run

```bash
  npm run start:dev
```

# API Reference

## Events

#### Get all events

```http
  GET /events
```

#### Get an event

```http
  GET /events/${id}
```

| Parameter | Type     | Description  | Validation         |
| :-------- | :------- | :----------- | :----------------- |
| `id`      | `string` | **required** | valid mongodb \_id |

#### Add a new event

```http
  POST /events/new
```

| Body Parameter | Type               | Description  | Validation                                 |
| :------------- | :----------------- | :----------- | :----------------------------------------- |
| `title`        | `string`           | **required** | ascii only, minLength: 5, maxLength: 100   |
| `description`  | `string`           | **required** | ascii only, minLength: 10, maxLength: 1000 |
| `eventDate`    | `date`             | **required** | date must be in ISO 8601 format            |
| `poster`       | `url`              | Optional     | image url                                  |
| `images`       | `array`            | Optional     | array of urls                              |
| `winners`      | `[Schema:Student]` | Optional     | array of objs contains winner details      |

#### Update an event

```http
  PUT /events/${eventId}
```

same body ref for creating a new event.

#### Delete an event

```http
  DELETE /events/${eventId}
```

| Parameter | Type     | Description  | Validation         |
| :-------- | :------- | :----------- | :----------------- |
| `id`      | `string` | **required** | valid mongodb \_id |

## Students

#### Get all students :pagination supported

```http
  GET /students
```

| Query Parameter | Type     | Description | Validation         |
| :-------------- | :------- | :---------- | :----------------- |
| `page`          | `number` | Optional    | default value is 1 |

#### Get a single student details

```http
  GET /students/${registrationNumber}
```

| Parameter            | Type           | Description  | Validation                |
| :------------------- | :------------- | :----------- | :------------------------ |
| `registrationNumber` | `alphanumeric` | **required** | valid registration number |

#### Add a student

```http
  POST /students/add
```

| Body Parameter       | Type     | Description  | Validation                               |
| :------------------- | :------- | :----------- | :--------------------------------------- |
| `name`               | `string` | **required** | alphabetic, minLength: 3, maxLength: 30  |
| `registrationNumber` | `string` | **required** | alphanumeric, minLength: 6, maxLength: 9 |
| `password`           | `string` | **required** | minLength: 6, maxLength: 30              |

#### Update student details

```http
  PUT /students/${registrationNumber}
```

| Body Parameter | Type     | Description  | Validation        |
| :------------- | :------- | :----------- | :---------------- |
| `name`         | `string` | **required** | `same validation` |
| `password`     | `string` | Optional     | `same validation` |

#### Delete a student details

```http
  DELETE /students/${registrationNumber}
```

| Parameter            | Type     | Description   | Validation                |
| :------------------- | :------- | :------------ | :------------------------ |
| `registrationNumber` | `string` | **required**. | valid registration number |

## Running Tests

To run tests, run the following command

Note: Test functions have not been added yet!

```bash
  npm run test
```
