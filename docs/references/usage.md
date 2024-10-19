# **API Usage Overview**

This document outlines the **User, Admin, and Office APIs** to facilitate menu, order, billing, payment, and stock management processes. The overview ensures clarity on each API's purpose and usage.

---

## **User API**

1. **Menu Operations:**
   - **`GET /api/v1/menu?category=string`**  
     Retrieves a list of menu items filtered by category.
   - **`GET /api/v1/menu/:id`**  
     Retrieves details of a specific menu item by ID.

2. **Cart Operations:**
   - **`POST /api/v1/cart/bill`**  
     **Returns** the total price of the cart based on selected items; does **not create** a bill.
   - **`POST /api/v1/cart/checkout`**  
     **Creates an order** and queues it in the order list.

3. **Order Operations:**
   - **`GET /api/v1/myorder`**  
     Retrieves the list of the user’s orders.
   - **`GET /api/v1/myorder/:id`**  
     Retrieves the details and bill of a specific order.
   - **`PATCH /api/v1/myorder/:id`**  
     Modifies the order **only if it was rejected**.

4. **User Bill Operations:**
   - **`POST /api/v1/myorder/bill`**  
     Returns the **total bill amount** from all the user's created orders; does **not create** a new bill.

---

## **Admin API**

### **Order Management:**
- **`GET /api/v1/admin/order`**  
  Retrieves a list of orders in both the **order queue** and **accepted queue**.
- **`GET /api/v1/admin/order/:id`**  
  Retrieves detailed information about a specific order.
- **`POST /api/v1/admin/order`**  
  Directly creates an **accepted order** in the queue.
- **`PATCH /api/v1/admin/order/:id`**  
  Updates the status of an order.
- **`PATCH /api/v1/admin/order/:id/accept`**  
  Marks the order as **accepted**.
- **`PATCH /api/v1/admin/order/:id/reject`**  
  Marks the order as **rejected**.

### **Bill Management:**
- **`GET /api/v1/admin/bill?user=string&table=string`**  
  Retrieves all bills associated with a **user or table**.
- **`POST /api/v1/admin/bill`**  
  **Creates a bill** by joining multiple orders using their IDs.

### **Payment Management:**
- **`POST /api/v1/admin/payment/:orderid`**  
  Updates the **payment status** for an order by its ID.
- **`POST /api/v1/admin/payment/:billid`**  
  Updates the **payment status** for all orders within a **bill**.

### **Stock Management:**
- **`GET /api/v1/admin/stock`**  
  Retrieves the current **stock information**.
- **`GET /api/v1/admin/stock/:id`**  
  Retrieves detailed information for a specific stock item.
- **`PATCH /api/v1/admin/stock/:id`**  
  Updates the current **available stock** for a specific item.

### **QR Code Management:**
- **`GET /api/v1/admin/qrcode/:table`**  
  Generates and retrieves a **QR code** for the specified table.

---

## **Office API**

### **Menu Management:**
- **`POST /api/v1/office/menu`**  
  Creates a **new menu item**.
- **`GET /api/v1/office/menu`**  
  Retrieves the **list of menu items**.
- **`GET /api/v1/office/menu/:id`**  
  Retrieves **details** of a specific menu item.
- **`PATCH /api/v1/office/menu/:id`**  
  Modifies the **details** of a specific menu item.

### **Menu Category Management:**
- **`POST /api/v1/office/menu/category`**  
  Creates a **new category**.
- **`GET /api/v1/office/menu/category`**  
  Retrieves the list of **categories**.
- **`PATCH /api/v1/office/menu/category`**  
  Modifies an **existing category**.

### **Stock Management:**
- **`GET /api/v1/office/stock`**  
  Retrieves the current **stock information**.
- **`GET /api/v1/office/stock/:id`**  
  Retrieves detailed information for a specific **stock item**.
- **`POST /api/v1/office/stock/:id`**  
  Adds new stock for a specific item.
- **`PATCH /api/v1/office/stock/:id`**  
  Modifies the quantity or details of a specific **stock item**.
