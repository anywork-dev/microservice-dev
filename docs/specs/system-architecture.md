<script setup>
    import Diagram from "../components/Diagram.vue"

    const diagram_lan=
    `
    flowchart LR
        subgraph LAN
            direction TB
            A[Micro Controller] -.-> B[Initial Hash & hash index]
            B -.-> C[Used for hash chain to generate secret]
            A --> D1["setup()"] --> D["POST /refresh/certificate"]
            D -.-> D2[/"Data: id, encrypted date, hash index, local IP"/]
        end
        subgraph SERVER
            direction TB
            ROUTES["router.post('/refresh/certificate')"] --> SERVER1
            SERVER1["Fetch hash by id and count"] --> DATABASE[(Database)]
            DATABASE --> VERIFY@{shape: processes, label: "verification"}
            VERIFY --> STATUS{Authorized?} --YES--> SF@{shape: fork}
            SF --> DNS[Change record in DDNS server]
            SF --> RESPONSE["Respond with SSL Certificate"]
        end
        subgraph DDNS
            direction TB
            DDNS1["router.put(/record)"] --UPSERT--> DDNS2[(Address Map)]
        end
        SERVER --"ID & IP"--> DDNS
        SERVER --DER format Certificate--> LAN
        LAN --HTTPS--> SERVER
    `

    const diagram_menu = 
    `
flowchart LR
    A[Start] --> B[User scan QR menu. Navigate to '/']
    B --> B1[GET /token; Addr=restaurant.domain.com]
    subgraph DNS_SERVER
        direction TB
        DNS1[LISTENING DNS QUERY] --> DNS2[RESOLVE restaurant.domain.com]
    end
    subgraph MICROCONTROLLER
        direction TB
        M2["GENERATE AUXILIARY_TOKEN"] --> M3["Return type Challange"]
    end
    DNS_SERVER -."RESOLVE TO LAN".-> B1
    B1 -.QUERY DOMAIN.-> DNS_SERVER
    B1 --LAN--> MICROCONTROLLER
    B1 --> C[/User name or membership credential/]
    subgraph SERVER
        direction TB
        C1@{shape: processes, label: "Auth Flow"}
        C1 --> C2{Is valid?}
        C2 --YES--> C3[PRIMARY_TOKEN]
        C2 --NO--> C4[401 Unauthorized]
    end
    C --AUXILIARY_TOKEN--> SERVER
    SERVER --> D{Access Granted?}
    D --YES--> H@{shape: fork}
    H --> E[Redirect to /menu]
    subgraph CLIENT
        direction TB
        H --> J[Save user identity name/credential]
        E --> F[Save table number from URL params]
        F --> A3@{shape: junction}
        J --> A3
        A3 -.-> G@{shape: internal-storage, label: "LocalStorage"}
        H --> J1[Save token] --> A3
        
    end
    `

    const diagram_menuList = 
    `
flowchart LR
    A[Start at '/'] --> B[/"GET /menu?category=[string]"/]
    A --> B1[/"GET /menu/:id"/]
    subgraph Server side
        direction TB
        B1 --> C1("router.get('/menu/:id')")
        B --> C["router.get('/menu')"]
        C & C1 -.-> D[(Database)]
        D -.-> C & C1
    end
    click C1 "https://google.com"
    `

    const diagram_addItem = 
    `
flowchart LR
    subgraph SERVER
        A1("router.get('/menu') or router.get('/menu/:id')")
        DATABASE[(Menu)]
        A1 --> DATABASE
    end
    subgraph CLIENT
        direction LR
        START@{shape: start} --> A
        A["GET /menu or /menu/:id"] --> B{Is available?}
        B --NO--> B1[Disable button] --> F
        B --YES--> C[/Click Add item/] 
        C --> D[Save to local]
        D --> E@{shape: internal-storage, label: "LocalStorage"}
        E --> F@{shape: stop}
    end
    A --> REQUEST["Request with optional category or id"]
    --> SERVER
    SERVER --> RESPONSE["Respond with type Menu[]"]
    --> CLIENT
    click DATABASE "https://google.com"
    `

    const diagram_checkout = 
    `
flowchart LR
    subgraph CLIENT
        START@{shape: start} --> A["Get order bill\nPOST /cart/bill"]
        A --> C@{shape: manual, label: "User checks order manually"}
        C --> D["User checkout the order\nPOST /cart/checkout"]
        D --> E["redirect to /myorder"]
    end
    subgraph SERVER
        REQUEST@{shape: fork} --> SERVER1 & SERVER2 --> DATABASE[(Database)]
        SERVER1("router.get('/cart/bill')")
        SERVER2("router.post('/cart/checkout')")
    end
    CLIENT --Request--> SERVER
    SERVER --> RESPONSE[Respond with Order] --> CLIENT
    `

    const diagram_primary_auth = 
    `
flowchart LR
    A[Start] --> C1[/AUXILIARY_TOKEN/]
    C1 --> C3[Token Validation] --> C4{Is valid?}
    C4 --NO--> C5[401 Unauthorized]
    C4 --YES--> J[Generate PRIMARY_TOKEN]

    A --> C{Is membership needed?}
    C --NO--> B[/Input user name/]
    B --> J

    C --YES--> C2[/Input Membership Credential/]
    C2 --> B1[Credential Validation]
    B1 --> B2{Is valid?}
    B2 --NO--> C5[401 Unauthorized]
    B2 --YES--> J
    `
