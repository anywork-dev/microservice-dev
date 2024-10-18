<script setup>
    import mermaid from "mermaid"
    import { onMounted, ref } from "vue"

    onMounted(async () => {
        mermaid.initialize({
            startOnLoad: false,
        })

        await mermaid.run({
            querySelector: ".mermaid"
        })
    })
</script>

# User Activity Design

Dokumen ini menjelaskan alur aktivitas pengguna dalam perangkat lunak menggunakan diagram **sequence** dan **flowchart**. Diagram ini membantu memahami interaksi pengguna dan sistem dalam berbagai skenario.

---

## 1. User Activity Sequence Diagram

Diagram ini menggambarkan urutan langkah-langkah dan interaksi antara **User**, **Frontend**, dan **Backend** ketika pengguna melakukan aktivitas seperti **login dan melihat dashboard**.


<pre class="mermaid" ref="el">
    graph TD
    A[Client] -->|tcp_123| B
</pre>