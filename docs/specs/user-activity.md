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
        alt akses member
            Pelanggan->>Aplikasi: Login
        else akses umum
            Pelanggan->>Aplikasi: Masukkan nama
        end
        Pelanggan->>Aplikasi: Akses menu
    `
</script>

## User Activity  
Monitor and analyze user interactions within the system. This section provides insights into user behavior, session tracking, activity logs, and key metrics to optimize user engagement and improve system usability.

<Diagram :code="diagram" />