</script>

## System Architecture
This section offers a clear breakdown of how the system is structured and operates. It covers the modular design, component interactions, data flow, and infrastructure setup, showing how everything integrates to ensure scalability, performance, and easy maintenance.

## Primary Token Authentication Flow
This flow outlines the steps to validate user access and generate a `PRIMARY_TOKEN` based on the presence of an `AUXILIARY_TOKEN` and, optionally, membership credentials.

<Diagram :code="diagram_primary_auth" id="authflow"/>

#### **Step-by-Step Flow Explanation**

1. **Start**:  
   - The process begins when the authentication request is initiated.

2. **AUXILIARY_TOKEN Validation**:  
   - The `AUXILIARY_TOKEN` is provided and sent for **Token Validation**.
   - **Decision Point**:  
     - If the `AUXILIARY_TOKEN` is **valid**, the flow moves forward.
     - If **invalid**, the system returns a **401 Unauthorized** response.

3. **Check Membership Requirement**:  
   - The system checks if **membership credentials** are required for further access.  
     - **If membership is not required**:
       - The user is prompted to **input their name**.
       - The flow proceeds to the **PRIMARY_TOKEN generation**.

     - **If membership is required**:
       - The user is asked to provide **membership credentials**.
       - The credentials are sent for **Credential Validation**.

4. **Credential Validation**:  
   - The membership credentials are checked for validity.
     - **If valid**, the process proceeds to **generate the PRIMARY_TOKEN**.
     - **If invalid**, the system returns a **401 Unauthorized** response.

5. **Generate PRIMARY_TOKEN**:  
   - Once all checks are passed, the system generates a **PRIMARY_TOKEN** to grant access.

6. **End of Flow**:  
   - The token can now be used to access the restricted parts of the system or platform.


#### **Summary of Decisions and Actions**

1. **Validation of AUXILIARY_TOKEN**: If invalid, authentication fails with **401 Unauthorized**.
2. **Membership Check**:  
   - If membership is not needed, the user simply enters their name.
   - If required, membership credentials are validated.
3. **Generation of PRIMARY_TOKEN**: Occurs only if all required validations pass.

This flow ensures that only users physically present in the restaurant (verified by `AUXILIARY_TOKEN`) and with valid credentials (if needed) can receive a `PRIMARY_TOKEN`. This token serves as the primary access key to the system.


## Authentication Flow

`AUXILIARY_TOKEN` is a token generated and retrieved exclusively over the **Local Area Network (LAN)**. This mechanism ensures that the request originates from within the restaurant’s local environment, confirming the user's physical presence. The `AUXILIARY_TOKEN` plays a critical role in the authentication process by being a prerequisite to generating the `PRIMARY_TOKEN`. 

Once generated, the `AUXILIARY_TOKEN` is sent back to the client as part of a **Challenge** object, which includes necessary identifiers for tracking and validation.

