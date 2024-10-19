<script setup>
    import Diagram from "../components/Diagram.vue"

    const diagram_datamodel = `
    erDiagram
    USERS {
        int id
        string name
        string email
        string password
        enum user_type
    }

    MENU_ITEMS {
        int id
        string name
        decimal price
        int initial_quantity
        int category_id
    }

    CATEGORIES {
        int id
        string name
    }

    STOCK {
        int id
        string ingredient_name
        int available_quantity
        int menu_item_id
    }

    ORDERS {
        int id
        date order_date
        int user_id
        int table_id
        string status
        int bill_id
    }

    ORDER_ITEMS {
        int id
        int order_id
        int menu_item_id
        int quantity
        decimal total_price
    }

    BILLS {
        int id
        date bill_date
        decimal total_amount
    }

    PAYMENTS {
        int id
        int order_id
        int bill_id
        string payment_status
        date payment_date
    }

    TABLES {
        int id
        string table_number
    }

    ORDER_STATUS_HISTORY {
        int id
        int order_id
        string status
        date updated_at
    }

    USERS ||--o{ ORDERS: places
    ORDERS ||--o{ ORDER_ITEMS: contains
    MENU_ITEMS ||--o{ ORDER_ITEMS: included_in
    MENU_ITEMS }o--|| STOCK: requires
    MENU_ITEMS }o--|| CATEGORIES: belongs_to
    ORDERS }o--|| BILLS: billed_under
    ORDERS }o--|| PAYMENTS: has_payment
    ORDERS }o--|| TABLES: assigned_to
    ORDERS ||--o{ ORDER_STATUS_HISTORY: tracks
    `
</script>

### **Entity-Relationship Diagram (ERD) Description**

The **ERD (Entity-Relationship Diagram)** represents the data structure and relationships within the system. It captures the key entities involved in managing users, orders, menu items, payments, and stock to ensure smooth operations in a restaurant environment. This ERD focuses on user roles, order processing, payment status, stock management, and the interaction between these elements.

<Diagram :code="diagram_datamodel" id="authflow"/>

## **Relationships:**

1. **Users and Orders**:  
   - **One-to-Many**: Each user (GUEST or MEMBER) can place multiple orders.  
     **(USERS ||--o{ ORDERS)**

2. **Orders and Order Items**:  
   - **One-to-Many**: Each order contains multiple items.  
     **(ORDERS ||--o{ ORDER_ITEMS)**

3. **Menu Items and Order Items**:  
   - **Many-to-Many**: Multiple menu items can appear across different orders.  
     **(MENU_ITEMS ||--o{ ORDER_ITEMS)**

4. **Menu Items and Stock**:  
   - **Many-to-One**: Each menu item requires specific stock ingredients.  
     **(MENU_ITEMS }o--|| STOCK)**

5. **Menu Items and Categories**:  
   - **Many-to-One**: Menu items are assigned to specific categories.  
     **(MENU_ITEMS }o--|| CATEGORIES)**

6. **Orders and Bills**:  
   - **Many-to-One**: Multiple orders can be grouped into a single bill.  
     **(ORDERS }o--|| BILLS)**

7. **Orders and Payments**:  
   - **One-to-One or Many-to-One**: Each order or bill can have a payment status.  
     **(ORDERS }o--|| PAYMENTS)**

8. **Orders and Tables**:  
   - **Many-to-One**: Orders are assigned to specific tables.  
     **(ORDERS }o--|| TABLES)**

9. **Order Status History**:  
   - **One-to-Many**: Each order has multiple status updates logged over time.  
     **(ORDERS ||--o{ ORDER_STATUS_HISTORY)**

## **Entities and Attributes:**

1. **USERS:**
   - Represents individuals interacting with the system, including both **guests** and **members**.
   - **Attributes:**
     - `id`: Unique identifier for the user.
     - `name`: Name of the user.
     - `email`: Contact email (for members only).
     - `password`: Encrypted password (for members).
     - `user_type`: Type of user (GUEST or MEMBER).

2. **MENU_ITEMS:**
   - Contains information about items available on the menu.
   - **Attributes:**
     - `id`: Unique identifier for the menu item.
     - `name`: Name of the menu item.
     - `price`: Price of the item.
     - `initial_quantity`: Initial quantity available.
     - `category_id`: Foreign key linking to the category.

3. **CATEGORIES:**
   - Groups menu items into specific categories (e.g., appetizers, drinks).
   - **Attributes:**
     - `id`: Unique identifier for the category.
     - `name`: Name of the category.

4. **STOCK:**
   - Tracks ingredients required for menu items.
   - **Attributes:**
     - `id`: Unique identifier for the stock item.
     - `ingredient_name`: Name of the ingredient.
     - `available_quantity`: Quantity available.
     - `menu_item_id`: Foreign key linking to the menu item.

5. **ORDERS:**
   - Records orders placed by users.
   - **Attributes:**
     - `id`: Unique identifier for the order.
     - `order_date`: Date the order was placed.
     - `user_id`: Foreign key linking to the user.
     - `table_id`: Foreign key linking to the assigned table.
     - `status`: Current status of the order (e.g., pending, accepted, rejected).
     - `bill_id`: Optional foreign key linking to a bill.

6. **ORDER_ITEMS:**
   - Represents the individual items within an order.
   - **Attributes:**
     - `id`: Unique identifier for the order item.
     - `order_id`: Foreign key linking to the order.
     - `menu_item_id`: Foreign key linking to the menu item.
     - `quantity`: Quantity of the menu item.
     - `total_price`: Total price for the item (price × quantity).

7. **BILLS:**
   - Consolidates multiple orders into a single bill for payment.
   - **Attributes:**
     - `id`: Unique identifier for the bill.
     - `bill_date`: Date the bill was generated.
     - `total_amount`: Total amount due for the bill.

8. **PAYMENTS:**
   - Tracks payment status for orders or bills.
   - **Attributes:**
     - `id`: Unique identifier for the payment.
     - `order_id`: Optional foreign key linking to an order.
     - `bill_id`: Optional foreign key linking to a bill.
     - `payment_status`: Status of the payment (e.g., paid, unpaid).
     - `payment_date`: Date the payment was made.

## **Summary of the ERD:**

This ERD captures the essential components of the system:

- **User Management**: Differentiates between guests and members.
- **Order Processing**: Tracks orders, their items, and status changes.
- **Billing and Payment**: Manages billing and payment status.
- **Menu and Stock Management**: Associates menu items with stock and categories.
- **Table Assignment**: Handles table reservations for orders.
- **Order Status History**: Logs status changes over time for auditing.
