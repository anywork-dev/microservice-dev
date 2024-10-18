<script setup>
    import Diagram from "../components/Diagram.vue"
    const diagram = 
    `
    sequenceDiagram
        actor Pelanggan
        actor Aplikasi
        actor Resepsionis
        actor Dapur

        Pelanggan->>Pelanggan: Scan QR code menu
    `
</script>



<Diagram :code="diagram" />