import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";

import "../styles/Grid.css";
function Grid() {
  let dim = 20;
  const [grid, setGrid] = useState(
    Array(dim)
      .fill()
      .map(() => Array(dim).fill(false))
  );
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (running) {
      setTimeout(play, 200);
    }
  }, [running, grid]);

  const checkNeighbour = (i, j) => {
    let count = 0;
    if (i > 0) {
      if (grid[i - 1][j] === true) {
        count += 1;
      }
    }
    if (i > 0 && j > 0) {
      if (grid[i - 1][j - 1] === true) {
        count += 1;
      }
    }

    if (i > 0 && j < dim - 1) {
      if (grid[i - 1][j + 1] === true) {
        count += 1;
      }
    }
    if (i < dim - 1) {
      if (grid[i + 1][j] === true) {
        count += 1;
      }
    }

    if (i < dim - 1 && j > 0) {
      if (grid[i + 1][j - 1] === true) {
        count += 1;
      }
    }

    if (i < dim - 1 && j < dim - 1) {
      if (grid[i + 1][j + 1] === true) {
        count += 1;
      }
    }

    if (j > 0) {
      if (grid[i][j - 1] === true) {
        count += 1;
      }
    }

    if (j < dim - 1) {
      if (grid[i][j + 1] === true) {
        count += 1;
      }
    }

    return count;
  };
  const setColor = (row, col) => {
    let temp = [...grid];

    for (let i = 0; i < dim; i++) {
      for (let j = 0; j < dim; j++) {
        if (i === row && j === col) {
          temp[i][j] = true;
          setGrid(temp);
          // setPrevGrid(temp);
          break;
        }
      }
    }
  };
  const play = () => {
    let arr = grid.map((row, i) => {
      return row.map((col, j) => {
        let count = checkNeighbour(i, j);

        // case 1 cell alive and has less than two living neighbours
        if (col === true && count < 2) {
          // changeColor(i, j, false);
          col = false;
        }
        // case 2 cell alive and has 2-3 neighbours
        if (col === true && count >= 2 && count <= 3) {
          // changeColor(i, j, true);
          col = true;
        }

        //case 3 cell alive and has more than 3 neighbour
        if (col === true && count > 3) {
          // changeColor(i, j, false);
          col = false;
        }

        //case 4 cell dead and has 3 live neighbours
        if (col === false && count === 3) {
          // changeColor(i, j, true);
          col = true;
        }
        return col;
      });
    });

    setGrid(arr);
  };
  const startSim = () => {
    // setPrevGrid(grid);
    setRunning(!running);
    // setTimeout(startSim, 1500);
  };

  return (
    <>
      <div
        style={{ display: "grid", gridTemplateColumns: `repeat(${dim},25px)` }}
      >
        {grid.map((rows, i) => {
          return rows.map((col, j) => {
            return (
              <div
                onClick={setColor.bind(this, i, j)}
                style={{
                  width: "25px",
                  height: "25px",
                  border: "1px",
                  borderStyle: "solid",
                  backgroundColor: grid[i][j] === false ? "white" : "blue",
                }}
              ></div>
            );
          });
        })}
      </div>
      <button onClick={startSim} type="button">
        Click Me!
      </button>
    </>
  );
}

export default Grid;
