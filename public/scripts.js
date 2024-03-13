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

async function cropImage(filename) {
  const x = document.getElementById("x").value;
  const y = document.getElementById("y").value;
  const width = document.getElementById("width").value;
  const height = document.getElementById("height").value;

  try {
    const response = await fetch(`/crop/${filename}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ x, y, width, height }),
    });

    if (response.ok) {
      console.log("Image cropped successfully");
      window.location.href = "/"; 
    } else {
      throw new Error("Image crop failed. Please try again.");
    }
  } catch (error) {
    console.error("Error cropping image:", error.message);
  }
}
// async function applyWaterMark(filename) {
//   const watermarkImage = document.getElementById("watermarkimage").files[0]; // Get the watermark image file
//   try {
//     const response = await fetch(`/watermark/${filename}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "image/png", // Adjust content type as needed
//       },
//       body: watermarkImage,
//     });

//     if (response.ok) {
//       console.log("Watermark applied successfully");
//       window.location.href = "/";
//     } else {
//       throw new Error("Watermark application failed. Please try again.");
//     }
//   } catch (error) {
//     console.error("Error applying watermark:", error.message);
//   }
// }