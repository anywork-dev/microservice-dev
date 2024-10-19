<script setup>
    import Diagram from "../components/Diagram.vue"
    const diagram = 
    `
    sequenceDiagram
        actor Pelanggan
        participant Aplikasi
        actor Resepsionis
        actor Dapur

        Pelanggan->>Pelanggan: Scan QR code menu
        alt jika perlu akses member
            Pelanggan->>Aplikasi: Login
        else akses umum
            Pelanggan->>Aplikasi: Masukkan nama
        end
        loop membuat pesanan
            Pelanggan->>Aplikasi: Akses menu
            Pelanggan->>Pelanggan: Pilih menu
            Pelanggan->>Aplikasi: Tambahkan ke keranjang
            Pelanggan->>Aplikasi: Cek Bill sebelum melanjutkan
            Pelanggan->>Aplikasi: Checkout keranjang
            Aplikasi->>Resepsionis: Tambah ke antrian pesanan
            Resepsionis->>Resepsionis: Cek antrian pesanan
            Resepsionis->>Dapur: Cek pesanan
            alt jika ditolak
                Resepsionis->>Aplikasi: Batalkan pesanan disertai dengan catatan
                Aplikasi->>Pelanggan: Pesan dibatalkan dengan catatan...
            end
            opt jika bayar di awal
                Resepsionis->>Resepsionis: Menunggu pembayaran
                Pelanggan->>Resepsionis: Bayar pesanan
                Resepsionis->>Aplikasi: Mengubah status pembayaran
            end
            Resepsionis->>Aplikasi: Tambahkan pesanan ke antrian pelayanan
            Aplikasi->>Pelanggan: Pesanan sedang dilayani
            Dapur->>Resepsionis: Siapkan makanan
            Resepsionis->>Aplikasi: Makanan siap
            Resepsionis->>Pelanggan: Menyajikan makanan
        end
        alt jika bayar di akhir
            Resepsionis->>Aplikasi: Cek total tagihan pelanggan
            Pelanggan->>Resepsionis: Bayar pesanan
            Resepsionis->>Pelanggan: Pembayaran diterima
        end
        Aplikasi->>Pelanggan: Pesanan selesai
    `
</script>

## User Activity  
Monitor and analyze user interactions within the system. This section provides insights into user behavior, session tracking, activity logs, and key metrics to optimize user engagement and improve system usability.

TODO: Waiting list case

<Diagram id="useractivity" :code="diagram" />
