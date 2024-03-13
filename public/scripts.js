async function resizeImage(filename) {
  const width = document.getElementById("width").value;
  const height = document.getElementById("height").value;

  try {
    const response = await fetch(`/resize/${filename}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ width, height }),
    });
    console.log("Image resized successfully");

    if (!response.ok) {
      throw new Error("Image resize failed. Please try again.");
    }
    window.location.href = "/";
  } catch (error) {
    console.error("Error resizing image:", error.message);
  }
}
