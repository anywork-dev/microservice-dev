<script setup>
    import Diagram from "../components/Diagram.vue"
    const diagram_menu = 
    `
flowchart LR
    A[Start] --> B[User scan QR menu]
    B --> C[/Request/]
    subgraph Server side
        direction TB
        C --> C1
        C1@{shape: processes, label: "Auth Flow"}
    end
    C1 --> D{Access Granted?}
    D --NO--> C1
    D --YES--> H@{shape: fork}
    H --> E[Redirect to Digital Menu]
    subgraph Client side
        direction TB
        H --> J[Save user identity name/credential]
        E --> F[Save table number from URL params]
        F --> A3@{shape: junction}
        J --> A3
        A3 -.-> G[(LocalStorage)]
        
    end
    `

    const diagram_authflow = 
    `
flowchart LR
    A[Start] --> C
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

<Diagram :code="diagram_menu" id="menuflow"/>

## Auth Flow

<Diagram :code="diagram_authflow" id="authflow"/>
