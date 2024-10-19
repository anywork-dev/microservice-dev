import{_ as r}from"./chunks/Diagram.CxFhJWHR.js";import{c as i,j as t,a,G as s,o as c}from"./chunks/framework.DyATOcH3.js";const p=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"specs/system-architecture.md","filePath":"specs/system-architecture.md"}'),l={name:"specs/system-architecture.md"},f=Object.assign(l,{setup(d){const n=`
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
    `,o=`
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
    `;return(u,e)=>(c(),i("div",null,[e[0]||(e[0]=t("h2",{id:"system-architecture",tabindex:"-1"},[a("System Architecture "),t("a",{class:"header-anchor",href:"#system-architecture","aria-label":'Permalink to "System Architecture"'},"​")],-1)),e[1]||(e[1]=t("p",null,"This section offers a clear breakdown of how the system is structured and operates. It covers the modular design, component interactions, data flow, and infrastructure setup, showing how everything integrates to ensure scalability, performance, and easy maintenance.",-1)),e[2]||(e[2]=t("h2",{id:"menu-flow",tabindex:"-1"},[a("Menu Flow "),t("a",{class:"header-anchor",href:"#menu-flow","aria-label":'Permalink to "Menu Flow"'},"​")],-1)),s(r,{code:n,id:"menuflow"}),e[3]||(e[3]=t("h2",{id:"auth-flow",tabindex:"-1"},[a("Auth Flow "),t("a",{class:"header-anchor",href:"#auth-flow","aria-label":'Permalink to "Auth Flow"'},"​")],-1)),s(r,{code:o,id:"authflow"})]))}});export{p as __pageData,f as default};
