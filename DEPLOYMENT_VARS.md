# Deployment Environment Variables

This document lists all environment variables required to run the application in a production environment.

---

## Required Variables

### 1. DATABASE_URL

* **Description:**
  MongoDB connection string used to connect to the production database.

* **Example:**

  ```
  mongodb+srv://prod-admin:<password>@cluster0.xxxxx.mongodb.net/creator-platform-prod
  ```

* **Details:**

  * `prod-admin` → database username
  * `<password>` → replace with actual database user password
  * `cluster0.xxxxx.mongodb.net` → your MongoDB Atlas cluster URL
  * `creator-platform-prod` → production database name

---

## Security Notes

* ❌ Do NOT commit actual credentials to GitHub
* ❌ Do NOT expose `.env.production` file publicly
* ✅ Always store sensitive values in environment variables
* ✅ Use your deployment platform’s secret manager:

  * Render
  * Railway

---

## Usage

In your production environment, set:

```
DATABASE_URL=your_actual_connection_string
```

---

## Additional Notes

* Ensure the database user has the correct permissions
* Ensure MongoDB Atlas Network Access allows your deployment platform
* Restart the server after updating environment variables
