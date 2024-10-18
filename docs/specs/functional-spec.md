# Functional Specifications

This specification serves as a blueprint to guide us in developing the right product for the right market. It is not based on shallow assumptions but rather the result of a deliberate and thorough analysis of real-world problems, ensuring that the product addresses the actual needs and challenges of its users.

  

**Functional Specification**

| ID | Name | Description | Steps | Expect |
| ---| ---| ---| ---| --- |
| A001 | View menu | Enable users to view restaurant menu from their mobile phone | Open link from the QR code given<br> | Navigated to restaurant menu list |
| A002 | Category | Enables users to view menu categorically by navigating through selecting category. | From A001<br>Navigate to category page by clicking available buttons<br> | Navigated to categorize menu list |
| A003 | Add Item Quick Button | Allows users to add item from the menu page to quickly add them | From A001 / A002<br>Click '+' on item card<br>Click '-' to decrease quantity<br> | Shows item has been added in bottom sheet dialog with quantity |
| A004 | Sign member if any | Force customer to sign or register as member to continue according to restaurant policy |  |  |
| B001 | Item detail | Allows user to see item details | From A001 / A002<br>Click menu item card<br> | Navigate to item detail page |
| B002 | Add Item from detail page | Allows user to add item according to its quantity | From B001<br>Click add item<br>Button '-' and '+' was enabled if quantity > 0<br> | Item added to chart |
| C001 | View ordered items in cart page | Continue to orders page to view ordered items | From A001 / A002<br>Have item total quantity > 0<br>Click checkout on bottom sheet<br>Or click cart item on nav bar<br> | Navigate to cart page and enable user to view ordered items and the total. |
| C002 | Checkout order | Continue to checkout page consists of customer's current ordered items | From C001<br>Click checkout button to create order<br>Input table number optionally<br>Optionally add notes<br> | Queues customer order and navigate to order detail page |
| D001 | Order detail | Enables customer to view details of their order including queue status and order status | From C002<br>or navigating from nav bar button<br> | Displays<br>Ordered items<br>Queue status<br>Order status (out of order, in order)<br>QR code of order ID<br>Total cost including tax<br> |
| D002 | Order list | Enable customer to view orders have been made | From A001 / A002<br> | Display list of customer's order |
| E001 | Receptionist order page | Display customer order list categorized by In order or In queue | Login as staff member<br> | Display list of orders that have been made |
| E002 | Order detail | Display customer's order detail | From E001<br>Click order card<br> | Display order detail |
| E003 | Take order | Move order to In order status. This means the order is currently handled by the kitchen. | From E002<br>Click Take order<br> | Update order status. Customer also notified by this changes. |
| E004 | Out of order | Happens when some item is out of order. The staff select the item is out of order. The default message is Out of order, the staff can input custom message | E002<br>Click drop order<br>Select item that will be dropped<br>If item selected, input message optionally<br> | The order status is changed to out of order. The customer is notified by this changes |
| E005 | Search order | Search order by ID. Showed by customer from D001 when they want to pay at the cashier. Cashier can use barcode scanner. | From E001<br>Click search icon<br> | Found an order detail by the given ID |
| E006 | Find orders by table | Find order by table | From E001<br>Navigate to \`table\` tab<br> | Found all orders that have been made with associated table |
| E007 | Find orders by customer name | Find order by customer name | From E001<br>Navigate to \`customer\` tab<br> | Found all orders that have been made with associated customer |
| E008 | Show receipt | Show order receipt | From E002<br>Click receipt<br> | Show order receipt |
| E009 | Show receipt by table | Show merged order receipt by table | From E006<br>Click \`table\` card<br>Click show receipt<br> | Show merged orders receipt by associated table |
| E010 | Show receipt by customer name | Show merged order receipt by customer name | From E007<br>Click \`customer\` card<br>Click show receipt<br> | Show merged orders receipt by associated customer name |
| E011 | Update order (multiple/single) status to paid | Update status to paid |  |  |
| E012 | Update order status (single) to serve | Update status to served |  |  |
| F001 | Item status manipulation | Update menu item stock status |  |  |