import{_ as a}from"./chunks/Diagram.CxFhJWHR.js";import{c as r,j as e,a as s,G as o,a0 as l,o as n}from"./chunks/framework.DyATOcH3.js";const u=JSON.parse('{"title":"Flowchart Shapes Reference","description":"","frontmatter":{},"headers":[],"relativePath":"references/flowchart.md","filePath":"references/flowchart.md"}'),c={name:"references/flowchart.md"},b=Object.assign(c,{setup(i){const d=`
flowchart LR
    A1@{ shape: process, label: "Process" }
    A1 --> C1@{ shape: comment, label: "Standard process or task" }

    A2@{ shape: event, label: "Event" }
    A2 --> C2@{ shape: comment, label: "Marks an event or trigger" }

    A3@{ shape: terminal, label: "Terminal" }
    A3 --> C3@{ shape: comment, label: "Represents the start or end point" }

    A4@{ shape: subprocess, label: "Subprocess" }
    A4 --> C4@{ shape: comment, label: "A smaller process within another" }

    A5@{ shape: database, label: "Database" }
    A5 --> C5@{ shape: comment, label: "Symbolizes data storage" }

    A6@{ shape: start, label: "Start" }
    A6 --> C6@{ shape: comment, label: "Indicates the beginning of a process" }

    A7@{ shape: decision, label: "Decision" }
    A7 --> C7@{ shape: comment, label: "Represents a decision-making step" }

    A8@{ shape: prepare, label: "Prepare" }
    A8 --> C8@{ shape: comment, label: "Preparation or condition step" }

    A9@{ shape: in-out, label: "Input/Output (Right)" }
    A9 --> C9@{ shape: comment, label: "Represents data input or output" }

    A10@{ shape: out-in, label: "Input/Output (Left)" }
    A10 --> C10@{ shape: comment, label: "Represents data output or input" }

    A11@{ shape: priority, label: "Priority" }
    A11 --> C11@{ shape: comment, label: "Marks a priority action" }

    A12@{ shape: manual, label: "Manual" }
    A12 --> C12@{ shape: comment, label: "Represents a manual task or operation" }

    A13@{ shape: stop, label: "Stop" }
    A13 --> C13@{ shape: comment, label: "Indicates the end of a process" }

    A14@{ shape: text, label: "Text Block" }
    A14 --> C14@{ shape: comment, label: "Used for notes or descriptions" }

    A15@{ shape: card, label: "Card" }
    A15 --> C15@{ shape: comment, label: "Represents a card-like element" }

    A16@{ shape: lined-process, label: "Lined Process" }
    A16 --> C16@{ shape: comment, label: "A shaded or lined process step" }

    A17@{ shape: start, label: "Small Start" }
    A17 --> C17@{ shape: comment, label: "A smaller starting point" }

    A18@{ shape: stop, label: "Framed Stop" }
    A18 --> C18@{ shape: comment, label: "Another indicator for process stop" }
    A19@{ shape: join, label: "Fork/Join" }
    A19 --> C19@{ shape: comment, label: "Represents a split or merge in process flow" }

    A20@{ shape: collate, label: "Collate" }
    A20 --> C20@{ shape: comment, label: "Indicates a collation step" }

    A21@{ shape: comment, label: "Comment" }
    A21 --> C21@{ shape: comment, label: "Used to add explanatory notes" }

    A22@{ shape: com-link, label: "Communication Link" }
    A22 --> C22@{ shape: comment, label: "Symbolizes communication between elements" }

    A23@{ shape: doc, label: "Document" }
    A23 --> C23@{ shape: comment, label: "Represents a document or file" }

    A24@{ shape: delay, label: "Delay" }
    A24 --> C24@{ shape: comment, label: "Indicates a delay in the process" }

    A25@{ shape: das, label: "Direct Access Storage" }
    A25 --> C25@{ shape: comment, label: "Marks direct access storage" }

    A26@{ shape: disk, label: "Disk Storage" }
    A26 --> C26@{ shape: comment, label: "Represents disk-based storage" }

    A27@{ shape: display, label: "Display" }
    A27 --> C27@{ shape: comment, label: "Indicates a display or output" }

    A28@{ shape: divided-process, label: "Divided Process" }
    A28 --> C28@{ shape: comment, label: "Marks a divided process step" }

    A29@{ shape: extract, label: "Extract" }
    A29 --> C29@{ shape: comment, label: "Represents an extraction operation" }

    A30@{ shape: internal-storage, label: "Internal Storage" }
    A30 --> C30@{ shape: comment, label: "Symbolizes internal storage" }

    A31@{ shape: junction, label: "Junction" }
    A31 --> C31@{ shape: comment, label: "Indicates a junction point" }

    A32@{ shape: lined-document, label: "Lined Document" }
    A32 --> C32@{ shape: comment, label: "Represents a document with lines" }

    A33@{ shape: loop-limit, label: "Loop Limit" }
    A33 --> C33@{ shape: comment, label: "Defines the limit of a loop" }

    A34@{ shape: manual-file, label: "Manual File" }
    A34 --> C34@{ shape: comment, label: "Represents a manual file operation" }

    A35@{ shape: manual-input, label: "Manual Input" }
    A35 --> C35@{ shape: comment, label: "Indicates a manual input step" }

    A36@{ shape: docs, label: "Multi-Document" }
    A36 --> C36@{ shape: comment, label: "Represents multiple documents" }

    A37@{ shape: processes, label: "Multi-Process" }
    A37 --> C37@{ shape: comment, label: "Marks multiple parallel processes" }

    A38@{ shape: paper-tape, label: "Paper Tape" }
    A38 --> C38@{ shape: comment, label: "Symbolizes a paper tape" }

    A39@{ shape: stored-data, label: "Stored Data" }
    A39 --> C39@{ shape: comment, label: "Indicates data stored for later use" }

    A40@{ shape: summary, label: "Summary" }
    A40 --> C40@{ shape: comment, label: "Represents a summary or conclusion" }

    A41@{ shape: tagged-document, label: "Tagged Document" }
    A41 --> C41@{ shape: comment, label: "Represents a document with tags" }

    A42@{ shape: tagged-process, label: "Tagged Process" }
    A42 --> C42@{ shape: comment, label: "Marks a tagged process" }
    `;return(p,t)=>(n(),r("div",null,[t[0]||(t[0]=e("h1",{id:"flowchart-shapes-reference",tabindex:"-1"},[s("Flowchart Shapes Reference "),e("a",{class:"header-anchor",href:"#flowchart-shapes-reference","aria-label":'Permalink to "Flowchart Shapes Reference"'},"​")],-1)),t[1]||(t[1]=e("p",null,"This reference page provides an overview of flowchart shapes based on their semantic names, short names, descriptions, and supported aliases. Use this guide to standardize flowchart elements for consistent visual representation.",-1)),o(a,{code:d,id:"specificaiton"}),t[2]||(t[2]=l('<table tabindex="0"><thead><tr><th><strong>Semantic Name</strong></th><th><strong>Shape Name</strong></th><th><strong>Short Name</strong></th><th><strong>Description</strong></th><th><strong>Alias Supported</strong></th></tr></thead><tbody><tr><td>Process</td><td>Rectangle</td><td>rect</td><td>Standard process shape</td><td>proc, process, rectangle</td></tr><tr><td>Event</td><td>Rounded Rectangle</td><td>rounded</td><td>Represents an event</td><td>event</td></tr><tr><td>Terminal Point</td><td>Stadium</td><td>stadium</td><td>Terminal point</td><td>terminal, pill</td></tr><tr><td>Subprocess</td><td>Framed Rectangle</td><td>fr-rect</td><td>Subprocess</td><td>subprocess, subproc, framed-rectangle, subroutine</td></tr><tr><td>Database</td><td>Cylinder</td><td>cyl</td><td>Database storage</td><td>db, database, cylinder</td></tr><tr><td>Start</td><td>Circle</td><td>circle</td><td>Starting point</td><td>circ</td></tr><tr><td>Odd</td><td>Odd</td><td>odd</td><td>Odd shape</td><td></td></tr><tr><td>Decision</td><td>Diamond</td><td>diam</td><td>Decision-making step</td><td>decision, diamond</td></tr><tr><td>Prepare Conditional</td><td>Hexagon</td><td>hex</td><td>Preparation or condition step</td><td>hexagon, prepare</td></tr><tr><td>Data Input/Output</td><td>Lean Right</td><td>lean-r</td><td>Represents input or output</td><td>lean-right, in-out</td></tr><tr><td>Data Input/Output</td><td>Lean Left</td><td>lean-l</td><td>Represents output or input</td><td>lean-left, out-in</td></tr><tr><td>Priority Action</td><td>Trapezoid Base Bottom</td><td>trap-b</td><td>Priority action</td><td>priority, trapezoid-bottom</td></tr><tr><td>Manual Operation</td><td>Trapezoid Base Top</td><td>trap-t</td><td>Represents a manual task</td><td>manual, trapezoid-top</td></tr><tr><td>Stop</td><td>Double Circle</td><td>dbl-circ</td><td>Represents a stop point</td><td>double-circle</td></tr><tr><td>Text Block</td><td>Text Block</td><td>text</td><td>Text block</td><td>-</td></tr><tr><td>Card</td><td>Notched Rectangle</td><td>notch-rect</td><td>Represents a card</td><td>card, notched-rectangle</td></tr><tr><td>Lined/Shaded Process</td><td>Lined Rectangle</td><td>lin-rect</td><td>Lined process shape</td><td>lined-rectangle, lined-process, lin-proc, shaded-process</td></tr><tr><td>Start</td><td>Small Circle</td><td>sm-circ</td><td>Small starting point</td><td>start, small-circle</td></tr><tr><td>Stop</td><td>Framed Circle</td><td>fr-circ</td><td>Stop point</td><td>stop, framed-circle</td></tr><tr><td>Fork/Join</td><td>Filled Rectangle</td><td>fork</td><td>Fork or join in process flow</td><td>join</td></tr><tr><td>Collate</td><td>Hourglass</td><td>hourglass</td><td>Represents a collate operation</td><td>hourglass</td></tr><tr><td>Comment</td><td>Curly Brace</td><td>brace</td><td>Adds a comment</td><td>comment, brace-l</td></tr><tr><td>Comment Right</td><td>Curly Brace</td><td>brace-r</td><td>Adds a comment</td><td>-</td></tr><tr><td>Comment (Both Sides)</td><td>Curly Braces</td><td>braces</td><td>Adds a comment</td><td>-</td></tr><tr><td>Com Link</td><td>Lightning Bolt</td><td>bolt</td><td>Communication link</td><td>com-link, lightning-bolt</td></tr><tr><td>Document</td><td>Document</td><td>doc</td><td>Represents a document</td><td>doc, document</td></tr><tr><td>Delay</td><td>Half-Rounded Rectangle</td><td>delay</td><td>Represents a delay</td><td>half-rounded-rectangle</td></tr><tr><td>Direct Access Storage</td><td>Horizontal Cylinder</td><td>h-cyl</td><td>Direct access storage</td><td>das, horizontal-cylinder</td></tr><tr><td>Disk Storage</td><td>Lined Cylinder</td><td>lin-cyl</td><td>Disk storage</td><td>disk, lined-cylinder</td></tr><tr><td>Display</td><td>Curved Trapezoid</td><td>curv-trap</td><td>Represents a display</td><td>curved-trapezoid, display</td></tr><tr><td>Divided Process</td><td>Divided Rectangle</td><td>div-rect</td><td>Divided process shape</td><td>div-proc, divided-rectangle, divided-process</td></tr><tr><td>Extract</td><td>Triangle</td><td>tri</td><td>Extraction process</td><td>extract, triangle</td></tr><tr><td>Internal Storage</td><td>Window Pane</td><td>win-pane</td><td>Internal storage</td><td>internal-storage, window-pane</td></tr><tr><td>Junction</td><td>Filled Circle</td><td>f-circ</td><td>Junction point</td><td>junction, filled-circle</td></tr><tr><td>Lined Document</td><td>Lined Document</td><td>lin-doc</td><td>Lined document</td><td>lined-document</td></tr><tr><td>Loop Limit</td><td>Trapezoidal Pentagon</td><td>notch-pent</td><td>Loop limit step</td><td>loop-limit, notched-pentagon</td></tr><tr><td>Manual File</td><td>Flipped Triangle</td><td>flip-tri</td><td>Manual file operation</td><td>manual-file, flipped-triangle</td></tr><tr><td>Manual Input</td><td>Sloped Rectangle</td><td>sl-rect</td><td>Manual input step</td><td>manual-input, sloped-rectangle</td></tr><tr><td>Multi-Document</td><td>Stacked Document</td><td>docs</td><td>Multiple documents</td><td>documents, st-doc, stacked-document</td></tr><tr><td>Multi-Process</td><td>Stacked Rectangle</td><td>st-rect</td><td>Multiple processes</td><td>procs, processes, stacked-rectangle</td></tr><tr><td>Paper Tape</td><td>Flag</td><td>flag</td><td>Paper tape</td><td>paper-tape</td></tr><tr><td>Stored Data</td><td>Bow Tie Rectangle</td><td>bow-rect</td><td>Stored data</td><td>stored-data, bow-tie-rectangle</td></tr><tr><td>Summary</td><td>Crossed Circle</td><td>cross-circ</td><td>Summary</td><td>summary, crossed-circle</td></tr><tr><td>Tagged Document</td><td>Tagged Document</td><td>tag-doc</td><td>Tagged document</td><td>tagged-document</td></tr><tr><td>Tagged Process</td><td>Tagged Rectangle</td><td>tag-rect</td><td>Tagged process</td><td>tagged-rectangle, tag-proc, tagged-process</td></tr></tbody></table>',1))]))}});export{u as __pageData,b as default};
