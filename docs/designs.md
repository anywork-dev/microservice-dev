<script setup>
    import mermaid from "mermaid"
    import * as d3 from "d3" 
    import { onMounted, ref } from "vue"

    onMounted(async () => {
        mermaid.initialize({ startOnLoad: false });

        const diagrams = Array.from(document.querySelectorAll(".mermaid"))
        // Initialize D3 zoom behavior
        const zoom = d3.zoom()
            .scaleExtent([0.5, 5]) // Min and max zoom level
            .on('zoom', (event) => {
                diagrams.forEach((svg) => {
                    d3.select(svg.children[0]).style('transform', `translate(${event.transform.x}px, ${event.transform.y}px) scale(${event.transform.k})`)
                })
            });
        

        diagrams.forEach(async (diagram) => {
            // Render the Mermaid diagram and extract the SVG
            const {svg} = await mermaid.render('mermaidSVG', diagram.innerText);
            // Insert rendered SVG into the container
            diagram.innerHTML = svg;
            d3.select(diagram).call(zoom);
        })

    })
</script>

# User Activity Design

Dokumen ini menjelaskan alur aktivitas pengguna dalam perangkat lunak menggunakan diagram **sequence** dan **flowchart**. Diagram ini membantu memahami interaksi pengguna dan sistem dalam berbagai skenario.

---

## 1. User Activity Sequence Diagram

Diagram ini menggambarkan urutan langkah-langkah dan interaksi antara **User**, **Frontend**, dan **Backend** ketika pengguna melakukan aktivitas seperti **login dan melihat dashboard**.

<pre class="mermaid">
sequenceDiagram
    actor Pemohon
    actor Admin
    actor Notaris
    actor PPAT

    Admin->>Admin: Membuat jenis pelayanan serta tugas-tugasnya dan jenis laporannya
    Note right of Pemohon: Input field dibedakan oleh laporan pada jenis pelayanan (notaris / PPAT)
    alt dibuatkan pemohon di mobile
        Pemohon->>Admin: Isi Form Order Baru sesuai Jenis pelayanan
        Pemohon->>Admin: Menyerahkan berkas permohonan (KTP)
    else dibuatkan admin di dashboard
        Admin->>Admin: Isi Form Order Baru sesuai jenis pelayanan
        Admin->>Admin: Upload berkas pemohon sesuai jenis pelayanan
    end
    Admin->>Admin: Terima Berkas Pemohon
    Admin->>Admin: Masukkan Permohonan ke Laporan
    Admin->>Admin: Buat perincian aktivitas pelayanan
    Admin->>Admin: Buat perincian tagihan
    Admin->>Pemohon: Tanda terima berkas & Invoice
    Pemohon->>Admin: Upload Bukti Pembayaran
    Admin->>Admin: Verifikasi pembayaran
    alt pembayaran ditolak
        Admin->>Pemohon: Permintaan bukti pembayaran yang valid
    end
    alt pelayanan notaris
        Admin->>Notaris: Tambah ke daftar kerja Notaris
    else pelayanan ppat
        Admin->>PPAT: Tambah ke daftar kerja PPAT
    end

</pre>

<style>
    svg {
        position: relative;
    }

    pre {
        overflow: hidden;
        box-shadow: #dfdfdf 0 0 0 1px;
        border-radius: 8px;
    }
</style>