import{_ as i}from"./chunks/Diagram.CxFhJWHR.js";import{c as s,j as e,a as t,G as l,o as r}from"./chunks/framework.DyATOcH3.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"specs/user-activity.md","filePath":"specs/user-activity.md"}'),p={name:"specs/user-activity.md"},d=Object.assign(p,{setup(o){const n=`
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
        Pelanggan->>Aplikasi: Akses menu
        Pelanggan->>Pelanggan: Pilih menu
        Pelanggan->>Aplikasi: Tambahkan ke keranjang
        Pelanggan->>Aplikasi: Checkout keranjang
        Aplikasi->>Resepsionis: Tambah ke antrian pesanan
        Resepsionis->>Resepsionis: Cek antrian pesanan
        Resepsionis->>Dapur: Cek pesanan
        alt jika ditolak
            Resepsionis->>Aplikasi: Batalkan pesanan disertai dengan catatan
            Aplikasi->>Pelanggan: Pesan dibatalkan dengan catatan...
        end
        alt jika bayar di awal
            Aplikasi->>Aplikasi: Menunggu status pembayaran
            Pelanggan->>Resepsionis: Bayar pesanan
            Resepsionis->>Aplikasi: Mengubah status pembayaran
        end
        Resepsionis->>Aplikasi: Tambahkan pesanan ke antrian pelayanan
        Aplikasi->>Pelanggan: Pesanan sedang dilayani
        Dapur->>Resepsionis: Siapkan makanan
        Resepsionis->>Aplikasi: Makanan siap
        Resepsionis->>Pelanggan: Menyajikan makanan
        alt jika bayar di akhir
            Pelanggan->>Resepsionis: Bayar pesanan
            Resepsionis->>Aplikasi: Cek total tagihan pelanggan
            Resepsionis->>Pelanggan: Pembayaran diterima
        end
        Aplikasi->>Pelanggan: Pesanan selesai
    `;return(g,a)=>(r(),s("div",null,[a[0]||(a[0]=e("h2",{id:"user-activity",tabindex:"-1"},[t("User Activity "),e("a",{class:"header-anchor",href:"#user-activity","aria-label":'Permalink to "User Activity"'},"​")],-1)),a[1]||(a[1]=e("p",null,"Monitor and analyze user interactions within the system. This section provides insights into user behavior, session tracking, activity logs, and key metrics to optimize user engagement and improve system usability.",-1)),l(i,{id:"useractivity",code:n})]))}});export{m as __pageData,d as default};
