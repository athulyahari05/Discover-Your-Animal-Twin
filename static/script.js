document.getElementById("uploadBtn").addEventListener("click", () => {
    const fileInput = document.getElementById("photoInput");
    if (!fileInput.files.length) {
        alert("Please choose a photo first!");
        return;
    }

    // Show the uploaded photo on the page
    const userImg = document.getElementById("userImage");
    userImg.src = URL.createObjectURL(fileInput.files[0]);
    userImg.style.display = "block";

    // Send the file to backend
    const formData = new FormData();
    formData.append("photo", fileInput.files[0]);

    fetch("/upload", { method: "POST", body: formData })
        .then(res => res.json())
        .then(data => {
            document.getElementById("animalImage").src = data.animal;
            document.getElementById("animalImage").style.display = "block";
            document.getElementById("caption").innerText = data.caption;

            // Confetti burst 🎉
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        });
});
const camera = document.getElementById("camera");
const captureBtn = document.getElementById("captureBtn");
const snapshotCanvas = document.getElementById("snapshot");
const ctx = snapshotCanvas.getContext("2d");

// Start camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        camera.srcObject = stream;
    })
    .catch(err => {
        alert("Camera access denied or not available.");
        console.error(err);
    });

// Capture photo
captureBtn.addEventListener("click", () => {
    snapshotCanvas.width = camera.videoWidth;
    snapshotCanvas.height = camera.videoHeight;
    ctx.drawImage(camera, 0, 0, snapshotCanvas.width, snapshotCanvas.height);

    snapshotCanvas.toBlob(blob => {
        const formData = new FormData();
        formData.append("photo", blob, "captured.jpg");

        fetch("/upload", { method: "POST", body: formData })
            .then(res => res.json())
            .then(data => {
                document.getElementById("userImage").src = URL.createObjectURL(blob);
                document.getElementById("userImage").style.display = "block";
                document.getElementById("animalImage").src = data.animal;
                document.getElementById("animalImage").style.display = "block";
                document.getElementById("caption").innerText = data.caption;
            });
    }, "image/jpeg");
});