**Challenge Structure:**  
```typescript
typeof Challenge = { index: number, id: number, auxiliary_token: string };
```
- **index**: A numerical value representing hash index.  
- **id**: An identifier to associate the token with the specific request.  
- **auxiliary_token**: The generated token that verifies the user's physical presence in the restaurant.

<Diagram :code="diagram_menu" id="menuflow"/>

#### **Authentication Workflow Description**

Below is a breakdown of the **authentication workflow** represented by the `diagram_menu` flowchart:

1. **User Action**:  
   - The user scans a **QR code** to access the restaurant menu. This directs the user to `/` (the main route).
   
2. **Token Retrieval**:  
   - The **client-side application** sends a `GET /token` request to `restaurant.domain.com`.
   
3. **DNS Resolution**:  
   - A **DNS query** is triggered to resolve the domain, and the response is forwarded to the restaurant's server.

4. **AUXILIARY_TOKEN Generation**:  
   - A **microcontroller** on the LAN generates the `AUXILIARY_TOKEN` and responds with a **Challenge** object. The challenge includes the `index`, `id`, and `auxiliary_token`.
   - The response was saved in local storage.

5. **Authentication Flow**:
   - The user submits their **name** or **membership credentials**.
   - The **server** validates the credentials and checks the provided `AUXILIARY_TOKEN`.
   - If validation is successful, the server generates the `PRIMARY_TOKEN` and sends it to the client. If unsuccessful, a **401 Unauthorized** response is returned.

6. **Access and Redirection**:
   - Once authenticated, the server determines if access is granted. If successful:
     - The user is redirected to `/menu`.
     - The **user identity (name/credential)** and **table number** from the URL parameters are saved locally.

7. **Client-Side Storage**:
   - The following data is saved to **LocalStorage** for the session:
     - User credentials or identity
     - Table number from the URL parameters
     - `PRIMARY_TOKEN` for authentication

## **Auxiliary Token Validation**

The **Auxiliary Token Validation** process ensures secure token generation by using a **hash chaining algorithm**. This approach adds a layer of complexity to prevent unauthorized access and confirm the token’s authenticity. Each token in the chain depends on the **initial hash**, **previous hash (last_hash)**, and an **incrementing hash index**. 

This process ensures that only valid tokens can be generated and validated sequentially, forming a unique, tamper-proof chain.


### **Hash Chaining Algorithm Overview:**

The algorithm generates tokens by continuously hashing the **current hash** along with the **previous hash value** in a loop. This chaining ensures that each token depends on its predecessor, making it nearly impossible to predict or manipulate without the previous token.

```python
def generate_auxiliary_token(last_hash: str, hash_index: int) -> str:
    cursor = last_hash  # Start with the last known hash

    # Generate the next token in the chain
    while hash_index < hash_index + 1:
        a = hash(cursor)  # Compute the hash of the current cursor
        cursor = hash(str(a) + cursor)  # Update cursor by hashing combined values

    # Increment the hash index to advance in the chain
    hash_index += 1
    last_hash = cursor  # Update the last_hash with the new value

    return cursor  # Return the new auxiliary token
```

## Office & Admin Authentication
Authentication for Admin and Office didn't use **proximity challenge**.

<Diagram :code="`
flowchart LR
  A@{shape: start} --> B[/User credential/]
  subgraph SERVER
    direction LR
    S(router.post /admin/auth ) --> SV[Validation] --> S1{Is valid?}
    S1 --YES--> RESPONSE[PRIMARY_TOKEN]
    S1 --NO--> RESPONSE1[401 Unauthorized]
  end
  B --> SERVER
  SERVER --RESPONSE--> END@{shape: stop}
`" id="officeauth" />

## Signup Overview

<Diagram :code="`
flowchart LR
  A@{shape: start} --> B[User Signup]
  A --> B1[Admin and Office Invitation]
  B --> C{As guest?} --YES--> C1[/Input name/]
  C --> C2{with email?}
  C2 --YES--> D1[Send code to email]
  C2 --NO--> C3{with Google?}
  C3 --YES--> D2[Redirect to Google SignIn]
  C3 --NO--> C4[With whatsapp number]
  C4 --YES--> D3[Send link to whatsapp number]
  D1 & D2 & D3 --> E[Code confirmed] --> E1[Create user]
  B1 --> C5[Send link] --> E2[Confirmed] --> E3[Create user]
