<script setup>
    import Diagram from "../components/Diagram.vue"
    const diagram = 
    `
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
    `
</script>

# Flowchart Shapes Reference

This reference page provides an overview of flowchart shapes based on their semantic names, short names, descriptions, and supported aliases. Use this guide to standardize flowchart elements for consistent visual representation.

<Diagram :code="diagram" id="specificaiton" />

| **Semantic Name**     | **Shape Name**         | **Short Name** | **Description**                | **Alias Supported**                                      |
| --------------------- | ---------------------- | -------------- | ------------------------------ | -------------------------------------------------------- |
| Process               | Rectangle              | rect           | Standard process shape         | proc, process, rectangle                                 |
| Event                 | Rounded Rectangle      | rounded        | Represents an event            | event                                                    |
| Terminal Point        | Stadium                | stadium        | Terminal point                 | terminal, pill                                           |
| Subprocess            | Framed Rectangle       | fr-rect        | Subprocess                     | subprocess, subproc, framed-rectangle, subroutine        |
| Database              | Cylinder               | cyl            | Database storage               | db, database, cylinder                                   |
| Start                 | Circle                 | circle         | Starting point                 | circ                                                     |
| Odd                   | Odd                    | odd            | Odd shape                      |                                                          |
| Decision              | Diamond                | diam           | Decision-making step           | decision, diamond                                        |
| Prepare Conditional   | Hexagon                | hex            | Preparation or condition step  | hexagon, prepare                                         |
| Data Input/Output     | Lean Right             | lean-r         | Represents input or output     | lean-right, in-out                                       |
| Data Input/Output     | Lean Left              | lean-l         | Represents output or input     | lean-left, out-in                                        |
| Priority Action       | Trapezoid Base Bottom  | trap-b         | Priority action                | priority, trapezoid-bottom                               |
| Manual Operation      | Trapezoid Base Top     | trap-t         | Represents a manual task       | manual, trapezoid-top                                    |
| Stop                  | Double Circle          | dbl-circ       | Represents a stop point        | double-circle                                            |
| Text Block            | Text Block             | text           | Text block                     | -                                                        |
| Card                  | Notched Rectangle      | notch-rect     | Represents a card              | card, notched-rectangle                                  |
| Lined/Shaded Process  | Lined Rectangle        | lin-rect       | Lined process shape            | lined-rectangle, lined-process, lin-proc, shaded-process |
| Start                 | Small Circle           | sm-circ        | Small starting point           | start, small-circle                                      |
| Stop                  | Framed Circle          | fr-circ        | Stop point                     | stop, framed-circle                                      |
| Fork/Join             | Filled Rectangle       | fork           | Fork or join in process flow   | join                                                     |
| Collate               | Hourglass              | hourglass      | Represents a collate operation | hourglass                                                |
| Comment               | Curly Brace            | brace          | Adds a comment                 | comment, brace-l                                         |
| Comment Right         | Curly Brace            | brace-r        | Adds a comment                 | -                                                        |
| Comment (Both Sides)  | Curly Braces           | braces         | Adds a comment                 | -                                                        |
| Com Link              | Lightning Bolt         | bolt           | Communication link             | com-link, lightning-bolt                                 |
| Document              | Document               | doc            | Represents a document          | doc, document                                            |
| Delay                 | Half-Rounded Rectangle | delay          | Represents a delay             | half-rounded-rectangle                                   |
| Direct Access Storage | Horizontal Cylinder    | h-cyl          | Direct access storage          | das, horizontal-cylinder                                 |
| Disk Storage          | Lined Cylinder         | lin-cyl        | Disk storage                   | disk, lined-cylinder                                     |
| Display               | Curved Trapezoid       | curv-trap      | Represents a display           | curved-trapezoid, display                                |
| Divided Process       | Divided Rectangle      | div-rect       | Divided process shape          | div-proc, divided-rectangle, divided-process             |
| Extract               | Triangle               | tri            | Extraction process             | extract, triangle                                        |
| Internal Storage      | Window Pane            | win-pane       | Internal storage               | internal-storage, window-pane                            |
| Junction              | Filled Circle          | f-circ         | Junction point                 | junction, filled-circle                                  |
| Lined Document        | Lined Document         | lin-doc        | Lined document                 | lined-document                                           |
| Loop Limit            | Trapezoidal Pentagon   | notch-pent     | Loop limit step                | loop-limit, notched-pentagon                             |
| Manual File           | Flipped Triangle       | flip-tri       | Manual file operation          | manual-file, flipped-triangle                            |
| Manual Input          | Sloped Rectangle       | sl-rect        | Manual input step              | manual-input, sloped-rectangle                           |
| Multi-Document        | Stacked Document       | docs           | Multiple documents             | documents, st-doc, stacked-document                      |
| Multi-Process         | Stacked Rectangle      | st-rect        | Multiple processes             | procs, processes, stacked-rectangle                      |
| Paper Tape            | Flag                   | flag           | Paper tape                     | paper-tape                                               |
| Stored Data           | Bow Tie Rectangle      | bow-rect       | Stored data                    | stored-data, bow-tie-rectangle                           |
| Summary               | Crossed Circle         | cross-circ     | Summary                        | summary, crossed-circle                                  |
| Tagged Document       | Tagged Document        | tag-doc        | Tagged document                | tagged-document                                          |
| Tagged Process        | Tagged Rectangle       | tag-rect       | Tagged process                 | tagged-rectangle, tag-proc, tagged-process               |
