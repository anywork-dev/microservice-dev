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
            ROUTES[triggered POST /refresh/certificate] --> SERVER1
            SERVER1["Fetch hash by id and count"] --> DATABASE[(Database)]
            DATABASE --> VERIFY@{shape: processes, label: "verification"}
            VERIFY --> STATUS{Authorized?} --YES--> SF@{shape: fork}
            SF --> DNS[Change record in DDNS server]
            SF --> RESPONSE["Respond with SSL Certificate"]
        end
        SERVER --DER format Certificate--> LAN
        LAN --HTTPS--> SERVER
    `

    const diagram_menu = 
    `
flowchart LR
    A[Start] --> B[User scan QR menu. Navigate to '/']
    B --> B1[Request to LAN server for token]
    B1 --> C[/Request/]
    subgraph SERVER
        direction TB
        C1@{shape: processes, label: "Auth Flow"}
    end
    C --> SERVER
    C1 --> D{Access Granted?}
    D --NO--> C1
    D --YES--> H@{shape: fork}
    H --> E[Redirect to /menu]
    subgraph CLIENT
        direction TB
        H --> J[Save user identity name/credential]
        E --> F[Save table number from URL params]
        F --> A3@{shape: junction}
        J --> A3
        A3 -.-> G[(LocalStorage)]
        
    end
    `

    const diagram_menuList = 
    `
flowchart LR
    A[Start at '/'] --> B[/Request Menu List/]
    A --> B1[/Item detail/]
    subgraph Server side
        direction TB
        B1 --> C1["GET /menu/:id"]
        B --> C["GET /menu?category=[string]"]
        C & C1 -.-> D[(Database)]
        D -.-> C & C1
    end
    `

    const diagram_authflow = 
    `
flowchart LR
    A[Start] --> C1[primary token] --> C
    C{Is membership needed?}
    C --YES--> D[/Sign In or Sign Up/]
    D --> F1{Success?}
    F1 --NO--> D
    C --NO--> E[/Input Name/]
    E --> F@{shape: junction}
    F1 --YES--> F
    F --> G[Grant Access]
    `
</script>

## System Architecture
This section offers a clear breakdown of how the system is structured and operates. It covers the modular design, component interactions, data flow, and infrastructure setup, showing how everything integrates to ensure scalability, performance, and easy maintenance.


## Menu Flow

### Client Initial Access

<Diagram :code="diagram_menu" id="menuflow"/>

### LAN Server Token
This token intended to verify if the user is in the restaurant by connecting to 
restaurant WIFI. The app will request to domain redirected to 

<Diagram :code="diagram_lan" id="lantoken"/>

### Get Menu

<Diagram :code="diagram_menuList" id="menulist"/>

## Auth Flow

<Diagram :code="diagram_authflow" id="authflow"/>
