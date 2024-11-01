<script setup>
    import Diagram from "../components/Diagram.vue"
    const diagram = 
    `
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
    `
</script>

## User Activity  
Monitor and analyze user interactions within the system. This section provides insights into user behavior, session tracking, activity logs, and key metrics to optimize user engagement and improve system usability.

TODO: Waiting list case

<Diagram id="useractivity" :code="diagram" />
