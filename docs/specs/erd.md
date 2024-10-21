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
        int current_quantity
        enum status
        int category_id
    }

    MENU_ITEMS_OPTIONS_GROUP {
        int id
        string name
        int menu_item_id
        enum type
    }

    MENU_ITEMS_OPTIONS {
        int id
        string name
        decimal price
    }

    CATEGORIES {
        int id
        string name
        string cover_image
    }

    STOCK {
        int id
        string ingredient_name
        int available_quantity
    }

    MENU_ITEM_STOCK {
        int id
        int menu_item_id
        int stock_id
        int quantity_used
    }

    MENU_ITEM_OPTION_STOCK {
        int id
        int option_id
        int stock_id
        int quantity_used
    }

    ORDERS {
        int id
        date order_date
        int user_id
        int table_id
        enum status
    }

    ORDER_ITEMS {
        int id
        int order_id
        int menu_item_id
        int quantity
        decimal total_price
    }

    ORDER_ITEMS_OPTIONS {
        int id
        int order_item_id
        int option_id
        int group_id
    }

    BILLS {
        int id
        date bill_date
        int payment_id
    }

    BILL_ORDERS {
        int id
        int bill_id
        int order_id
    }

    PAYMENTS {
        int id
        date payment_date
        int method_id
    }

    PAYMENT_METHODS {
        int id
        string method
        string description
    }

    USERS ||--o{ ORDERS: places
    ORDERS ||--o{ ORDER_ITEMS: contains
    ORDER_ITEMS ||--o{ ORDER_ITEMS_OPTIONS: has
    MENU_ITEMS ||--o{ ORDER_ITEMS: included_in
    MENU_ITEMS }o--|| MENU_ITEMS_OPTIONS_GROUP: belongs_to
    MENU_ITEMS_OPTIONS_GROUP ||--o{ MENU_ITEMS_OPTIONS: has
    MENU_ITEM_OPTION_STOCK ||--o{ MENU_ITEMS_OPTIONS: has
    MENU_ITEMS }o--|| CATEGORIES: belongs_to
    MENU_ITEMS }o--o{ MENU_ITEM_STOCK: requires
    STOCK ||--o{ MENU_ITEM_STOCK: associated_with
    STOCK ||--o{ MENU_ITEM_OPTION_STOCK: associated_with
    ORDERS }o--|| BILL_ORDERS: associated_with
    BILL_ORDERS ||--o{ BILLS: has
    BILLS }o--|| PAYMENTS: paid_by
    PAYMENTS }o--|| PAYMENT_METHODS: uses
    `
</script>

## **ERD Description**

This **Entity-Relationship Diagram (ERD)** models a restaurant system, covering key aspects such as **users, menu management, stock tracking, orders, and payments**. Below is a detailed breakdown of each entity and its relationships.

<Diagram :code="diagram_datamodel" id="authflow"/>


## **Entities and Attributes**

1. **USERS**  
   - Represents users who place orders (e.g., guests or members).  
   **Attributes:**  
     - `id`: Unique identifier  
     - `name`: User's name  
     - `email`: User's email  
     - `password`: Encrypted password  
     - `user_type`: Role of the user (e.g., GUEST, MEMBER)

2. **MENU_ITEMS**  
   - Represents food or beverage items offered.  
   **Attributes:**  
     - `id`: Unique identifier  
     - `name`: Name of the menu item  
     - `price`: Price per item  
     - `initial_quantity`: Initial stock quantity  
     - `current_quantity`: Current available quantity  
     - `status`: Availability status  
     - `category_id`: Foreign key referencing **CATEGORIES**

3. **MENU_ITEMS_OPTIONS_GROUP**  
   - Groups related options for menu items (e.g., sauces, toppings).  
   **Attributes:**  
     - `id`: Unique identifier  
     - `name`: Group name  
     - `menu_item_id`: Foreign key referencing **MENU_ITEMS**  
     - `type`: Type of option group (e.g., required or optional)

4. **MENU_ITEMS_OPTIONS**  
   - Defines individual options (e.g., cheese, extra toppings).  
   **Attributes:**  
     - `id`: Unique identifier  
     - `name`: Option name  
     - `price`: Price for the option

5. **CATEGORIES**  
   - Organizes menu items into categories (e.g., appetizers, drinks).  
   **Attributes:**  
     - `id`: Unique identifier  
     - `name`: Category name  
     - `cover_image`: Image representing the category

6. **STOCK**  
   - Tracks ingredients available for use in menu items.  
   **Attributes:**  
     - `id`: Unique identifier  
     - `ingredient_name`: Name of the ingredient  
     - `available_quantity`: Quantity available

7. **MENU_ITEM_STOCK**  
   - Links menu items to the stock they require.  
   **Attributes:**  
     - `id`: Unique identifier  
     - `menu_item_id`: Foreign key referencing **MENU_ITEMS**  
     - `stock_id`: Foreign key referencing **STOCK**  
     - `quantity_used`: Quantity used per item

8. **MENU_ITEM_OPTION_STOCK**  
   - Links options to the stock they require.  
   **Attributes:**  
     - `id`: Unique identifier  
     - `option_id`: Foreign key referencing **MENU_ITEMS_OPTIONS**  
     - `stock_id`: Foreign key referencing **STOCK**  
     - `quantity_used`: Quantity used per option

9. **ORDERS**  
   - Represents customer orders.  
   **Attributes:**  
     - `id`: Unique identifier  
     - `order_date`: Date the order was placed  
     - `user_id`: Foreign key referencing **USERS**  
     - `table_id`: Table number for the order (nullable for delivery/takeaway)  
     - `status`: Status of the order (e.g., pending, completed)

10. **ORDER_ITEMS**  
    - Represents the items included in an order.  
    **Attributes:**  
      - `id`: Unique identifier  
      - `order_id`: Foreign key referencing **ORDERS**  
      - `menu_item_id`: Foreign key referencing **MENU_ITEMS**  
      - `quantity`: Quantity ordered  
      - `total_price`: Total price for the item(s)

11. **ORDER_ITEMS_OPTIONS**  
    - Links options to items in an order.  
    **Attributes:**  
      - `id`: Unique identifier  
      - `order_item_id`: Foreign key referencing **ORDER_ITEMS**  
      - `option_id`: Foreign key referencing **MENU_ITEMS_OPTIONS**  
      - `group_id`: Foreign key referencing **MENU_ITEMS_OPTIONS_GROUP**

12. **BILLS**  
    - Represents bills that consolidate multiple orders.  
    **Attributes:**  
      - `id`: Unique identifier  
      - `bill_date`: Date the bill was created  
      - `payment_id`: Foreign key referencing **PAYMENTS**

13. **BILL_ORDERS**  
    - Links orders to bills.  
    **Attributes:**  
      - `id`: Unique identifier  
      - `bill_id`: Foreign key referencing **BILLS**  
      - `order_id`: Foreign key referencing **ORDERS**

14. **PAYMENTS**  
    - Tracks payment transactions.  
    **Attributes:**  
      - `id`: Unique identifier  
      - `payment_date`: Date the payment was made  
      - `method_id`: Foreign key referencing **PAYMENT_METHODS**

15. **PAYMENT_METHODS**  
    - Defines available payment methods (e.g., cash, card).  
    **Attributes:**  
      - `id`: Unique identifier  
      - `method`: Name of the payment method  
      - `description`: Description of the payment method


## **Relationships**

1. **Users and Orders**:  
   - A user can place multiple orders.  
   **(USERS ||--o{ ORDERS)**

2. **Orders and Order Items**:  
   - An order contains multiple items.  
   **(ORDERS ||--o{ ORDER_ITEMS)**

3. **Order Items and Options**:  
   - Order items can have multiple options.  
   **(ORDER_ITEMS ||--o{ ORDER_ITEMS_OPTIONS)**

4. **Menu Items and Categories**:  
   - Menu items belong to specific categories.  
   **(MENU_ITEMS }o--|| CATEGORIES)**

5. **Menu Items and Options Groups**:  
   - Menu items have groups of options.  
   **(MENU_ITEMS }o--|| MENU_ITEMS_OPTIONS_GROUP)**

6. **Options Groups and Options**:  
   - Each option group contains multiple options.  
   **(MENU_ITEMS_OPTIONS_GROUP ||--o{ MENU_ITEMS_OPTIONS)**

7. **Stock Management**:  
   - Both menu items and options are associated with stock through **MENU_ITEM_STOCK** and **MENU_ITEM_OPTION_STOCK** junction tables.  
   **(MENU_ITEMS }o--o{ MENU_ITEM_STOCK)**  
   **(MENU_ITEMS_OPTIONS ||--o{ MENU_ITEM_OPTION_STOCK)**

8. **Orders and Bills**:  
   - Multiple orders can be associated with a single bill.  
   **(ORDERS }o--|| BILL_ORDERS)**  
   **(BILL_ORDERS ||--o{ BILLS)**

9. **Bills and Payments**:  
   - Each bill can have one payment record.  
   **(BILLS }o--|| PAYMENTS)**

10. **Payments and Methods**:  
    - Payments use specific methods.  
    **(PAYMENTS }o--|| PAYMENT_METHODS)**


## **Summary**

This ERD provides a comprehensive model for managing **users, menu items, stock, orders, options, bills, and payments** in a restaurant system. It ensures:

- **Accurate stock management** through associations with both menu items and their options.
- **Flexible order and billing handling**, supporting multiple orders under one bill.
- **Granular tracking of options** for each order item, with pricing included at the option level.
- **Scalable payment processing**, allowing multiple payment methods.

This structure supports smooth operations and ensures consistency across all business processes.