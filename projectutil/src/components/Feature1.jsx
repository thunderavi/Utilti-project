import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";

export default function CounterCard() {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("count");
    return savedCount ? JSON.parse(savedCount) : 0;
  });

  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  const resetCounter = () => {
    setCount(0);
    localStorage.removeItem("count");
  };

  const getBackgroundColor = () => {
    let red = Math.min(count * 20, 255);
    let green = Math.max(0, 255 - Math.abs(count * 10));
    let blue = Math.max(0, 255 - Math.abs(count * 5));

    if (count < 0) {
      red = Math.max(0, red - 50);
      green = Math.max(0, green - 50);
      blue = Math.max(0, blue - 50);
    }

    if (count === 0) {
      return "rgb(255, 255, 255)";
    }

    return `rgb(${red}, ${green}, ${blue})`;
  };

  const hoverEffect = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  `;

  return (
    <Card
      sx={{
        minWidth: "90%",
        borderRadius: "16px",
        boxShadow: 3,
        transition: "transform 0.3s ease, background 1s ease",
        background: getBackgroundColor(),
        animation: `${hoverEffect} 3s ease-in-out infinite`,
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%", // Ensures full use of the container
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Typography
          variant="h2"
          component="div"
          sx={{ fontWeight: "bold", fontSize: "48px" }}
        >
          {count}
        </Typography>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 18 }}>
          Counter
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <Button
            size="small"
            sx={{
              color: "primary.main",
              minWidth: 48,
              height: 48,
              fontSize: "24px",
              fontWeight: "bold",
              borderRadius: "50%",
              border: "2px solid",
              borderColor: "primary.main",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
            onClick={() => setCount(count + 1)}
          >
            +
          </Button>

          <Button
            size="small"
            sx={{
              color: "primary.main",
              border: "2px solid",
              borderColor: "primary.main",
              borderRadius: "8px",
              padding: "8px 16px",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
            onClick={resetCounter}
          >
            Reset
          </Button>

          <Button
            size="small"
            sx={{
              color: "primary.main",
              minWidth: 48,
              height: 48,
              fontSize: "24px",
              fontWeight: "bold",
              borderRadius: "50%",
              border: "2px solid",
              borderColor: "primary.main",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
            onClick={() => setCount(count - 1)}
          >
            -
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
