document.addEventListener("DOMContentLoaded", () => {
  const diagram = document.querySelector(".preview-diagram");
  diagram.innerHTML = `<canvas id="diagramCanvas" width="300" height="300"></canvas>`;
  const canvas = document.getElementById("diagramCanvas");
  const ctx = canvas.getContext("2d");

  // State
  const state = {
    shape: "Rectangle",
    height: 10,
    heightFraction: '0"',
    width: 10,
    widthFraction: '0"',
    type: "Tempered",
    thickness: "8mm",
    edge: "Flat Polish",
    frame: "Vinyl",
    engraving: "",
    rows: 1,
    columns: 1
  };

  // mode: 'custom' => draw & calculate price, 'standard' => blank canvas & show size in Total
  let mode = "custom";

  // Fraction helper
  function fractionToDecimal(f) {
    return f === '1/2"' ? 0.5 : f === '1/4"' ? 0.25 : 0;
  }

  // --- Draw 2D Preview ---
  function drawDiagram() {
    // If standard mode => blank canvas (do NOT draw anything)
    if (mode === "standard") {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateTable(); // show size in Total
      return;
    }

    // custom mode: draw shape & grid
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let h = state.height + fractionToDecimal(state.heightFraction);
    let w = state.width + fractionToDecimal(state.widthFraction);

    if (state.shape === "Square") {
      const side = Math.min(h, w);
      h = w = side;
    }

    const ratio = w / h;
    let drawW = 200;
    let drawH = drawW / ratio;
    if (drawH > 200) {
      drawH = 200;
      drawW = drawH * ratio;
    }

    const x = (canvas.width - drawW) / 2;
    const y = (canvas.height - drawH) / 2;

    // Frame color
    ctx.lineWidth = 5;
    ctx.strokeStyle =
      state.frame === "Aluminum" ? "silver" :
      state.frame === "Wood" ? "brown" : "black";

    ctx.fillStyle =
      {
        Tempered: "rgba(173, 216, 230, 0.4)",
        Laminated: "rgba(135, 206, 235, 0.5)",
        Double: "rgba(173, 216, 230, 0.6)",
        "Low-E": "rgba(200, 255, 200, 0.5)",
        Tinted: "rgba(100, 100, 100, 0.4)",
        Frosted: "rgba(220, 220, 220, 0.6)",
      }[state.type] || "rgba(173,216,230,0.4)";

    ctx.beginPath();

    if (state.shape === "Rectangle" || state.shape === "Square") {
      ctx.fillRect(x, y, drawW, drawH);
      ctx.strokeRect(x, y, drawW, drawH);

      // draw grid only for Rectangle/Square
      const rowHeight = drawH / state.rows;
      const colWidth = drawW / state.columns;
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";

      for (let r = 1; r < state.rows; r++) {
        const yLine = y + r * rowHeight;
        ctx.beginPath();
        ctx.moveTo(x, yLine);
        ctx.lineTo(x + drawW, yLine);
        ctx.stroke();
      }

      for (let c = 1; c < state.columns; c++) {
        const xLine = x + c * colWidth;
        ctx.beginPath();
        ctx.moveTo(xLine, y);
        ctx.lineTo(xLine, y + drawH);
        ctx.stroke();
      }

    } else if (state.shape === "Triangle") {
      ctx.moveTo(x + drawW / 2, y);             // top middle
      ctx.lineTo(x, y + drawH);                 // bottom left
      ctx.lineTo(x + drawW, y + drawH);         // bottom right
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

    } else if (state.shape === "Pentagon") {
      const cx = canvas.width / 2, cy = canvas.height / 2, radius = Math.min(drawW, drawH) / 2;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (-90 + i * 72) * (Math.PI / 180);
        const px = cx + radius * Math.cos(angle);
        const py = cy + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Engraving text
    if (state.engraving) {
      ctx.fillStyle = "black";
      ctx.font = "14px Arial";
      ctx.textAlign = "center";
      ctx.fillText(state.engraving, canvas.width / 2, y + drawH + 20);
    }

    updateTable();
  }

  // --- Price Calculation ---
  function calculatePrice() {
    // in standard mode we don't return a price (user requested Total to show size).
    if (mode === "standard") return null;

    const h = state.height + fractionToDecimal(state.heightFraction);
    const w = state.width + fractionToDecimal(state.widthFraction);

    const areaInches = h * w; // in²
    const areaFeet = areaInches / 144; // ft²

    const baseRate = 50; // per ft²
    const thicknessMultiplier = {
      "5mm": 1.0,
      "6mm": 1.1,
      "8mm": 1.2,
      "10mm": 1.3,
      "12mm": 1.4,
    }[state.thickness] || 1.0;

    const typeMultiplier = {
      Tempered: 1.2,
      Laminated: 1.3,
      Double: 1.4,
      "Low-E": 1.5,
      Tinted: 1.1,
      Frosted: 1.15,
    }[state.type] || 1.0;

    const frameCost = {
      Vinyl: 200,
      Aluminum: 300,
      Wood: 400,
    }[state.frame] || 0;

    const engravingCost = state.engraving ? 500 : 0;

    const glassCost = areaFeet * baseRate * thicknessMultiplier * typeMultiplier;
    const total = glassCost + frameCost + engravingCost;

    // 2 decimal places
    return parseFloat(total.toFixed(2));
  }

  // --- Update Table ---
  function updateTable() {
    const table = document.querySelector(".price-details table");
    if (!table) return;

    // Shape
    table.querySelector("tr:nth-child(1) td:nth-child(2)").textContent = state.shape;

    // Dimension
    if (mode === "standard") {
      table.querySelector("tr:nth-child(2) td:nth-child(2)").textContent = `${state.height}" x ${state.width}"`;
    } else {
      table.querySelector("tr:nth-child(2) td:nth-child(2)").textContent =
        `${state.height}" ${state.heightFraction}, ${state.width}" ${state.widthFraction}`;
    }

    // Other specs remain populated so user still sees chosen type/thickness/etc.
    table.querySelector("tr:nth-child(3) td:nth-child(2)").textContent = state.type;
    table.querySelector("tr:nth-child(4) td:nth-child(2)").textContent = state.thickness;
    table.querySelector("tr:nth-child(5) td:nth-child(2)").textContent = state.edge;
    table.querySelector("tr:nth-child(6) td:nth-child(2)").textContent = state.frame;
    table.querySelector("tr:nth-child(7) td:nth-child(2)").textContent = state.engraving || "N/A";

    // Total row: either price (custom) or glass size string (standard)
    const totalCell = table.querySelector(".total-row td:nth-child(2)");
    if (mode === "standard") {
      totalCell.textContent = `${state.height}" x ${state.width}"`;
    } else {
      const price = calculatePrice();
      totalCell.textContent = price !== null ? `₱${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : "—";
    }
  }

  // --- Event Listeners for option buttons ---
  document.querySelectorAll(".option-group .option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const group = btn.closest(".option-group").querySelector("h3").textContent;
      btn.parentNode.querySelectorAll(".option-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      if (group.includes("Shape")) {
        state.shape = btn.textContent;

        // find the 'Glass Grid' option-group wrapper
        const gridGroup = Array.from(document.querySelectorAll(".option-group"))
          .find(g => g.querySelector("h3") && g.querySelector("h3").textContent.trim().toLowerCase() === "glass grid");

        if (gridGroup) {
          if (state.shape === "Rectangle" || state.shape === "Square") {
            gridGroup.style.display = ""; // show
          } else {
            gridGroup.style.display = "none"; // hide
            state.rows = 1;
            state.columns = 1;
            // sync selects if present
            const rSel = gridGroup.querySelector("#rows");
            const cSel = gridGroup.querySelector("#columns");
            if (rSel) rSel.value = "1";
            if (cSel) cSel.value = "1";
          }
        }
      }

      if (group.includes("Type")) state.type = btn.textContent;
      if (group.includes("Thickness")) state.thickness = btn.textContent;
      if (group.includes("Edge")) state.edge = btn.textContent;
      if (group.includes("Frame")) state.frame = btn.textContent;

      // touching any custom option switches back to custom mode
      mode = "custom";
      drawDiagram();
    });
  });

  // --- Dimension selects (height/width/fractions) ---
  document.querySelectorAll(".dimension-input-group select").forEach(select => {
    select.addEventListener("change", () => {
      const label = select.closest(".dimension-input-group").querySelector("label").textContent;
      if (label === "Height") state.height = parseInt(select.value);
      if (label === "Width") state.width = parseInt(select.value);
      // Fraction selects rely on DOM order; detect context by traversing
      if (label === "Fraction") {
        // determine whether this fraction select is for height or width
        const parentInputs = select.closest(".dimension-inputs");
        const prev = parentInputs.previousElementSibling;
        if (prev && prev.querySelector("label") && prev.querySelector("label").textContent === "Height") {
          state.heightFraction = select.value;
        } else if (prev && prev.querySelector("label") && prev.querySelector("label").textContent === "Width") {
          state.widthFraction = select.value;
        } else {
          // fallback: attempt to infer by looking at other sibling labels
          // (not expected needed if HTML matches supplied structure)
        }
      }
      mode = "custom";
      drawDiagram();
    });
  });

  // Engraving input
  const engravingInput = document.querySelector(".engraving-input input");
  if (engravingInput) {
    engravingInput.addEventListener("input", e => {
      state.engraving = e.target.value;
      drawDiagram();
    });
  }

  // Rows & Columns inputs (glass grid)
  const rowsInput = document.getElementById("rows");
  const colsInput = document.getElementById("columns");
  if (rowsInput && colsInput) {
    rowsInput.addEventListener("change", e => {
      state.rows = parseInt(e.target.value) || 1;
      mode = "custom";
      drawDiagram();
    });
    colsInput.addEventListener("change", e => {
      state.columns = parseInt(e.target.value) || 1;
      mode = "custom";
      drawDiagram();
    });
  }

  // --- Standard / Custom toggle (the buttons at top) ---
  const customBtn = document.getElementById("custom-build-btn");
  const standardBtn = document.getElementById("standard-btn");
  const customContent = document.getElementById("custom-build-content");
  const standardContent = document.getElementById("standard-content");

  if (customBtn && standardBtn && customContent && standardContent) {
    customBtn.addEventListener("click", () => {
      customBtn.classList.add("active");
      standardBtn.classList.remove("active");
      customContent.classList.add("active");
      standardContent.classList.remove("active");
      mode = "custom";
      // show the preview area again
      document.querySelector(".preview-diagram").style.display = "";
      drawDiagram();
    });

    standardBtn.addEventListener("click", () => {
      standardBtn.classList.add("active");
      customBtn.classList.remove("active");
      standardContent.classList.add("active");
      customContent.classList.remove("active");
      mode = "standard";
      // clear (blank) the preview canvas (but keep it visible)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateTable();
    });
  }

  // --- Standard size buttons (inside standard-content) ---
  document.querySelectorAll("#standard-content .size-buttons .option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.parentNode.querySelectorAll(".option-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const match = btn.textContent.match(/(\d+)"\s*x\s*(\d+)"/);
      if (match) {
        const h = parseInt(match[1], 10);
        const w = parseInt(match[2], 10);

        state.height = h;
        state.width = w;

        mode = "standard";
        // ensure preview is blank, update table to show size as total
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateTable();
      }
    });
  });

  // initial visibility of grid controls (if HTML present)
  (function initGridVisibility() {
    const gridGroup = Array.from(document.querySelectorAll(".option-group"))
      .find(g => g.querySelector("h3") && g.querySelector("h3").textContent.trim().toLowerCase() === "glass grid");
    if (gridGroup) {
      if (state.shape === "Rectangle" || state.shape === "Square") gridGroup.style.display = "";
      else gridGroup.style.display = "none";
    }
  })();

  // initial draw
  drawDiagram();
});
