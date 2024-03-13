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

async function applyGreyScale(filename) {
  try {
    const response = await fetch(`/grey/${filename}`, {
      method: "PUT",
    });

    if (response.ok) {
      console.log("Greyscale applied successfully");
      window.location.href = "/"; // Redirect to home page
    } else {
      throw new Error("Greyscale application failed. Please try again.");
    }
    window.location.reload();
  } catch (error) {
    console.error("Error applying greyscale:", error.message);
  }
}