`" id="signup" />

## Signup with Whatsapp/Email

<Diagram :code="`
flowchart LR
  A@{shape: start} --> B[/Input whatsapp phone number/]
  subgraph SERVER
    S(router.post /api/v1/signup)
    S --> S1[Check if phone hasn't been taken]
    S1 --> S2[Create random code & Store to cache]
    S2 --> S3[Send code to phone number]
    S3 --> S4[Redirect user to waiting page]
    S3 --> S5[Respond attempts_token, resend_schedule]
  end
  SERVER --> C{user clicks link?} --YES--> D[Redirect to confirmation page]
  D --> E{attempts_token exists?}
  E --NO--> ER[Hide continue button]
  ER --> EE[User back to waiting page] --> EE1[Click continue to check confirmation]
  EE1 --> EE2{Confirmed?} --YES--> EE3[Return token and redirect to /home]
  EE2 --NO--> EE4[Prompt user to confirm]
  E --YES--> ER1[Show continue button]
  E --> EC@{shape: comment, label: 'Because user can confirm from other device'}
  C --NO--> E1{Link was delivered?}
  E1 --NO--> F[Resend link]
  subgraph SERVER_1
    M(router.post resendLink)
  end
  F --> SERVER_1
  B --> SERVER
`" id="whatsapp" />

## Get Menu

<Diagram :code="diagram_menuList" id="menulist"/>

## Add Item to Cart
This flow describes how the system handles a request to **retrieve menu items** and the subsequent process of **adding an item to the user's order**, with interaction between the client, server, and local storage.


<Diagram :code="diagram_addItem" id="additem"/>

### **Step-by-Step Flow Explanation**

##### **1. Start (Client Side)**
- The process begins when the client initiates a request to **retrieve the menu** or a specific menu item using the following endpoints:
  - **`GET /menu`**: Retrieve the full menu.
  - **`GET /menu/:id`**: Retrieve a specific item based on its ID.

##### **2. Send Request to Server**
- The client sends a **GET request** with optional parameters (category or ID) to the **server**.

##### **3. Server-Side Processing**
- **Router Handling**:  
  The server handles the request using:
  - `router.get('/menu')`: Retrieves the entire menu.
  - `router.get('/menu/:id')`: Retrieves a specific menu item.

- **Database Query**:  
  The server queries the **Menu database** for the requested data.

##### **4. Response from Server**
- The server responds with a **list of menu items** (or a specific item) to the client.

##### **5. Availability Check (Client Side)**
- Once the client receives the response:
  - **Is Available?**: The client checks if the item(s) are available.
    - **If NO**:  
      - The **add item button** is **disabled** to prevent further action.
    - **If YES**:  
      - The user can **click the "Add Item" button** to proceed.

##### **6. Save Item to Local Storage**
- Upon clicking "Add Item", the selected item is:
  1. **Saved to LocalStorage** on the client side to retain the user's order.
  2. Ensures the item remains available even if the page is refreshed.

##### **7. End of Flow**
- The process ends with the updated order saved to **LocalStorage**.

#### **Summary of Actions**

1. **Request to Server**: Retrieves either the complete menu or specific item.
2. **Availability Check**: Controls whether the user can add the item.
3. **Save to LocalStorage**: Preserves the user's order locally.
4. **End of Flow**: Ensures the process completes seamlessly, with the order retained across sessions.


## Order Bill and Checkout Flow
The **Order Bill and Checkout Flow** ensures users receive the most accurate bill by dynamically calculating item prices based on real-time data. This flow enhances transparency by retrieving current prices from the server, multiplying them by their quantities, and allowing users to review the total bill before confirming checkout.  

<Diagram :code="diagram_checkout" id="checkout"/>

### **Step-by-Step Flow Explanation**

#### **1. Start (Client Side)**  
- The process begins when the user initiates a **POST /cart/bill** request to retrieve a detailed bill of their order.

#### **2. Fetch Order Bill (Client Side)**  
- The client sends a **POST /cart/bill** request to the server, which retrieves:
  - The **current prices** of each item from the database.
  - **Quantities** for each item in the user’s cart.
  - **Total price**: Calculated by multiplying item prices by their respective quantities.

#### **3. Manual Review by User**  
- The user receives the **detailed bill** and checks:
  - **Item names**  
  - **Quantities**  
  - **Individual prices**  
  - **Total amount** (sum of all items)

- This ensures the user has the chance to verify and make any changes before proceeding with checkout.

#### **4. User Initiates Checkout (Client Side)**  
- Once the user is satisfied, they initiate the checkout by sending a **POST /cart/checkout** request to the server.

#### **5. Server Handling (Server Side)**  
- The server handles the following requests:
  1. **`router.get('/cart/bill')`**: Retrieves item prices and calculates the total bill based on the **most recent data**.
  2. **`router.post('/cart/checkout')`**: Finalizes the order, updates inventory, and reflects the changes in the database.

#### **6. Forked Request and Database Handling**  
- Both requests interact with the **database**:
  - **Bill retrieval** ensures the user receives accurate pricing.
  - **Checkout finalization** updates the database to reflect any inventory changes.

#### **7. Response to Client**  
- After the checkout, the server responds with the **final order confirmation**, ensuring the transaction was successful.


#### **8. Redirect to /myorder**  
- If checkout successful, redirect to /myorder to view order list

### **Summary of Actions**

1. **Accurate Bill Calculation**: The **POST /cart/bill** request ensures the most recent prices are used, multiplied by the quantities of each item.
2. **User Review**: The user manually reviews the bill to confirm that the order is correct.
3. **Real-Time Inventory Update**: During checkout, the server updates the database to reflect inventory changes.
4. **Clear Communication**: Real-time responses provide transparency throughout the process.

## **My Order List/Detail**  
Displays the **current status** of a user's order in the queue, including its **position in the queue** and **queue number**.

## Admin and Office

### **Get Order Queue (Admin)**  
Retrieves the **list of orders** currently in the **order queue** or **waiting list**.

### **Manage Order (Admin)**  
Allows the admin to **accept, reject, or mark orders as ready** for processing or delivery.

### **Create Order Bill (Admin)**  
Enables merging of multiple orders into a **single bill** by **name, table, or custom selection**, making it easier for receptionists to manage combined payments.

### **Create Payment (Admin)**  
Used to **update the payment status** of an order after processing, without needing to re-create the order.

### **Create Order (Admin)**  
Allows the admin to **directly add an order** to the **In Order Queue** for processing.

### **Stock Management (Admin)**  
Lets the admin **set the initial stock quantity** for items or **update the current quantity** based on inventory changes.

### **Manage Menu (Office)**
Create or modify menu items, including ingredients, daily prices, and initial quantity.

### **Manage Categories (Office)**
Set and organize menu categories.

### **Manage Stock (Office)**
Define daily initial stock and update current stock levels.


<Diagram :code="`
flowchart TD
    subgraph User
        U1[My Order List/Detail] --> U2[Check order queue status top queue, order number]
    end
    subgraph Admin
        A1[Get Order Queue] --> A2[View In Order Queue or Waiting List]
        A3[Manage Order] --> A4[Accept/Reject/Ready]
        A5[Create Order Bill] --> A6[Merge by name, table, or custom selection]
        A6 --> A7[Avoid creating individual payments for each order]
        A8[Create Payment] --> A9[Change order payment status]
        A10[Create Order] --> A11[Add order directly to In Order Queue]
        A12[Stock Management] --> A13[Set initial stock quantity]
        A13 --> A14[Update current stock quantity]
        A15[Install Certificate on Microcontroller] --> A16[Install SSL certificate for secure communication]
    end
    A3 --> A5
    A5 --> A8
    A10 --> A3
`" id="admin"/>

## **Install Certificate on Microcontroller**  
Installs an **SSL certificate** on the microcontroller to ensure **secure communication**.

<Diagram :code="diagram_lan" id="lantoken"/>
