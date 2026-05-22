let rowCount = 1;

document.getElementById("btnAdd").addEventListener("click", function() {

    rowCount++;

    const tableBody = document.getElementById("tableBody");

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${rowCount}</td>
        <td><textarea name="description[]" class="form-control"></textarea></td>
        <td><input name="tic_number[]" type="text" class="form-control"></td>
        <td>
			<div class="input-group">
				<span class="input-group-text">IDR</span>
				<input name="nominal[]" type="number" class="form-control harga">
			</div>
		</td>
        <td>
            <button type="button" class="btn btn-danger btn-delete no-print">Hapus</button>
        </td>
    `;

    tableBody.appendChild(newRow);
});

document.getElementById("tableBody").addEventListener("click", function(e) {

    if (e.target.classList.contains("btn-delete")) {
        const row = e.target.closest("tr");

            row.remove();
            hitungTotal();
            updateRowNumber(); 
      
        // console.log("Data dihapus");
    }
        
});

//==END DELETED ROW===//==

// Update Nomor Otomatis Biar nomor tidak berantakan setelah hapus:
    function updateRowNumber() {
        const rows = document.querySelectorAll("#tableBody tr");

        rows.forEach((row, index) => {
            row.querySelectorAll("td")[0].textContent = index + 1;
        });

        rowCount = rows.length;
    }
    
// // ========PRINT
// document.getElementById("print").addEventListener("click", async function(e){

//     console.log("BUTTON DIKLIK");
    
//     const form = document.getElementById("invoiceForm");
//     const result = await res.json();

//     console.log("HASIL DARI BACKEND:", result);
//     // delay dikit biar data ke -save dulu
//     if(result.success=true){
//         setTimeout(()=>{
//             window.print();
//         }, 500);
//     }else {
//             alert("Gagal simpan data")
//     }
// });



//=S=====================> auto hitung total

hitungTotal();
function hitungTotal() {
    let total = 0;
	
    document.querySelectorAll(".harga").forEach(el => {
        console.log("ISI:", el.textContent);
		let value = 0;

        if (el.tagName === "INPUT") {
            value = parseFloat(el.value) || 0;
        } else {
            value = parseFloat(el.textContent.replace(/[^0-9.-]+/g, "")) || 0;
        }

        total += value;
    });

    document.getElementById("total").value = total;
    document.getElementById("total_view").value = formatRupiah(total);

    // update terbilang
    document.getElementById("terbilangText").innerHTML = terbilang(total) + " Rupiah";
}
// Trigger otomatis saat user input
document.getElementById("tableBody").addEventListener("input", function(e){
    // console.log("event jalan", e.target.value);
    // console.log(document.getElementById("tableBody")); tekan f12 di browser
    if(e.target.classList.contains("harga")){
        hitungTotal();
    }
})
// triger otomatis untuk halaman print
document.addEventListener("DOMContentLoaded", function() {
    console.log("run hitungtotal");
    hitungTotal();
});

// Format rupiah
function formatRupiah(angka){
    return new Intl.NumberFormat('id-ID').format(angka)
}
//==E====================> auto hitung total

//=S======================> angka terbilang
function terbilang(angka) {
    const huruf = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];

    if (angka < 12) {
        return huruf[angka];
    } else if (angka < 20) {
        return terbilang(angka - 10) + " Belas";
    } else if (angka < 100) {
        return terbilang(Math.floor(angka / 10)) + " Puluh " + terbilang(angka % 10);
    } else if (angka < 200) {
        return "Seratus " + terbilang(angka - 100);
    } else if (angka < 1000) {
        return terbilang(Math.floor(angka / 100)) + " Ratus " + terbilang(angka % 100);
    } else if (angka < 2000) {
        return "Seribu " + terbilang(angka - 1000);
    } else if (angka < 1000000) {
        return terbilang(Math.floor(angka / 1000)) + " Ribu " + terbilang(angka % 1000);
    } else if (angka < 1000000000) {
        return terbilang(Math.floor(angka / 1000000)) + " Juta " + terbilang(angka % 1000000);
    } else {
        return "Angka terlalu besar";
    }
}
//=E======================> angka terbilang
