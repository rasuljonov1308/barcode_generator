document.getElementById('barcodeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const barcodeType = document.getElementById('barcodeType').value;
    const barcodeData = document.getElementById('barcodeData').value;
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (!barcodeData) {
        alert("Please enter data for the barcode!");
        return;
    }

    try {
        // Generate barcode
        JsBarcode("#barcode", barcodeData, {
            format: barcodeType,
            lineColor: "#000",
            width: 2,
            height: 100,
            displayValue: true,
        });

        downloadBtn.disabled = false;
        downloadBtn.onclick = () => downloadBarcode();
    } catch (error) {
        alert("Error generating barcode: " + error.message);
    }
});

function downloadBarcode() {
    const svg = document.getElementById('barcode');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        
        const downloadLink = document.createElement('a');
        downloadLink.href = pngFile;
        downloadLink.download = 'barcode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
}